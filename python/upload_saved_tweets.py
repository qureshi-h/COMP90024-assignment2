import os
from json import JSONDecodeError
from mpi4py import MPI
import json
import fetch_coordinates
import stem_keywords

KEYWORDS = stem_keywords.get_keywords()


def main():

    comm = MPI.COMM_WORLD
    size = comm.Get_size()
    file = "res/twitter-melb.json"

    if comm.Get_rank() == 0:
        chunks = get_chunks(file, size)
        results = []

        for i in range(1, size):
            comm.send(chunks[i], dest=i)

        results += process(file, chunks[0])

        for i in range(1, size):
            results += comm.recv(source=i)

        print("Ran on " + str(size) + " nodes")
        print(len(results), "tweets extracted")

        with open('json_data.json', 'w') as outfile:
            json.dump({"tweets": results}, outfile)

    else:
        chunk = comm.recv(source=0)
        result = process(file, chunk)
        comm.send(result, dest=0)


def process(file, chunk):
    chunk_start, chunk_end = chunk
    tweets = []
    with open(file, 'r') as f:
        f.seek(chunk_start)
        f.readline()
        for line in f:
            chunk_start += len(line)
            if chunk_start > chunk_end:
                break
            try:
                tweet = json.loads(line[:-2])
                if tweet["doc"]["coordinates"]:
                    categories = categorize(tweet["doc"]["text"])
                    region = fetch_coordinates.get_region(tweet["doc"]["coordinates"]["coordinates"])
                    if not region:
                        continue
                    for category in categories:
                        tweets.append({"region": region, "type": category[0], "subtype": category[1],
                                       "tweet": tweet["doc"]["text"], "coordinates": tweet["doc"]["coordinates"]})
                    if not categories:
                        tweets.append({"region": region,"tweet": tweet["doc"]["text"], 
                        "coordinates": tweet["doc"]["coordinates"]})

            except JSONDecodeError:
                print("JSON Decode Error")
                continue
    return tweets


def categorize(tweet):

    categories = []
    for topic, subtopics in KEYWORDS.items():
        for subtopic, words in subtopics.items():
            for word in words:
                if word in tweet:
                    categories.append((topic, subtopic))
                break

    return categories


def get_chunks(file_name, cpu_count):

    file_size = os.path.getsize(file_name)
    chunk_size = file_size // cpu_count

    chunks = []
    with open(file_name, 'r', encoding="latin-1") as file:

        chunk_start = 0
        while chunk_start < file_size:
            chunk_end = min(file_size, chunk_start + chunk_size)

            while not is_start_of_line(file, chunk_end):
                chunk_end -= 1

            if chunk_start >= chunk_end:
                chunk_end = get_next_line_position(file, chunk_end)

            chunks.append((chunk_start, chunk_end))
            chunk_start = chunk_end
    return chunks


def is_start_of_line(file, position):
    if position == 0:
        return True
    file.seek(position - 1)
    return file.read(1) == '\n'


def get_next_line_position(file, position):
    file.seek(position)
    file.readline()
    return file.tell()


if __name__ == '__main__':
    main()

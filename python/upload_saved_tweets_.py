import os
from json import JSONDecodeError
import json
import fetch_coordinates
import stem_keywords

KEYWORDS = stem_keywords.get_keywords()


def main():

    file = "../res/twitter-melb.json"
    categorized_tweets, all_tweets = process(file)

    print(len(categorized_tweets), "tweets extracted")
    print(len(all_tweets), "tweets extracted")

    with open('categorised_tweets.json', 'w') as outfile:
        json.dump({"tweets": categorized_tweets}, outfile)

    with open('all_tweets.json', 'w') as outfile:
        json.dump({"tweets": all_tweets}, outfile)


def process(file):
    tweets = []
    all_tweets = []
    with open(file, 'r') as f:
        f.readline()
        for line in f:
            try:
                tweet = json.loads(line[:-2])
                if tweet["doc"]["coordinates"]:
                    categories = categorize(tweet["doc"]["text"])
                    region = fetch_coordinates.get_region(tweet["doc"]["coordinates"]["coordinates"])
                    region=" n"
                    if not region:
                        continue
                    for category in categories:
                        tweets.append({"region": region, "type": category[0], "subtype": category[1],
                                       "tweet": tweet["doc"]["text"], "coordinates": tweet["doc"]["coordinates"]})
                    all_tweets.append({"region": region,"tweet": tweet["doc"]["text"],
                    "coordinates": tweet["doc"]["coordinates"]})

            except JSONDecodeError:
                print("JSON Decode Error")
                continue

    return tweets, all_tweets


def categorize(tweet):

    categories = []
    for topic, subtopics in KEYWORDS.items():
        for subtopic, words in subtopics.items():
            for word in words:
                if word in tweet:
                    categories.append((topic, subtopic))
                break

    return categories



if __name__ == '__main__':
    main()

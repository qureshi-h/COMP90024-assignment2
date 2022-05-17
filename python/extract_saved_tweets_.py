from json import JSONDecodeError
import json
import stem_keywords

import geopandas as gpd
from shapely.geometry import Point

KEYWORDS = stem_keywords.get_keywords()


def main():

    file = "../res/twitter-melb.json"
    process(file)


def process(file):
    tweets = []
    output = open("all_tweets.json", "w")
    output.write('{"docs":[')
    shape_file = '../res/vic_lga.shp'

    gdf = gpd.read_file(shape_file)
    gdf = gdf.to_crs(epsg=4326)

    with open(file, 'r') as f:
        f.readline()
        for line in f:
            try:
                tweet = json.loads(line[:-2])
                if tweet["doc"]["coordinates"]:
                    region = get_region(tweet["doc"]["coordinates"]["coordinates"], gdf)
                    if not region:
                        continue
                    json.dump({"region": region , "tweet": tweet["doc"]["text"],
                               "coordinates": tweet["doc"]["coordinates"]}, output)
                    output.write(",\n")
            except JSONDecodeError:
                print("JSON Decode Error")
                continue

    output.write("]}")
    output.close()
    return


def get_region(coordinates, gdf,option="lga"):
    coordinates = Point(coordinates)

    for row in gdf.iterrows():
        if row[1]["geometry"] is not None and row[1]["geometry"].contains(coordinates):
            if option == "lga":
                return row[1]["LGA_NAME"]
            return row[1]["SA3_NAME21"]

    return False


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

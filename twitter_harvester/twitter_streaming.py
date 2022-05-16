from ast import keyword
from calendar import c
import os
import time
from dotenv import load_dotenv
from shapely.geometry import Polygon, Point

import couchdb
import requests

import fetch_coordinates
import stem_keywords

load_dotenv()


def main():

    keywords, bounding_box = setup()

    headers = create_headers(os.getenv('BEARER_TOKEN'))

    max_results = 100
    limit = 1000
    next_token = None

    username = os.getenv("COUCHDB_USERNAME")
    password = os.getenv("COUCHDB_PASSWORD")
    server = couchdb.Server("http://%s:%s@172.26.133.72:5984/" % (username, password))

    url = create_url(keywords, max_results)

    # response = connect_to_endpoint(url[0], headers, url[1], next_token)
    # counter = process_tweet(response, server, bounding_box)
    # refresh_url = response['search_metadata']["refresh_url"]
    
    t = {"coordinates": {"coordinates":[
      145.00857376,
      -37.80887025]}, "text": "ALeab"}

    process_tweet({"statuses": [t]}, server, bounding_box)

    # while counter < limit:
    #     print(counter, flush=True)
    #     response = request_url(refresh_url, headers)
    #     counter += process_tweet(response, server, bounding_box)

    #     refresh_url = response['search_metadata']["refresh_url"]
    #     time.sleep(10)

    # print("\n", counter, "tweets found!")



def setup():

    default_box = "143.7832,-38.5375,146.1406,-37.0837"

    if os.getenv("KEYWORDS") != "None":
        if not len(os.getenv("KEYWORDS")):
            keywords = ""
        else:
            keywords = "(" + " OR ".join(os.getenv("KEYWORDS").split(" ")) + ")"
    else:
        keywords = combine_keywords()

    try:
        bounding_coordinates = os.getenv("BOUNDING_BOX")      
        points = list(map(float, bounding_coordinates.split(",")))
        bounding_box = Polygon(((points[2], points[1]), (points[0], points[1]),
         (points[2], points[3]), (points[0], points[3])))
    except:
        points = list(map(float, default_box.split(",")))
        bounding_box = Polygon(((points[2], points[1]), (points[0], points[1]),
         (points[2], points[3]), (points[0], points[3])))

    print("Keywords:", keywords, flush=True)
    print("Bounding Box:", bounding_box, flush=True)

    return keywords, bounding_box
    
def process_tweet(response, server, bounding_box):
    for tweet in response["statuses"]:
        print(tweet, flush=True)
        if tweet["coordinates"]:
            print(tweet["coordinates"], flush=True)
            # if not Point(list(map(float, tweet["coordinates"]["coordinates"]))).within(bounding_box):
            #     continue
            print("Found!", tweet["text"], flush=True)
            categories = categorize(tweet["text"])
            region = fetch_coordinates.get_region(tweet["coordinates"]["coordinates"])
            if not categories or not region:
                return
            for category in categories:
                server["tweets"]({"region": region, "type": category[0], "subtype": category[1],
                                  "tweet": tweet["text"], "coordinates": tweet["coordinates"]["coordinates"]})
                print({"region": region, "type": category[0], "subtype": category[1],
                       "tweet": tweet["text"], "coordinates": tweet["coordinates"]["coordinates"]}, flush=True)
    return len(response["statuses"])


def categorize(tweet):
    categories = []
    keywords = stem_keywords.get_keywords()
    for topic, subtopics in keywords.items():
        for subtopic, words in subtopics.items():
            for word in words:
                if word in tweet:
                    categories.append((topic, subtopic))
                break

    return categories


def create_headers(bearer_token):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    return headers


def create_url(keyword, max_results=10):
    search_url = "https://api.twitter.com/1.1/search/tweets.json"

    query_params = {'q': keyword,
                    'geocode': '-37.840935,144.946457,500km',
                    "count": 100}

    return search_url, query_params


def connect_to_endpoint(url, headers, params, next_token=None):
    params['since_id'] = next_token
    response = requests.request("GET", url, headers=headers, params=params)

    if response.status_code != 200:
        raise Exception(response.status_code, response.text)

    return response.json()


def request_url(params, headers):
    base_url = "https://api.twitter.com/1.1/search/tweets.json"
    response = requests.request("GET", base_url + params, headers=headers)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)

    return response.json()


def get_coordinates(place_id, headers):
    return requests.request("GET", "https://api.twitter.com/1.1/geo/id/" + place_id + ".json",
                            headers=headers).json()["centroid"]


def combine_keywords():

    words = stem_keywords.get_keywords()
    return "(" + " OR ".join([topic for key in words for topic in words[key] if key != "other"]) + ")" + " lang:en"


main()

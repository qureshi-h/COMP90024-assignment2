import os
import time
from dotenv import load_dotenv

import couchdb
import requests

# import fetch_coordinates
import stem_keywords

KEYWORDS = stem_keywords.get_keywords()

load_dotenv()


def main():
    headers = create_headers(os.getenv('BEARER_TOKEN'))
    keyword = combine_keywords() + " lang:en"
    print(len(keyword))
    max_results = 100
    limit = 1000
    next_token = None

    username = os.getenv("COUCHDB_USERNAME")
    password = os.getenv("COUCHDB_PASSWORD")
    server = couchdb.Server("http://%s:%s@172.26.133.72:5984/" % (username, password))

    url = create_url(keyword, max_results)

    response = connect_to_endpoint(url[0], headers, url[1], next_token)
    counter = process_tweet(response, server)
    refresh_url = response['search_metadata']["refresh_url"]
    while counter < limit:
        response = request_url(refresh_url, headers)
        counter += process_tweet(response, server)

        refresh_url = response['search_metadata']["refresh_url"]
        time.sleep(10)

    print("\n", counter, "tweets found!")


def process_tweet(response, server):
    for tweet in response["statuses"]:
        if tweet["coordinates"]:
            categories = categorize(tweet["text"])
            # region = fetch_coordinates.get_region(tweet["doc"]["coordinates"]["coordinates"])
            region = "Melbourne"
            if not categories or not region:
                return
            for category in categories:
                server["tweets"]({"region": region, "type": category[0], "subtype": category[1],
                                  "tweet": tweet["text"], "coordinates": tweet["coordinates"]["coordinates"]})
                print({"region": region, "type": category[0], "subtype": category[1],
                       "tweet": tweet["text"], "coordinates": tweet["coordinates"]["coordinates"]})
    return len(response["statuses"])


def categorize(tweet):
    categories = []
    for topic, subtopics in KEYWORDS.items():
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
                    'geocode': '-37.840935,144.946457,5000km',
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

    return "(" + " OR ".join([topic for key in KEYWORDS for topic in KEYWORDS[key]]) + ")"


main()

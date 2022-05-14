import requests
import os
import time
from dotenv import load_dotenv

import couchdb

load_dotenv()


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
    print("Endpoint Response Code: " + str(response.status_code))
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


def main():

    headers = create_headers(os.getenv('BEARER_TOKEN'))
    keyword = ""
    max_results = 100
    limit = 1000
    counter = 0
    next_token = None

    username = os.getenv("COUCHDB_USERNAME")
    password = os.getenv("COUCHDB_PASSWORD")
    server = couchdb.Server("http://%s:%s@172.26.133.72:5984/" % (username, password))

    url = create_url(keyword,  max_results)

    response = connect_to_endpoint(url[0], headers, url[1], next_token)
    refresh_url = response['search_metadata']["refresh_url"]

    while counter < limit:
        response = request_url(refresh_url, headers)

        for tweet in response["statuses"]:
            if tweet["coordinates"]:
                print(tweet["coordinates"]["coordinates"])
                print(tweet["text"])
                server["tweets"].save({'text': tweet["text"], 'coordinates': tweet["coordinates"]["coordinates"]})

        refresh_url = response['search_metadata']["refresh_url"]
        time.sleep(10)

    print("\n", counter, "tweets found!")


main()

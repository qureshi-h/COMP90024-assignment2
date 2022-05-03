import requests
import os

from dotenv import load_dotenv


load_dotenv()


def create_headers(bearer_token):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    return headers


def create_url(keyword, max_results=10):
    search_url = "https://api.twitter.com/2/tweets/search/recent"

    # 'expansions': 'author_id,in_reply_to_user_id,geo.place_id',
    # 'tweet.fields': 'id,text,author_id,in_reply_to_user_id,geo,conversation_id,created_at,lang,public_metrics,
    #                   referenced_tweets,reply_settings,source',
    # 'user.fields': 'id,name,username,created_at,description,public_metrics,verified',
    # 'place.fields': 'full_name,id,country,country_code,geo,name,place_type',

    query_params = {'query': keyword,
                    'max_results': max_results,
                    'expansions': 'geo.place_id',
                    'tweet.fields': 'id,text,geo,created_at,lang,public_metrics',
                    'place.fields': 'full_name,id,country,country_code,geo,name,place_type',
                    'next_token': {"b26v89c19zqg8o3fpywl7qbeqgz6kfe7glnjnzheeucu5"}}

    return search_url, query_params


def connect_to_endpoint(url, headers, params, next_token=None):
    params['next_token'] = next_token
    response = requests.request("GET", url, headers=headers, params=params)
    print("Endpoint Response Code: " + str(response.status_code))
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)

    return response.json()


def get_coordinates(place_id, headers):
    return requests.request("GET", "https://api.twitter.com/1.1/geo/id/" + place_id + ".json",
                            headers=headers).json()["centroid"]


def main():

    headers = create_headers(os.getenv('BEARER_TOKEN'))
    keyword = "melbourne lang:en"
    max_results = 100
    limit = 1000
    counter = 0
    next_token = None

    url = create_url(keyword,  max_results)

    while counter < limit:
        tweets = connect_to_endpoint(url[0], headers, url[1], next_token)

        for place in tweets["includes"]["places"]:
            print(place)

        counter += tweets["meta"]["result_count"]
        next_token = tweets["meta"]["next_token"]
        # print(tweets["includes"])


main()

from dotenv import load_dotenv
import os
import tweepy
import json

load_dotenv()


def harvest_tweets(query, bearer_token):

    if not bearer_token:
        raise RuntimeError("Not found bearer token")

    client = tweepy.Client(bearer_token)

    # https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query
    max_results = 30
    limit = 30
    counter = 0

    # https://docs.tweepy.org/en/stable/client.html#search-tweets
    response = client.search_recent_tweets(query=query, max_results=max_results, place_fields="contained_within,country,country_code,full_name,geo,id,name,place_type",
                                           expansions="geo.place_id",)

    print(response)
    if response.errors:
        raise RuntimeError(response.errors)
    print(response.includes["places"])
    for tweet in response.data:
        print(tweet.geo)
        counter += 1

    print(response.meta)
    # while "next_token" in response.meta.keys() and response.meta["next_token"] and counter < limit:
    #     response = client.search_recent_tweets(query, max_results=max_results, next_token=response.meta["next_token"])
    #     print(response)
    #     if response.errors:
    #         raise RuntimeError(response.errors)
    #     print(response.includes)
    #     for tweet in response.data:
    #         print(tweet.geo)
    #
    #         # if len(tweet.context_annotations) > 0:
    #         #     print(tweet.context_annotations)
    #         counter += 1
    print(counter)


harvest_tweets('(happy) melbourne', os.getenv('BEARER_TOKEN'))





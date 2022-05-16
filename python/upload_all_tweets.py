import json
import couchdb
from json import JSONDecodeError

import os
from dotenv import load_dotenv

load_dotenv()


username = os.getenv("COUCHDB_USERNAME")
password = os.getenv("COUCHDB_PASSWORD")
server = couchdb.Server("http://%s:%s@172.26.133.72:5984/" % (username, password))

print([file for file in server])

BATCH_SIZE = 50000
with open("all_tweets.json") as file:
    file.readline()
    while True:
        current_batch = []
        for i in range(BATCH_SIZE):
            try:
                current_batch.append(json.loads(file.readline()[:-2]))
            except JSONDecodeError:
                print("JSON Decode Error")
                server["all_tweets"].update(current_batch)
                break
            except:
                print("Uploaded %d batches of size %d" % (i, BATCH_SIZE))
                server["all_tweets"].update(current_batch)
                break
        else:
            server["all_tweets"].update(current_batch)
            continue
        break



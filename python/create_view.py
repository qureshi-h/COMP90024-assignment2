import couchdb
import os
from dotenv import load_dotenv

load_dotenv()


def createView( dbConn, designDoc, viewName, mapFunction ):
    data = {
            "_id": f"_design/{designDoc}",
            "views": {
                viewName: {
                    "map": mapFunction
                    }
            },
            "language": "javascript",
            "options": {"partitioned": False }
            }
    dbConn.save(data)


def main():
    username = os.getenv("COUCHDB_USERNAME")
    password = os.getenv("COUCHDB_PASSWORD")
    server = couchdb.Server("http://%s:%s@172.26.133.72:5984/" % (username, password))

    mapFunction = '''function (doc) {
                          emit(doc.region, 1);
                        }'''
    createView( server["all_tweets"], "CountSpecs", "total", mapFunction)


main()

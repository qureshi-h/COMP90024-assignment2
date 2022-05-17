FROM ibmcom/couchdb3:latest

ADD local.ini /opt/couchdb/etc/local.ini/

ENV BEARER_TOKEN None
ENV COUCHDB_USER admin  
ENV COUCHDB_PASSWORD admin
ENV COUCHDB_SECRET a192aeb9904e6590849337933b000c99

CMD [ "python", "./src/twitter_streaming.py" ]
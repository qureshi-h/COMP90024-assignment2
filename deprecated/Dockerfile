FROM ibmcom/couchdb3:latest

ADD local.ini /opt/couchdb/etc/

ENV COUCHDB_USER admin  
ENV COUCHDB_PASSWORD admin
ENV COUCHDB_SECRET a192aeb9904e6590849337933b000c99
ENV ERL_FLAGS="-setcookie \"${cookie}\" -name \"couchdb@${node}\""\
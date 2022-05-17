sudo usermod -aG docker $USER
newgrp docker

export declare -a node=172.17.0.2
export user='admin'
export pass='admin'
export VERSION='3.2.1'
export cookie='a192aeb9904e6590849337933b000c99'

docker pull ibmcom/couchdb3:${VERSION}

# stop if anything running
if [ ! -z $(docker ps --all --filter "name=couchdb${node}" --quiet) ] 
    then
        docker stop $(docker ps --all --filter "name=couchdb${node}" --quiet) 
        docker rm $(docker ps --all --filter "name=couchdb${node}" --quiet)
fi 

docker volume create --name couchdb --driver local \
    --opt type=tmpfs \
    --opt device=tmpfs \
    --opt o=size=100g,uid=1000 

docker run -p 0.0.0.0:5984:5984 -d\
      -v data:/opt/couchdb/data\
      --name couchdb${node}\
      --env COUCHDB_USER=${user}\
      --env COUCHDB_PASSWORD=${pass}\
      --env COUCHDB_SECRET=${cookie}\
      --env ERL_FLAGS="-setcookie \"${cookie}\" -name \"couchdb@${node}\""\
      ibmcom/couchdb3:${VERSION}


# enable cors 
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential
sudo npm install npm -g
sudo npm install -g add-cors-to-couchdb
add-cors-to-couchdb http://localhost:5984 -u admin -p admin

# sudo ss -tulpn | grep LISTEN

# curl -XPUT "http://${user}:${pass}@${node}:5984/twitter"

# docker exec -ti 885 sh -c "ls -ltr /opt/couchdb/data"

# curl -XPOST "http://${user}:${pass}@${node}:5984/twitter/_bulk_docs " --header "Content-Type: application/json" --data @./twitter/data.json

# curl -XPOST "http://admin:admin@172.26.133.72:5984/twitter/_bulk_docs " --header "Content-Type: application/json" --data json_data_new.json

# curl -X PUT http://172.26.133.72:5984/_node/_local/_config/couchdb/os_process_timeout -d '"35000"' -u admin:admin

# docker build -t couchdb-node:1.0 .

# docker run -p 0.0.0.0:5984:5984 -d -v data:/opt/couchdb/data couchdb-node:1.0
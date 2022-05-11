sudo usermod -aG docker $USER
newgrp docker

export declare -a node=172.17.0.2
export user='admin'
export pass='admin'
export VERSION='latest'
export cookie='a192aeb9904e6590849337933b000c99'

docker pull ibmcom/couchdb2:${VERSION}

# stop if anything running
if [ ! -z $(docker ps --all --filter "name=couchdb${node}" --quiet) ] 
    then
        docker stop $(docker ps --all --filter "name=couchdb${node}" --quiet) 
        docker rm $(docker ps --all --filter "name=couchdb${node}" --quiet)
fi 

docker run -p 0.0.0.0:5984:5984 -d\
      --name couchdb${node}\
      --env COUCHDB_USER=${user}\
      --env COUCHDB_PASSWORD=${pass}\
      --env COUCHDB_SECRET=${cookie}\
      --env ERL_FLAGS="-setcookie \"${cookie}\" -name \"couchdb@${node}\""\
      ibmcom/couchdb2:${VERSION}

# sudo ss -tulpn | grep LISTEN

cd web\ application/

docker build -f ./Dockerfile_server -t server:1.0 .
docker run -p 5001:5001 -d server:1.0

docker build -f ./Dockerfile_client -t app:1.0 .
docker run -p 3000:3000 -d app:1.0
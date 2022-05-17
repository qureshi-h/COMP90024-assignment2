cd twitter_harvester

# 144.972153,-37.785911,145.648499,-37.463959
# 144.022522,-38.481545,144.972153,-37.785911
# 144.021149,-37.785911,144.972153,-37.463959
# 144.972153,-38.481545,145.648499,-37.785911

docker build -f ./Dockerfile_harvesters -t twitter_harvester:1.0 .
docker run -d --env BOUNDING_BOX="144.972153,-37.785911,145.648499,-37.463959" --env BEARER_TOKEN=<your_token_here> \
    twitter_harvester:1.0

cd ..
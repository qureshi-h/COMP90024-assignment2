cd twitter_harvester

# 4 mutually exclusive bounding boxes around Melbourne
# 144.972153,-37.785911,145.648499,-37.463959
# 144.022522,-38.481545,144.972153,-37.785911
# 144.021149,-37.785911,144.972153,-37.463959
# 144.972153,-38.481545,145.648499,-37.785911

docker build -f ./Dockerfile_harvesters -t twitter_harvester:1.0 .
docker run -d --env KEYWORDS="" \
    --env BOUNDING_BOX="144.972153,-38.481545,145.648499,-37.785911" \
    --env BEARER_TOKEN=<BEARER_TOKEN> \
    twitter_harvester:1.0

cd ..
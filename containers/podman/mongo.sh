podman network create dev

podman volume create mongoData

podman run -d --name mongodb --network dev \
    -p 27017:27017 \
    --restart unless-stopped \
    mongodb/mongodb-community-server:7.0.8-ubi9
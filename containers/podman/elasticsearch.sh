podman network create dev

podman volume create es-data

podman run -d --network dev --name elasticsearch \
    -v es-data:/usr/share/elasticsearch/data \
    -p 9200:9200 \
    --health-cmd "curl --user elastic:elastic http://localhost:9200" \
    --health-interval 10s \
    --health-retries 10 \
    -e ELASTIC_PASSWORD=elastic \
    localhost/elastic:latest
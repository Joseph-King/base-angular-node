podman network create dev

podman volume create es-data

podman run -d --network dev --name kibana \
    -p 5601:5601 \
    -e ELASTICSEARCH_PASSWORD=kibana \
    -e ELASTICSEARCH_USERNAME=kibana_user \
    docker.elastic.co/kibana/kibana:8.15.2
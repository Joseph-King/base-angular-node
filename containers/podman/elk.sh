podman network create dev

podman volume create es-data

podman build --file ../config/elastic/Containerfile --tag elastic

podman run -d --network dev --name elasticsearch \
    -p 9200:9200 \
    -m 2g \
    -v es-data:/usr/share/elasticsearch/data \
    -v ../config/elastic/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
    localhost/elastic:latest

podman run -d --network dev --name kibana \
    -p 5601:5601 \
    -e ELASTICSEARCH_PASSWORD=kibana \
    docker.elastic.co/kibana/kibana:8.15.2


    # -v ../config/elastic/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
    # -e ELASTIC_PASSWORD=elastic \

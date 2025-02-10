podman network create dev

podman volume create es-data

podman build --file ../config/elastic/Containerfile --tag elastic

podman run -d --network dev --name elasticsearch \
    -p 9200:9200 \
    -v es-data:/usr/share/elasticsearch/data \
    --env-file ./../config/elastic/dev.env \
    localhost/elastic:latest

podman run -d --network dev --name kibana \
    -p 5601:5601 \
    --env-file ./../config/elastic/dev.env \
    docker.elastic.co/kibana/kibana:8.15.2

podman run -d --network dev --name logstash \
    -p 5044:5044 \
    -v ./../config/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
    -v ./../config/logstash/logstash.yml:/usr/share/logstash/config/logstash.yml \
    docker.elastic.co/logstash/logstash:8.15.2

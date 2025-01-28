# es-fluentd/Dockerfile

FROM docker.elastic.co/elasticsearch/elasticsearch:8.15.2

ENV discovery.type=single-node
ENV xpack.security.enabled=true

EXPOSE 9200

RUN bin/elasticsearch-users useradd kibana_user -p a2liYW5hCg== -r kibana_system
RUN bin/elasticsearch-users useradd fluentd -p Zmx1ZW50ZAo= -r superuser
RUN bin/elasticsearch-users useradd logstash_user -p bG9nc3Rhc2gK -r superuser
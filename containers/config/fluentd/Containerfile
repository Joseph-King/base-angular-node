FROM fluent/fluentd:v1.17.1-debian-1.0
USER root
# , "--no-document", "--version", "5.4.3"
RUN ["gem", "install", "fluent-plugin-elasticsearch"]
USER fluent
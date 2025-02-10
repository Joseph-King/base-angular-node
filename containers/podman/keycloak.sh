podman network create dev

podman volume create keycloak-data

podman run -d --network dev --name keycloakdb \
    -v keycloak-data:/var/lib/postgresql/data \
    -e POSTGRES_DB=keycloak \
    -e POSTGRES_USER=keycloak \
    -e POSTGRES_PASSWORD=password \
    postgres:15

podman run -d --network dev --name keycloak -p 8080:8080 \
    -e KC_DB=postgres \
    -e KC_DB_URL=jdbc:postgresql://keycloakdb:5432/keycloak \
    -e KC_DB_USERNAME=keycloak \
    -e KC_DB_PASSWORD=password \
    -e KC_HOSTNAME=localhost \
    -e KC_HOSTNAME_PORT=8080 \
    -e KC_HOSTNAME_STRICT=false \
    -e KC_HOSTNAME_STRICT_HTTPS=false \
    -e KC_HTTP_ENABLED=true \
    -e KC_PROXY=edge \
    -e KC_LOG_LEVEL=info \
    -e KC_METRICS_ENABLED=true \
    -e KC_HEALTH_ENABLED=true \
    -e KEYCLOAK_ADMIN=admin \
    -e KEYCLOAK_ADMIN_PASSWORD=admin \
    quay.io/keycloak/keycloak:latest start-dev
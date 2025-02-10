podman network create dev

podman pod create --network dev -p 8080:8080 keycloak

podman volume create keycloak-data

podman run -d --pod keycloak --name keycloakdb \
    -v keycloak-data:/var/lib/postgresql/data \
    --restart unless-stopped \
    --env-file ./../config/keycloak/dev.env \
    postgres:15

podman run -d --pod keycloak --name keycloak \
    --restart unless-stopped \
    --requires keycloakdb \
    --env-file ./../config/keycloak/dev.env \
    quay.io/keycloak/keycloak:latest start-dev
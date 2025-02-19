export const environment = {
    env: 'dev',
    authenticate: 'jwt',
    authorize: 'jwt',
    backend_url: 'http://localhost:3000/',

    title:'base-angular-node',

    keycloak: {
        url: 'http://localhost:8080',
        realm: 'test',
        clientId: 'test'
    },

    protectedRoutes: {
        admin: 'admin'
    }
}
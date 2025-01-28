const axios = require("axios");
const https = require("https");

const config = {
    url: process.env.KEYCLOAK_URL,
    realm: process.env.KEYCLOAK_REALM,
    cert: process.env.KEYCLOAK_CERT
}

const testConnection = async function(){
    return new Promise((resolve) => {
        let axiosData = {};

        //Adds rejectUnauthorized call if expecting unsecure connection
        if(config.cert === 'UNSECURE'){
            axiosData['httpsAgent'] = new https.Agent({ rejectUnauthorized: false })
        }

        axios.get(`${config.url}`, axiosData)
            .then((res) => {
                if(res.status && res.status === 200)
                    resolve(`SUCCESS. Connected to AUTH: Keycloak at ${config.url}`);
                else {  
                    console.log(res); 
                    resolve(`ERROR. Cannot connect to AUTH: Keycloak at ${config.url}`);
                }
            })
            .catch((err) => {
                console.log(err);
                resolve(`ERROR. Cannot connect to AUTH: Keycloak at ${config.url}`);
            });
    })
}

const authenticate = async function(authHeader){
    return new Promise((resolve, reject) => {
        //Contains any and all axios required headers, data, etc.
        //Required if needed to add things like the httpsAgent below (don't want to add it for everything)
        let axiosData = {
            headers: {
                Authorization: authHeader
            }
        };

        //Adds rejectUnauthorized call if expecting unsecure connection
        if(config.cert === 'UNSECURE'){
            axiosData['httpsAgent'] = new https.Agent({ rejectUnauthorized: false })
        }
        
        //Sends request to target keycloak from environment file with user info from the auth header in request
        axios.get(`${config.url}realms/${config.realm}/protocol/openid-connect/userinfo`, axiosData)
            .then((res) => {
                if(res.status !== 200){
                    let result = {
                        res: false,
                        user: res.data.preferred_username ? res.data.preferred_username : undefined
                    };
                    resolve(result);
                }
                else {
                    let result = {
                        res: true,
                        user: res.data.preferred_username ? res.data.preferred_username : undefined
                    };
                    resolve(result)
                }
            })
            .catch((err) => {
                reject(err);
            });
    })
}

module.exports = { testConnection, authenticate }
const axios = require('axios');

const config = {
    url: process.env.KIBANA_URL,
    user: process.env.KIBANA_USER,
    pass: process.env.KIBANA_PASS
}

const headers = {
    'Authorization': `Basic ${Buffer.from(`${config.user}:${config.pass}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const testConnection = async function(){
    return new Promise((resolve) => {
        axios.get(`${config.url}`, { headers: headers })
            .then((resp) =>{
                // console.log(resp);
                resolve(`SUCCESS. Connected to API: Kibana at ${config.url}`);
            })
            .catch((err) =>{
                console.log(err)
                resolve(`ERROR. Cannot connect to API: Kibana at ${config.url}`);
            })
    })
}

module.exports = { testConnection }
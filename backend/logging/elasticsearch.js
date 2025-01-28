const axios = require('axios');

const config = {
    url: process.env.LOGGER_URL,
    user: process.env.LOGGER_USER,
    pass: process.env.LOGGER_PASS
}

const headers = {
    'Authorization': `Basic ${Buffer.from(`${config.user}:${config.pass}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const Log = require('./models/log');

const testConnection = async function(){
    return new Promise((resolve, reject) => {
        axios.get(`${config.url}`, {headers: headers})
            .then((resp) => {
                resolve(`SUCCESS. Connected to DB: elasticsearch at ${config.url}`)
            })
            .catch((err) => {
                console.log(err);
                resolve(`ERROR. Cannot connect to DB: elasticsearch at ${config.url}`)
            });
    })
}

module.exports = { testConnection }
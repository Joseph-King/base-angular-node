const axios = require('axios');

const headers = {
    'Authorization': `Basic ${Buffer.from(`${process.env.DB_USER}:${process.env.DB_USER}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const testConnection = async function(){
    console.log('here');
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.DB_URL}`, {headers: headers})
            .then((resp) => {
                resolve(`SUCCESS. Connected to DB: elasticsearch at ${process.env.DB_URL}`)
            })
            .catch((err) => {
                console.log(err);
                resolve(`ERROR. Cannot connect to DB: elasticsearch at ${process.env.DB_URL}`)
            });
    })
}

module.exports = { testConnection }
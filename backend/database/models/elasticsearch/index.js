const axios = require('axios');

const config = {
    url: process.env.DB_URL,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}

const headers = {
    'Authorization': `Basic ${Buffer.from(`${config.user}:${config.pass}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const getIndex = function(index){
    return new Promise((resolve, reject) => {
        axios.get(`${config.url}${index}`, { headers: headers })
        .then((resp) => {
            // console.log(resp);
            resolve(resp);
        })
        .catch((err) => {
            // console.log('err');
            resolve(err);
        });
    })
}

function createIndex(index){
    return new Promise((resolve, reject) => {
        axios.put(`${config.url}${index}`, {}, { headers: headers })
        .then((resp) => {
            console.log(`${index} created for: ${config.url}`);
            console.trace();
            resolve(resp);
        })
        .catch((err) => {
            console.log(`Error creating index for: ${config.url}` );
            console.trace();
            reject(err);
        });
    })
}

function deleteIndex(index){
    return new Promise((resolve, reject) => {
        axios.delete(`${config.url}${index}`, { headers: headers })
        .then((resp) => {
            console.log(`INDEX: ${index} deleted for: ${config.url}`);
            console.trace();
            resolve(resp);
        })
        .catch((err) => {
            console.log(`Error deleting index for: ${config.url}` );
            console.trace();
            reject(err);
        });
    })
}

module.exports = { getIndex, createIndex, deleteIndex }
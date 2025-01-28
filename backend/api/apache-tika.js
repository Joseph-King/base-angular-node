const axios = require('axios');

const config = {
    url: process.env.TIKA_URL
}

const testConnection = async function(){
    return new Promise((resolve) => {
        axios.get(`${config.url}`)
            .then((resp) =>{
                // console.log(resp);
                resolve(`SUCCESS. Connected to API: Apache Tika at ${config.url}`);
            })
            .catch((err) =>{
                console.log(err)
                resolve(`ERROR. Cannot connect to API: Apache Tika at ${config.url}`);
            })
    })
}

module.exports = { testConnection }
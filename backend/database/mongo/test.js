const mongoose = require('mongoose');

const testConnection = async function(url){
    return new Promise((resolve, reject) => {
        mongoose.connect(`${url}`)
        .then(() => {
            resolve(`SUCCESS. Connected to DB: ${process.env.DB} at ${process.env.DB_URL}`);
        })
        .catch((err) => {
            console.log(err);
            resolve(`ERROR. Cannot connect to DB: ${process.env.DB} at ${process.env.DB_URL}`)
        })
    })
}

module.exports = { testConnection }
const getUserData = require('../auth/hybrid-functions/getUserData');

const Log = require('./models/log');

const testConnection = async function(){
    return new Promise((resolve) => {
        resolve(`N/A. LOGGER: ${process.env.LOGGER}, no need to test. Will display logs in console`);
    })
}

const logEndpoint = async function(status, message, req, userData){
    
    let log = new Log(
        status,
        message,
        req.originalUrl,
        req.params,
        userData ? userData.user : await getUserData(req)
    );

    console.log(log);

    return new Promise ((resolve) => {
        resolve(log);
    })
}

const logAuth = async function(status, message, req, user){
    let log = new Log(
        status,
        message,
        req.originalUrl,
        req.params,
        user ? user : undefined
    );

    console.log(log);

    return new Promise ((resolve) => {
        resolve(log);
    })
}

module.exports = { testConnection, logEndpoint, logAuth };
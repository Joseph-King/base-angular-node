const axios = require('axios');

const getUserData = require('../auth/hybrid-functions/getUserData');

const Log = require('./models/log');

const headers = undefined;

const testConnection = async function(){
    return new Promise((resolve) => {
        setTimeout(() => {
            axios.get(process.env.LOGGER_URL, headers)
            .then((resp) => {
                // console.log(resp);
                resolve(`SUCCESS. Connected to LOGGER: ${process.env.LOGGER} at ${process.env.LOGGER_URL}`);
            })
            .catch((err) => {
                console.log(err);
                resolve(`ERROR. Cannot connect to LOGGER: ${process.env.LOGGER} at ${process.env.LOGGER_URL}`);
            })
        }, 500)
    })
}

/**
 * 
 * @param {NUM of http status code} status 
 * @param {OBJ of req} req 
 * @param {OBJ of user data} userData 
 */
const logEndpoint = async function(status, req, userData){
    if(!userData){
        userData = await getUserData(req);
    }
    
    let log = new Log(
        status,
        message,
        req.originalUrl,
        req.params,
        userData ? userData.user : await getUserData(req)
    );

    let url = `${process.env.LOGGER_URL}${process.env.ENV === 'development' ? 'server.dev' : 'server.prod'}`;
    
    console.log(log);

    return new Promise((resolve) => {
        axios.post(url, log, headers)
        .then((resp) => {
            console.log('logEndpoint success');
            resolve(resp);
        })
        .catch((error) => {
            console.log('logEndpoint failure');
            resolve(error);
        })
    });
}

/**
 * 
 * @param {NUM of http status code} status 
 * @param {OBJ of req} req 
 * @param {OBJ containes req.headers.authorization or gathered user data for someone who is unauthorized} user 
 */
const logAuth = async function(status, req, user){
    let log = new Log(
        status,
        req.originalUrl,
        req.params,
        user ? user : undefined
    );

    let url = `${process.env.LOGGER_URL}${process.env.ENV === 'development' ? 'server.dev' : 'server.prod'}`;

    console.log(log);

    return new Promise((resolve) => {
        axios.post(url, log, headers)
        .then((resp) => {
            console.log(`logAuth success`);
            resolve(resp);
        })
        .catch((error) => {
            console.log(`logAuth failure`);
            console.log(error);
            resolve(error);
        })
    });
}

module.exports = { testConnection, logEndpoint, logAuth };
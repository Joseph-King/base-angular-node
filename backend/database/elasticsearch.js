const axios = require('axios');
const jwt = require('jsonwebtoken');

const config = {
    url: process.env.DB_URL,
    secret: process.env.DB_SECRET,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}

const headers = {
    'Authorization': `Basic ${Buffer.from(`${config.user}:${config.pass}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const Index = require(`./models/elasticsearch/index`);
const User = require(`./models/elasticsearch/user`);

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

const registerUser = async function(body){
    return new Promise(async (resolve) => {
        try {
            let checkIndex = await Index.getIndex('users');
            if(checkIndex && checkIndex.status && checkIndex.status !== 200){
                let createIndex = await Index.createIndex('users');

                if(createIndex && createIndex.status && createIndex.status !== 200){
                    resolve(createIndex);
                    return;
                }
            }
            
            let addResult = await User.addUser(body);
            resolve(addResult);
        } catch(err) {
            console.log(err);
            resolve(err);
        }
    })
}

const authenticateUser = async function(username, password){
    return new Promise(async (resolve) => {
        let authResult = await User.getUserByUsername(username);
        console.log(authResult);

        if(authResult._source.password && User.comparePassword(authResult, password)){
            try {
                let user = {
                    id: authResult._id,
                    firstName: authResult._source.firstName,
                    lastName: authResult._source.lastName,
                    username: authResult._source.username,
                    password: authResult._source.password,
                    email: authResult._source.email,
                }

                let token = jwt.sign(user, config.secret, {
                    expiresIn: 21600 //6 hours
                });

                delete user.password;

                resolve({
                    res: true,
                    user: user,
                    token: `JWT ${token}`
                })
            } catch(err) {
                console.log(err);
                resolve({res: false, user: undefined, token: undefined});
            }
        } else {
            resolve({res: false, user: undefined, token: undefined});
        }
    })
}

const getUserByID = async function(id){
    return new Promise(async (resolve) => {
        let userRes = await User.getUserByID(id);

        if(userRes.username){
            let user = {
                id: id,
                firstName: userRes.firstName,
                lastName: userRes.lastName,
                username: userRes.username,
                email: userRes.email
            }

            resolve(user);
        } else {
            resolve(undefined);
        }
    })
}

module.exports = { testConnection, registerUser, authenticateUser, getUserByID }
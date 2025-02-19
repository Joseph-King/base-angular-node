const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = {
    database: process.env.DB_URL,
    secret: process.env.DB_SECRET,
    token_secret: process.env.TOKEN_SECRET
}

const User = require(`./models/mongo/user`)

const testConnection = async function() {
    return new Promise((resolve, reject) => {
        mongoose.connect(`${config.database}`)
		.then(() => {
            resolve(`SUCCESS. Connected to DB: ${process.env.DB} at ${process.env.DB_URL}`);
        })
        .catch((err) => {
            console.log(err);
            resolve(`ERROR. Cannot connect to DB: ${process.env.DB} at ${process.env.DB_URL}`)
        })
    })
}

const registerUser = async function(body){
    return new Promise(async (resolve) => {
        let findUserRes = await User.getUserByEmail(body.email);
        if(findUserRes !== null){
            resolve({status: 0, message: 'Email already exists'});
            return;
        }

        findUserRes = await User.getUserByUsername(body.username);
        if(findUserRes !== null){
            resolve({status: 0, message: 'Username already exists'});
            return;
        }

        let addResult = await User.addUser(body);

        resolve(addResult);
    })
}

const authenticateUser = async function(username, password){
    return new Promise(async (resolve) => {
        let authResult = await User.getUserByUsername(username);

        if(authResult.password && User.comparePassword(authResult, password)){
            try {
                let user = {
                    id: authResult._id,
                    firstName: authResult.firstName,
                    lastName: authResult.lastName,
                    username: authResult.username,
                    email: authResult.email,
                    roles: authResult.roles
                }
                console.log(config.token_secret);
                let token = jwt.sign({ data: user } , config.token_secret, {
                    expiresIn: 21600 //6 hours
                });

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

        if(userRes._id){
            let user = {
                id: userRes._id,
                firstName: userRes.firstName,
                lastName: userRes.lastName,
                username: userRes.username,
                email: userRes.email,
                roles: userRes.roles
            }

            resolve(user);
        } else {
            resolve(undefined);
        }
    })
}

const getUserByUsername = async function(username){
    return new Promise(async (resolve) => {
        let userRes = await User.getUserByUsername(username);

        if(userRes === null){
            resolve(null);
            return;
        }

        if(userRes._id){
            let user = {
                id: userRes._id,
                firstName: userRes.firstName,
                lastName: userRes.lastName,
                username: userRes.username,
                email: userRes.email,
                roles: userRes.roles
            }

            resolve(user);
        } else {
            resolve(undefined);
        }
    })
}

module.exports = { testConnection, registerUser, authenticateUser, getUserByID, getUserByUsername }
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = {
    database: process.env.DB_URL,
    secret: process.env.DB_SECRET,
    token_secret: process.env.TOKEN_SECRET
}

const User = require(`./models/mongo/user`);
const Role = require ('./models/mongo/roles');
const Group = require('./models/mongo/groups');

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

//USER FUNCTIONS

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
                    roles: authResult.roles,
                    groups: authResult.groups
                }

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

const deleteUser = async function(user){
    return new Promise((resolve) => {
        console.log(user);
        // let checkAdmin = User.getUsersByRole()
    })
}

const editUser = async function(user){
    return new Promise((resolve) => {
        resolve('editUsers');
    })
}

const getUsers = async function(){
    return new Promise(async (resolve) => {
        let userRes = await User.getUsers();

        console.log(userRes);
        resolve(userRes);
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
                roles: userRes.roles,
                groups: userRes.groups
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
                roles: userRes.roles,
                groups: userRes.groups
            }

            resolve(user);
        } else {
            resolve(undefined);
        }
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

//ROLE FUNCTIONS

const addRole = function(body){
    return new Promise(async (resolve) => {
        let addResult = await Role.addRole(body);

        resolve(addResult);
    })
}

const deleteRole = function(role){
    return new Promise(async (resolve) => {
        if(role.name === 'admin'){
            resolve({status: 405, message: 'Admin role is a protected role. Cannot be deleted'});
        }

        let doesUserHaveRole = await User.getUsersByRole(role);
        console.log(doesUserHaveRole);

        resolve('deleteRole');
    })
}

const editRole = function(role){
    return new Promise((resolve) => {
        resolve('editRole');
    })
}

const getRoles = function(){
    return new Promise((resolve) => {
        resolve('getRoles');
    })
}

const getRoleByID = function(id){
    return new Promise(async (resolve) => {
        let roleRes = await Role.getRoleByID(id);

        if(roleRes._id){
            let role = {
                id: roleRes._id,
                name: roleRes.name
            }

            resolve(role);
        } else {
            resolve(undefined);
        }
    })
}

const getRoleByName = function(name){
    return new Promise(async (resolve) => {
        let roleRes = await Role.getRoleByName(name);

        if(roleRes === null){
            resolve(null);
            return;
        }

        if(roleRes._id){
            let role = {
                id: roleRes._id,
                name: roleRes.name
            }

            resolve(role);
        } else {
            resolve(undefined);
        }
    })
}

//GROUP FUNCTIONS

const addGroup = function(body){
    return new Promise((resolve) => {
        resolve('addGroup');
    })
}

const deleteGroup = function(role){
    return new Promise((resolve) => {
        resolve('deleteGroup');
    })
}

const editGroup = function(role){
    return new Promise((resolve) => {
        resolve('editGroup');
    })
}

const getGroups = function(){
    return new Promise((resolve) => {
        resolve('getGroups');
    })
}

const getGroupByID = function(id){
    return new Promise((resolve) => {
        resolve('getGroupByID');
    })
}

const getGroupByName = function(name){
    return new Promise((resolve) => {
        resolve('getGroupsByName');
    })
}

module.exports = { 
    testConnection, 
    authenticateUser,  deleteUser, editUser, getUsers, getUserByID, getUserByUsername, registerUser,
    addRole, deleteRole, editRole, getRoles, getRoleByID, getRoleByName,
    addGroup, deleteGroup, editGroup, getGroups, getGroupByID, getGroupByName,
}
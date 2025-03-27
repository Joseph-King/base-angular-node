const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    roles: {
        type: [ String ],
        required: false
    },
    groups: {
        type: [ String ],
        required: false
    }
})

const User = mongoose.model("User", UserSchema);

const addUser = async function(body){
    let newUser = new User({
        firstName: body.firstName ? body.firstName : '',
        lastName: body.lastName ? body.lastName : '',
        username: body.username,
        password: body.password,
        email: body.email ? body.email: '',
        roles: body.roles ? body.roles : [],
        groups: body.groups ? body.groups : []
    });

    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(10, async (err, salt) => {                                                     
                if(err) throw err;
        
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if(err) throw err;
                    
                    newUser.password = hash;
                    let addRes = await newUser.save();
                    // console.log(addRes);

                    resolve(addRes);
                })
            })
        } catch(err) {
            reject(err);
        }
    })
}

const comparePassword = function(userInfo, password){
    return bcrypt.compareSync(password, userInfo.password);
}

const getUsers = function(){
    return new Promise((resolve, reject) => {
        try {
            let getRes = User.find();

            resolve(getRes);
        } catch(err) {
            reject(err);
        }
    })
}

const getUserByID = function(id){
    return new Promise(async (resolve, reject) => {
        try {
            let queryRes = User.findById(id);

            resolve(queryRes);
        } catch (err) {
            reject(err);
        }
    })
}

const getUserByUsername = async function(username){
    return new Promise(async (resolve, reject) => {
        try {
            const query = {
                username: username
            }

            let queryRes = await User.findOne(query);

            resolve(queryRes);
        } catch(err) {
            reject(err);
        }
    })
}

const getUserByEmail = async function(email){
    return new Promise(async (resolve, reject) => {
        try {
            const query = {
                email: email
            }

            let queryRes = await User.findOne(query);

            resolve(queryRes);
        } catch(err) {
            reject(err);
        }
    })
}

const getUsersByRole = async function(role){
    return new Promise(async(resolve, reject) => {
        try {
            const query = {
                roles: [ role._id ]
            }

            let queryRes = await User.find(query);

            resolve(queryRes);
        } catch(err) {
            reject(err);
        }
    })
}

module.exports = { addUser, comparePassword, 
    getUsers, getUserByID, getUserByUsername, getUserByEmail, getUsersByRole
}
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
        required: true
    }
})

const User = mongoose.model("User", UserSchema);

const getUserByID = function(id){
    return new Promise(async (resolve) => {
        try {
            let queryRes = User.findById(id);

            resolve(queryRes);
        } catch (err) {
            resolve(err);
        }
    })
}

const getUserByUsername = async function(username){
    return new Promise(async (resolve) => {
        try {
            const query = {
                username: username
            }

            let queryRes = await User.findOne(query);

            resolve(queryRes);
        } catch(err) {
            resolve(err);
        }
    })
}

const getUserByEmail = async function(email){
    return new Promise(async (resolve) => {
        try {
            const query = {
                email: email
            }

            let queryRes = await User.findOne(query);

            resolve(queryRes);
        } catch(err) {
            resolve(err);
        }
    })
}

const addUser = async function(body, callback){
    let newUser = new User({
        firstName: body.firstName ? body.firstName : '',
        lastName: body.lastName ? body.lastName : '',
        username: body.username,
        password: body.password,
        email: body.email ? body.email: '',
        roles: body.roles ? body.roles : []
    });

    return new Promise((resolve) => {
        try {
            bcrypt.genSalt(10, async (err, salt) => {                                                     
                if(err) throw err;
        
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if(err) throw err;
                    
                    newUser.password = hash;
                    let addRes = await newUser.save();
                    console.log(addRes);
                    resolve({status: 200});
                })
            })
        } catch(err) {
            resolve(err);
        }
    })
}

const comparePassword = function(userInfo, password){
    return bcrypt.compareSync(password, userInfo.password);
}

module.exports = { getUserByID, getUserByUsername, getUserByEmail, addUser, comparePassword }
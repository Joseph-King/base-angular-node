const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = {
    url: process.env.DB_URL,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    secret: process.env.DB_SECRET,
    token_secret: process.env.TOKEN_SECRET
}

const headers = {
    'Authorization': `Basic ${Buffer.from(`${config.user}:${config.pass}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const addUser = async function(body){ 
    let newUser = {
        firstName: body.firstName ? body.firstName : body.firstName,
        lastName: body.lastName ? body.lastName : body.lastName,
        username: body.username,
        password: body.password,
        email: body.email ? body.email: '',
        roles: body.roles ? body.roles : []
    }

    return new Promise(async (resolve) => {
        let findUserRes = await this.getUserByUsername(body.username);
        if(findUserRes !== null){
            resolve({ status: 0, message: 'Username already exists' });
            return;
        }

        if(body.email){
            findUserRes = await this.getUserByEmail(body.email);
            if(findUserRes !== null){
                resolve({status: 0, message: 'Email already exists'});
                return;
            }
        }
        
        bcrypt.genSalt(10, (err, salt) => {
            if(err) resolve(err);
    
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) resolve(err);
                
                newUser.password = hash;
                axios.post(`${config.url}users/_doc`, newUser, { headers: headers })
                    .then((resp) => {
                        console.log(`USER successfully added to DB`);
                        resolve(resp);
                    })
                    .catch((err) => {
                        console.log(err);
                        resolve(err);
                    })
            })
        })
    })
}

const authenticateUser = async function(username, password){
    return new Promise(async (resolve, reject) => {
        let usernameRes = await this.getUserByUsername(username);

        if(usernameRes.password && comparePassword(usernameRes, password)){
            try{
                let user = {
                    id: usernameRes._id,
                    firstName: usernameRes.firstName,
                    lastName: usernameRes.lastName,
                    username: usernameRes.username,
                    email: usernameRes.email,
                    roles: usernameRes.roles,
                    groups: usernameRes.groups
                }

                let token = jwt.sign({ data: user } , config.token_secret, {
                    expiresIn: 21600 //6 hours
                });

                let result = {
                    res: true,
                    user: user,
                    token: `JWT ${token}`
                };

                if(user.username === process.env.ADMIN_USERNAME){
                    result['message'] = 'Default Admin User';
                }

                resolve(result);
            } catch(err) {
                console.log(err);
                resolve({res: false, user: undefined, token: undefined});
            }
        } else {
            console.log(`Compare Password failed`);
            resolve({res: false, user: undefined, token: undefined});
        }
    })
}

const comparePassword = function(userInfo, password){
    return bcrypt.compareSync(password, userInfo.password);
}

const getUserByID = async function(id){
    return new Promise((resolve) => {
        axios.get(`${config.url}users/_doc/${id}`, { headers: headers })
            .then((resp) => {
                try {
                    let user = resp.data._source;
                    user._id = resp.data._id;

                    resolve(user);
                } catch (err) {
                    console.log(err);
                    resolve(null);
                }
                
            })
            .catch((err) => {
                console.log(err);
                resolve(null);
            })
    })
}

const getUserByUsername = async function(username){
    return new Promise((resolve) => {
        let search = {};
        search['username.keyword'] = username;
        let searchData = {
            'from': 0,
            'size': 1,
            'sort': {},
            'query': {
                'bool': {
                    'must': [
                        { "match_phrase": search }
                    ]
                }
            }
        }

        axios.get(`${config.url}users*/_search`, { headers: headers, data: searchData })
            .then((resp) => {
                try {
                    let user = resp.data.hits.hits[0]._source;
                    user._id = resp.data.hits.hits[0]._id;
                    resolve(user);
                } catch(err) {
                    console.log(err);
                    resolve(null);
                }
            })
            .catch((err) => {
                console.log(err);
                resolve(null);
            })
    })
}

const getUserByEmail = async function(email){
    return new Promise((resolve) => {
        let search = {};
        search['email.keyword'] = email;
        let searchData = {
            'from': 0,
            'size': 1,
            'sort': {},
            'query': {
                'bool': {
                    'must': [
                        { "match_phrase": search }
                    ]
                }
            }
        }
        
        axios.get(`${config.url}users*/_search`, { headers: headers, data: searchData })
            .then((resp) => {
                try {
                    let user = resp.data.hits.hits[0]._source;
                    user._id = resp.data.hits.hits[0]._id;
                    resolve(user);
                } catch(err) {
                    console.log(err);
                    resolve(null);
                }
            })
            .catch((err) => {
                console.log(err);
                resolve(err)
            })
    })
}

const getUsers = async function(sort, filter){
    return new Promise((resolve) => {
        let searchData = {
            'from': 0,
            'size': 200,
            'sort': [
                { 'username.keyword': 'desc' }
            ],
            'query': {
                'bool': {
                    'must': []
                }
            }
        }

        if(sort !== null){

        }

        if(filter !== null){

        }

        axios.get(`${config.url}users/_search`, { headers: headers, data: searchData })
            .then((resp) => {
                try {
                    let users = [];
                    for(let hit of resp.data.hits.hits){
                        let user = hit._source;
                        user._id = hit._id;

                        delete user.password;

                        users.push(user);
                    }

                    resolve(users);
                } catch(err) {
                    console.log(err);
                    resolve(null);
                }
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response.data);
                // console.trace();
                resolve(null);
            })
    })
}




module.exports = { addUser, authenticateUser, getUserByID, getUserByEmail, getUserByUsername, getUsers }
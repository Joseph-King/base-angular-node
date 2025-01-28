const axios = require('axios');
const bcrypt = require('bcryptjs');

const config = {
    url: process.env.DB_URL,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}

const headers = {
    'Authorization': `Basic ${Buffer.from(`${config.user}:${config.pass}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const getUserByID = async function(id){
    return new Promise((resolve) => {
        axios.get(`${config.url}users/_source/${id}`, { headers: headers })
            .then((resp) => {
                console.log(`USER with ID ${id} retrieved`);
                resolve(resp.data);
            })
            .catch((err) => {
                console.log(err);
                resolve(err)
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
                console.log(`USER with USERNAME ${username} retrieved`);
                resolve(resp.data.hits.hits[0]);
            })
            .catch((err) => {
                console.log(err);
                resolve(err)
            })
    })
}

const addUser = async function(body){
    let newUser = {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password,
        email: body.email
    }

    return new Promise((resolve) => {
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

const comparePassword = function(userInfo, password){
    return bcrypt.compareSync(password, userInfo._source.password);
}

module.exports = { getUserByID, getUserByUsername, addUser, comparePassword }
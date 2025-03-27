const axios = require('axios');

const config = {
    url: process.env.DB_URL,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    secret: process.env.DB_SECRET,
    token_secret: process.env.TOKEN_SECRET
}

const headers = {
    'Authorization': `Basic ${Buffer.from(`${process.env.DB_USER}:${process.env.DB_PASS}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const addRole = async function(body){
    let newRole = {
        name: body.name
    }

    return new Promise(async (resolve, reject) => {
        try {
            axios.post(`${process.env.DB_URL}roles/_doc`, newRole, { headers: headers })
                .then((resp) => {
                    console.log(`ROLE successfully added to DB`);
                    resolve(resp);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(err);
                })
        } catch(err) {

        }
    })
}

const getRoleByID = async function(id){
    return new Promise((resolve) => {
        axios.get(`${config.url}roles/_doc/${id}`, { headers: headers })
            .then((resp) => {
                try {
                    let role = resp.data._source;
                    role._id = resp.data._id;

                    resolve(role);
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

const getRoleByName = async function(name){
    return new Promise((resolve, reject) => {
        let search = {};
        search['name.keyword'] = name;

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

        axios.get(`${process.env.DB_URL}roles*/_search`, { headers: headers, data: searchData })
            .then((resp) => {
                try {
                    let role = resp.data.hits.hits[0]._source;
                    role._id = resp.data.hits.hits[0]._id;

                    resolve(role);
                } catch(err) {
                    console.log(err);
                    resolve(null);
                }
            })
            .catch((err) => {
                console.log(err);
                resolve(err);
            })
    })
}

const getRoles = async function(sort, filter){
    return new Promise((resolve) => {
        let searchData = {
            'from': 0,
            'size': 200,
            'sort': [
                { 'name.keyword': 'desc' }
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

        axios.get(`${config.url}roles/_search`, { headers: headers, data: searchData })
            .then((resp) => {
                console.log('here');
                try {
                    let roles = [];
                    for(let hit of resp.data.hits.hits){
                        let role = hit._source;
                        role._id = hit._id;

                        roles.push(role);
                    }

                    resolve(roles);
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

module.exports = { addRole, getRoleByID, getRoleByName, getRoles }
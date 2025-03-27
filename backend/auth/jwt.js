const jwt = require('jsonwebtoken');

const dbUsers = require(`../database/${process.env.DB}/user`);

const config = {
    secret: process.env.TOKEN_SECRET
}

const testConnection = async function(){
    return new Promise((resolve) => {
        resolve(`N/A. AUTH: jwt, relies on connection to DB`)
    })
}

const authenticate = async function(authHeader){
    return new Promise(async (resolve) => {
        try{
            let result = {
                res: false,
                user: undefined
            };

            if(authHeader === undefined) return result;
            let token = authHeader.slice(4);
            let decoded = jwt.verify(token, config.secret);

            if(decoded && decoded.exp && (Date.now() < decoded.exp * 1000)){
                let user = await dbUsers.getUserByID(decoded.data.id);

                if(user){
                    result = {
                        res: true,
                        user: user
                    };
                } 
            }

            resolve(result);
        } catch(err) {
            console.log(err);

            let result = {
                res: false,
                user: undefined
            };
            resolve(result);
        }
        
    })
}

module.exports = { testConnection, authenticate }
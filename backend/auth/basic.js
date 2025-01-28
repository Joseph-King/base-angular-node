const testConnection = async function(){
    return new Promise((resolve) => {
        resolve(`N/A. AUTH: basic, no test required`)
    })
}

/**
 * 
 * @param {Taken from req.headers.authorization} authHeader 
 * @returns {res = if authenticated or not, user = username}
 */
const authenticate = async function(authHeader, db){
    return new Promise((resolve, reject) => {
        //Decodes and splits username and password into separate values
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const user = auth[0];
        const pass = auth[1];
        
        //If username and password matches environment file
        if(process.env.INITIAL_USER === user && process.env.INITIAL_PASS === pass){
            let result = {
                res: true,
                user: user ? user : undefined
            };
            resolve(result);
        } else {
            let result = {
                res: false,
                user: user ? user : undefined
            };
            resolve(result);
        }

    })
}

module.exports = { testConnection, authenticate }
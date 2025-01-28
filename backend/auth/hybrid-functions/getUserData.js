/**
 * 
 * @param {The Request} req 
 * @returns Same response for User Authentication. Primarily used to get Username for Keycloak after authenticating
 */
const getUserData = async function(req){
    var result = undefined;
    var auth = undefined

    const authHeader = req.headers.authorization;
    if(authHeader){
        switch(process.env.AUTH){
            case 'basic':
                auth = require('../basic');
                result = await auth.authenticate(authHeader);
                break;
            case 'none':
                auth = require('../none');
                result = await auth.authenticate(authHeader);
                break;
            case 'jwt':
                auth = require('../jwt');
                result = await auth.authenticate(authHeader);
                break;
            case 'keycloak':
                auth = require('../keycloak');
                result = await auth.authenticate(authHeader);
                break;
        }
    }

    return result;
}

module.exports = getUserData;
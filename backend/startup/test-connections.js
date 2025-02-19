module.exports = async function(auth, logger, db){
    let result = {
        successfulConnections: [],
        failedConnections: []
    };

    //AUTH
    try {
        let authRes = await auth.testConnection();

        if(authRes.startsWith('N/A') || authRes.startsWith('SUCCESS')){
            result.successfulConnections.push('auth');
        } else {
            result.failedConnections.push('auth');
        }

        console.log(authRes);
    } catch(err){
        result.failedConnections.push('auth');

        console.log(err);
    }

    //LOGGER
    try{
        let loggerRes = await logger.testConnection();

        if(loggerRes.startsWith('N/A') || loggerRes.startsWith('SUCCESS')){
            result.successfulConnections.push('logger');
        } else {
            result.failedConnections.push('logger');
        }
        
        console.log(loggerRes);
    } catch(err){
        result.failedConnections.push('logger');
        console.log(err);
    }

    //DB
    try{
        let dbRes = await db.testConnection();

        if(dbRes.startsWith('N/A') || dbRes.startsWith('SUCCESS')){
            result.successfulConnections.push('db');
        } else {
            result.failedConnections.push('db');
        }
        
        console.log(dbRes);
    } catch(err) {
        result.failedConnections.push('db');
        console.log(err);
    }

    //APIs
    var apis = JSON.parse(process.env.APIS);
    for(let api of apis){
        let curr = require(`../api/${api}`);

        let res = await curr.testConnection();
        console.log(res);
    }

    return result;
}
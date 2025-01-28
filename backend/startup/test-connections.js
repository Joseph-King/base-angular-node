module.exports = async function(auth, logger, db){
    //AUTH
    try {
        let authRes = await auth.testConnection();
        console.log(authRes);
    } catch(err){
        console.log(err);
    }

    //LOGGER
    try{
        let loggerRes = await logger.testConnection();
        console.log(loggerRes);
    } catch(err){
        console.log(err);
    }

    //DB
    try{
        let dbRes = await db.testConnection();
        console.log(dbRes);
    } catch(err) {
        console.log(err);
    }

    //APIs
    var apis = JSON.parse(process.env.APIS);
    for(let api of apis){
        let curr = require(`../api/${api}`);

        let res = await curr.testConnection();
        console.log(res);
    }
}
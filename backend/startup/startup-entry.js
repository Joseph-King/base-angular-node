const testConnections = require('./test-connections');

const start = async function(auth, logger, db){
    
    console.log('Testing dependency connections');
    let connectionResp = await testConnections(auth, logger, db);
}

//All functions that are being exported
module.exports = { start };
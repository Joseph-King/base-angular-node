const testConnections = require('./test-connections');
const createInitUser = require('./create-initial-user');

const start = async function(auth, logger, db){
    
    console.log('Testing dependency connections');
    let connectionResp = await testConnections(auth, logger, db);

    if(connectionResp.failedConnections.length > 0){
        console.log('Failed connection found... Terminating server');
        console.log(`Failed Connections: ${connectionResp.failedConnections}`);
        process.exit(1);
    }

    console.log('\nCreating Initial User');
    let initUserResp = await createInitUser(db);
}

//All functions that are being exported
module.exports = { start };
const testConnections = require('./test-connections');
const createAdminUser = require('./create-admin-user');
const createAdminRole = require('./create-admin-role');

const start = async function(auth, logger, db){
    
    console.log('Testing dependency connections');
    let connectionResp = await testConnections(auth, logger, db);

    if(connectionResp.failedConnections.length > 0){
        console.log('Failed connection found... Terminating server');
        console.log(`Failed Connections: ${connectionResp.failedConnections}`);
        process.exit(1);
    }

    console.log('\nCreating Admin Role');
    let initAdminRole = await createAdminRole(db);

    if(initAdminRole.status !== 200){
        console.log('Admin role not found or created... Terminating Server');
        process.exit(1);
    }
    
    console.log('\nCreating Admin User');
    let initAdminUser = await createAdminUser(db, initAdminRole.adminName);
}

//All functions that are being exported
module.exports = { start };
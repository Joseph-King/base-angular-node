const dbUsers = require(`../database/${process.env.DB}/user`)
const dbRoles = require(`../database/${process.env.DB}/roles`)

module.exports = async function(db, adminName){
    return new Promise(async (resolve, reject) => {
        console.log('Checking if Admin User exists...')
        let checkUser = await dbUsers.getUserByUsername(process.env.ADMIN_USERNAME);
        let getAdminRole = await dbRoles.getRoleByName(adminName);

        if(checkUser === null && getAdminRole !== null){
            console.log('Admin User has not been created. Creating now...');
            try {
                let user = {
                    username: process.env.ADMIN_USERNAME,
                    password: process.env.ADMIN_PASSWORD,
                    roles: [ adminName ],
                    roleIDs: [ getAdminRole._id ]
                }

                let registerUser = await dbUsers.addUser(user);

                if(registerUser.username === user.username){
                    console.log('SUCCESS. Admin User created');
                    resolve({ status: 200 });
                } else {
                    console.log('ERROR. creating Admin User')
                    resolve({ status: 500 });
                }
            } catch(e) {
                console.log(e);
                console.log('ERROR. creating Admin User');
                resolve({ status: 500 });
            }
        } else {
            console.log('Admin User already exists. Cancelling user creation');
            resolve({ status: 200 });
        }
    })
}
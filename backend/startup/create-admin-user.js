module.exports = async function(db, adminName){
    return new Promise(async (resolve, reject) => {
        console.log('Checking if Admin User exists...')
        let checkUser = await db.getUserByUsername(process.env.ADMIN_USERNAME);

        if(checkUser === null){
            console.log('Admin User has not been created. Creating now...');
            try {
                let user = {
                    username: process.env.ADMIN_USERNAME,
                    password: process.env.ADMIN_PASSWORD,
                    roles: [ adminName ]
                }

                let registerUser = await db.registerUser(user);

                if(registerUser.username === user.username){
                    console.log('SUCCESS. Admin User created');
                    resolve({ status: 200 });
                } else {
                    console.log('ERROR. creating Admin User')
                    resolve({ status: 500 });
                }
            } catch(e) {
                console.log('ERROR. creating Admin User');
                resolve({ status: 500 });
            }
        } else {
            console.log('Admin User already exists. Cancelling user creation');
            resolve({ status: 200 });
        }
    })
}
module.exports = async function(db){
    return new Promise(async (resolve, reject) => {
        console.log('Checking if INITIAL_USER exists...')
        let checkUser = await db.getUserByUsername(process.env.INITIAL_USER);

        if(checkUser === null){
            console.log('INITIAL_USER has not been created. Creating now...');
            try {
                let user = {
                    username: process.env.INITIAL_USER,
                    password: process.env.INITIAL_PASS,
                    roles: [ process.env.INITIAL_ADMIN_ROLE ]
                }

                let registerUser = await db.registerUser(user);

                if(registerUser.username === user.username){
                    console.log('SUCCESS. INITIAL_USER created');
                    resolve({ status: 200 });
                } else {
                    console.log('ERROR. creating INITIAL_USER')
                    resolve({ status: 500 });
                }
            } catch(e) {
                console.log('ERROR. creating INITIAL_USER');
                resolve({ status: 500 });
            }
        } else {
            console.log('INITIAL_USER already exists. Cancelling user creation');
            resolve({ status: 200 });
        }
    })
    
}
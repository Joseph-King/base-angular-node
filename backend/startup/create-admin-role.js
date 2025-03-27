const dbRoles = require(`../database/${process.env.DB}/roles`)

module.exports = async function(db){
    return new Promise(async (resolve, reject) => {
        console.log('Checking if Admin role exists exists...')
        let checkForAdmin = await dbRoles.getRoleByName('admin');

        if(checkForAdmin === null){
            console.log('Admin role has not been created. Creating now...');
            try {
                let role = {
                    name: 'admin'
                }

                let createAdminRes = await dbRoles.addRole(role);

                if(createAdminRes.status === 201){
                    console.log('SUCCESS. Admin role created');
                    resolve({ status: 200, adminName: createAdminRes.name });
                } else {
                    console.log('ERROR. creating Admin role')
                    resolve({ status: 500 });
                }
            } catch(e) {
                console.log(e);
                console.log('ERROR. creating Admin role');
                resolve({ status: 500 });
            }
        } else {
            console.log('Admin role already exists. Cancelling role creation');
            resolve({ status: 200, adminName: checkForAdmin.name });
        }
    })
}
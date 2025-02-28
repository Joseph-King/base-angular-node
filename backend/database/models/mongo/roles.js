const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Role = mongoose.model("Role", RoleSchema);

const addRole = async function(body, callback){
    let newRole = new Role({
        name: body.name
    });

    return new Promise(async (resolve, reject) => {
        try {
            let addRes = await newRole.save();

            // console.log('Saved New Role');
            // console.log(addRes);

            resolve(addRes);
        } catch(err) {
            reject(err);
        }
    })
}

const deleteRole = async function(id){
    return new Promise((resolve, reject) => {
        try {
            let deleteRes = Role.deleteOne(id);

            resolve(deleteRes)
        } catch(err) {
            reject(err)
        }
    })
}

const editRole = async function(updatedRole){
    return new Promise((resolve, reject) => {

    })
}

const getRoleByID = function(id){
    return new Promise(async (resolve) => {
        try {
            let queryRes = Role.findById(id);

            resolve(queryRes);
        } catch (err) {
            resolve(err);
        }
    })
}

const getRoleByName = async function(name){
    return new Promise(async (resolve, reject) => {
        try {
            const query = {
                name: name
            }

            let queryRes = await Role.findOne(query);

            // console.log('Retrieved Role By Name');
            // console.log(queryRes);

            resolve(queryRes);
        } catch(err) {
            reject(err);
        }
    })
}



module.exports = { addRole, deleteRole, editRole, getRoleByID, getRoleByName}
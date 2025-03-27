const dbRoles = require(`../database/${process.env.DB}/roles`);

module.exports = function(app, logger){

    app.get('/roles', async (req, res) => {
        try {
            let dbRes = await dbRoles.getRoles(null, null);
            console.log(dbRes);

            res.send(dbRes);
        } catch(err) {
            console.log(err);
            res.send({status: 500, message: 'Unable to retrieve roles'});
        }
    })
    
}
const dbUsers = require(`../database/${process.env.DB}/user`)

module.exports = function(app, logger){

    app.get('/users', async (req, res) => {
        try {
            let dbRes = await dbUsers.getUsers(null, null);

            res.send(dbRes);
        } catch(err) {
            console.log(err);
            res.send({status: 500, message: 'Unable to retrieve users'});
        }
    })

    app.post('/users/authenticate', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        try {
            let dbRes = await dbUsers.authenticateUser(username, password);
            console.log(dbRes);
            res.send(dbRes);
        } catch(err) {
            console.log(err);
            res.send({res: false, user: undefined, token: undefined});
        }
    })

    app.get('/users/profile', async (req, res) => {
        logger.logEndpoint(200, 'test', req, undefined);

        res.send({
            "status": 200,
            "user": req.user
        });
    })

    app.post('/users/register', async (req, res) => {
        try {
            let dbRes = await dbUsers.addUser(req.body);

            if(dbRes && dbRes.status && dbRes.status === 200){
                let log = await logger.logEndpoint(200, req, undefined)
                res.json(log);
            } else {
                let log = await logger.logEndpoint(dbRes.status ? dbRes.status : 500, dbRes.message ? dbRes.message : 'Unknown Error', req, undefined)
                res.json(log);
            }
        } catch(err) {
            console.log(err);
        }

    })
}
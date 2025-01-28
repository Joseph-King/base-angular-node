module.exports = function(app, logger, db){

    app.post('/users/register', async (req, res) => {
        try {
            let dbRes = await db.registerUser(req.body);

            if(dbRes && dbRes.status && dbRes.status === 200){
                let log = await logger.logEndpoint(200, req, undefined)
                res.json(log);
            } else {
                let log = await logger.logEndpoint(dbRes.status ? dbRes.status : 500, req, undefined)
                res.json(log);
            }
        } catch(err) {
            console.log(err);
        }

    })

    app.post('/users/authenticate', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        try {
            let dbRes = await db.authenticateUser(username, password);

            res.send(dbRes);
        } catch(err) {
            console.log(err);
            res.send({res: false, user: undefined, token: undefined});
        }
    })

    app.get('/users/info', async (req, res) => {

        logger.logEndpoint(200, req, undefined);

        res.send({
            "message": `PROFILE`
        });
    })
}
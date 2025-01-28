module.exports = function(app, logger, db){

    //Check if can reach Backend
    app.get('/test', async (req, res) => {
        logger.logEndpoint(200, req, undefined);
        
        res.send({
            "message": `${process.env.NODE_ENV} - You have successfully reached the Backend Server`,
            // "connection_status": process.env.CON_TEST ? process.env.CON_TEST : "n/a"
        });
    })

    //Check if can reach Logger
    app.get('/test-logger', async (req, res) => {
        logger.logEndpoint(200, req, undefined);
        
        let result = await logger.testConnection();

        res.send(result);
    })

    //Check if can reach DB
    app.get('/test-db', async (req, res) => {
        logger.logEndpoint(200, req, undefined);
        
        let result = await db.testConnection();

        res.send(result);
    })

    //Check if can reach API
    app.get('/test-api/:api', async (req, res) => {
        let api = req.params.api;
        let currApi = require(`../api/${api}`);

        logger.logEndpoint(200, req, undefined);
        
        let result = await currApi.testConnection();

        res.send(result);
    })
}
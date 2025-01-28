const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json())

// Importing environments
try {
    require('dotenv').config({path: `./backend/environments/${process.env.NODE_ENV}.env`})
} catch(err) {
    console.log('Error, could not use environment file');
	console.log(err);
}

//Logging
try {
	var logger = require(`./backend/logging/${process.env.LOGGER}`);
	console.log(`LOGGER set to: ${process.env.LOGGER}`);
} catch(e){
	console.log(`ERROR. Cannot set LOGGER to target: ${process.env.LOGGER}`);
	var logger = require(`./backend/logging/none`);
}

// CORS options
if(process.env.ENV === 'development'){
	app.use(cors());
} else {
	var corsOptions = {
		origin: (origin, callback) => {
			if(process.env.ALLOWED_ORIGINS.indexOf(origin) !== -1){
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		optionsSuccessStatus: 204
	}
	app.use(cors(corsOptions));
}

//Database
try {
	var db = require(`./backend/database/${process.env.DB}`);
	console.log(`DATABASE set to: ${process.env.DB}`);
} catch(e){
	console.log(`ERROR. Cannot set DATABASE to target: ${process.env.LOGGER}`);
}

//Authentication
try {
	var auth = require(`./backend/auth/${process.env.AUTH}`);
	console.log(`AUTH set to: ${process.env.AUTH}`);
} catch(err){
	var auth = require(`./backend/auth/basic`);
	console.log(`ERROR. Cannot set AUTH to target: ${process.env.AUTH}`);
}
app.use(async (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(`ORIGIN: ${req.headers.origin}`);
	console.log(`PATH: ${req.originalUrl}`);

	if(!authHeader && process.env.AUTH !== 'none' && process.env.AUTH !== 'jwt'){
		logger.logAuth(401, req, process.env, undefined);

		console.log('AUTH_RES: !authHeader, Not Authenticated');
		let err = new Error('You are not authenticated!');
		err.status = 401;
		return next(err);
	}

	console.log(`AUTH: ${authHeader}`);

	try {
		var result = undefined;
		switch(process.env.AUTH){
			case 'jwt':

				var open_endpoints = JSON.parse(process.env.OPEN_ENDPOINTS)
				console.log(open_endpoints);
				if(open_endpoints.includes(req.originalUrl)){
					console.log('AUTH: PATH is open.');
					return next();
				}

				result = await auth.authenticate(authHeader, db);
				break;
			default:
				result = await auth.authenticate(authHeader);
		}
		console.log(result);

		if(result.res === true){
			console.log('AUTH_RES: Authenticated');
			next();
		} else {
			logger.logAuth(401, req, undefined);

			console.log('AUTH_RES: auth.res != true, Not Authenticated');
			let err = new Error('You are not authenticated!');
			err.status = 401;
			return next(err);
		}
	} catch(err) {
		console.log('catch err, Not Authenticated');
		console.log(err);
		console.trace();
		logger.logAuth(500, req, process.env, undefined);
		return next(err);
	}
})

//Serving Client
app.use(express.static(path.join(__dirname, 'client')))

//Endpoints
const testEndpoints = require('./backend/endpoints/test-endpoints')(app, logger, db);
const userEndpoints = require('./backend/endpoints/user-endpoints')(app, logger, db);

const port = 3000;
app.listen(port, () => {
    console.log('\nServer listening on port 3000\n');
})

//StartUpScripts
const startup = require('./backend/startup/startup-entry');
if(process.env.STARTUP === 'true') {
	setTimeout(() => {
		console.log('Performing Startup Scripts...\n');
		startup.start(auth, logger, db);
	}, 500)
	
}
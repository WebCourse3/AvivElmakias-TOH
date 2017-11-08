const express = require('express');
const logger = require('../AvivElmakias-TOH/TypeScript/logger').Logger;
const configuration = require('../AvivElmakias-TOH/TypeScript/config').configuration;
const app = express();
const port = 3000;

var router = require('./router/router');//uses router.js export;
app.use('/', router.router);

let config = new configuration(true, true, true, 'error');
let logOp = new logger('Aviv', config);
let strings = ['Hey', 'look', 'at', 'me', 'im', 'working'];
logOp.log(null, strings);

const httpServer = app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!');
});

module.exports = {
	server: httpServer,
	setHeroHandler: router.setHeroHandler
};

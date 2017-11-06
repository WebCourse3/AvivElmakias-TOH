const express = require('express');
const app = express();
const port = 3000;

var router = require('./router/router');//uses router.js export;
app.use('/', router.router);

const httpServer = app.listen(port, function () {
	console.log('Example app listening on port '+ port + '!')
});

module.exports = {
	server:httpServer,
	setHeroHandler: router.setHeroHandler
};
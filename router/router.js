var express = require('express');
var router = express.Router();

//other routes
var heroes = require('./heroesRoute');//second router, hirarchy : SERVER --> Router --> going to branches which one of em is heroes route.

//configure other routes
router.use('/heroes', heroes.router);
//router routes
router.use(function timeLog (req, res, next) {
	console.log('Time: ', Date.now());
	next()
});

router.get('/', function (req, res) {
	res.send('Home page');
});

module.exports = {
	router:router,
	setHeroHandler:heroes.setHeroHandler
}; //exports to router.use in server.js
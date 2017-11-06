'use strict';
var express = require('express');//init express
var heroesRouter = express.Router();//creates new router using express
var bodyParser = require('body-parser');//init body-parser
heroesRouter.use(bodyParser.json());       // to support JSON-encoded bodies
heroesRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));
var heroHandler = require('../DB/heroOP');
var heroOp = new heroHandler();
heroesRouter.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

heroesRouter.get('/', function (req, res) {
	res.send(heroOp.getHeroes());
});

heroesRouter.get('/:id', function (req, res) {
	if (heroOp.heroExists(req.params.id)) {
		var findHero = heroOp.getHeroById(req.params.id);
		res.send(findHero);
	}
	else {
		res.send('Hero doesnt exist, please try again!');
	}
});

heroesRouter.put('/:id', function (req, res) {
	if (heroOp.heroExists(req.params.id)) {
		heroOp.updateHeroName(req.params.id, req.query.name);
		res.send(heroOp.getHeroById(req.params.id));
	}
	else {
		res.send('id is not a number, enter a valid id');
	}

});

heroesRouter.post('/', function (req, res) {
	if (heroOp.heroExists(req.body.id)) {
		res.send('hero id already exists!');
	}
	else {
		heroOp.addHero(req.body.id, req.body.name);
		res.send(heroOp.getHeroes());
	}
});

heroesRouter.delete('/:id', function (req, res) {
	if (heroOp.heroExists(req.params.id)) {
		heroOp.deleteHeroById(req.params.id);
		res.send(heroOp.getHeroes());
	}
	else {
		res.send('Cant Delete a Non existing Hero!');
	}
});

heroesRouter.delete('/', function (req, res) {
	var len = heroOp.getHeroes().length;
	heroOp.deleteHeroByName(req.query.name);
	if (heroOp.getHeroes().length === len) {
		res.send('Hero Name does not Exist!');
	}
	else {
		res.send(heroOp.getHeroes());
	}

});
module.exports = {
	router: heroesRouter,
	setHeroHandler: (handler) => {
		heroOp = handler;
	}
};
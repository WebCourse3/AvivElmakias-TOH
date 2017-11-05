'use strict';
var express = require('express');//init express
var heroesRouter = express.Router();//creates new router using express
var heroes = require('../DB/HeroesJSON');//getting the array
var bodyParser = require('body-parser');//init body-parser
heroesRouter.use(bodyParser.json());       // to support JSON-encoded bodies
heroesRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

heroesRouter.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

heroesRouter.get('/', function (req, res) {
	res.send(heroes);
});

heroesRouter.get('/:id', function (req, res) {

	var id = isNaN(Number.parseInt(req.params.id)) ? null : Number.parseInt(req.params.id);
	if(id!==null){
		var findHero = heroes.find((hero) => {
			return hero.id === id;
		});}
	else{
		res.send("id is not a number, enter a valid id");
	}
	if(typeof findHero !== 'undefined') {
		res.send(findHero);
	}
	else{res.send("cant find hero! enter an existing hero id");}
});

heroesRouter.put('/:id', function (req, res) {
	var id = isNaN(Number.parseInt(req.params.id)) ? null : Number.parseInt(req.params.id);
	if (id !== null) {
		var findHero = heroes.find((hero) => {
			return hero.id === id;
		});
	}
	else{
		res.send("id is not a number, enter a valid id");
	}
	if(typeof findHero !== 'undefined') {
		findHero.name = req.query.name;
		res.send(findHero);
	}
	else{res.send("cant find hero! enter an existing hero id");}
});

heroesRouter.post('/', function (req, res) {
	var newHero = req.body;
	for (let i = 0; i < heroes.length; i++)
		if (heroes[i].id === newHero.id) {
			res.send('id already in the database! please try again');
			return;
		}
	heroes.push(newHero);
	res.send(newHero);
});

heroesRouter.delete('/:id', function (req, res) {
	var id = isNaN(Number.parseInt(req.params.id)) ? null : Number.parseInt(req.params.id);
	var heroIndex=null;
	for (let i = 0; i < heroes.length; i++) {
		if (heroes[i].id === id)
			heroIndex = i;
	}
	if(heroIndex!==null){
		heroes.splice(heroIndex, 1);
		res.send(heroes);
	}
	else {res.send("Hero Not in DB.. Cant delete!")}
});

heroesRouter.delete('/', function (req, res) {
	var name = req.query.name;
	var heroIndex;
	for (let i = 0; i < heroes.length; i++) {
		if (heroes[i].name === name)
			heroIndex = i;
	}
	heroes.splice(heroIndex, 1);
	res.send(heroes);
});
module.exports=heroesRouter;
var heroes = [
	{id: 42, name: 'DeadPool'},
	{id: 25, name: 'SuperMan'},
	{id: 35, name: 'Thor'}
];

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.get('/heroes', function (req, res) {
	res.send(heroes);
});

app.get('/heroes/:id', function (req, res) {

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

app.put('/heroes/:id', function (req, res) {
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

app.post('/heroes', function (req, res) {
	var newHero = req.body;
	for (let i = 0; i < heroes.length; i++)
		if (heroes[i].id === newHero.id) {
			res.send('id already in the database! please try again');
			return;
		}
	heroes.push(newHero);
	res.send(newHero);
});

app.delete('/heroes/:id', function (req, res) {
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

app.delete('/heroes', function (req, res) {
	var name = req.query.name;
	var heroIndex;
	for (let i = 0; i < heroes.length; i++) {
		if (heroes[i].name === name)
			heroIndex = i;
	}
	heroes.splice(heroIndex, 1);
	res.send(heroes);
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
var heroes = [
	{id: 42, name: 'DeadPool'},
	{id: 25, name: 'SuperMan'},
	{id: 35, name: 'Thor'}
];

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));
app.get('/heroes', function (req, res) {
	res.send(heroes);
});

app.get('/heroes/:id', function (req, res) {
	var id = Number.parseInt(req.params.id);
	var findHero = heroes.find((hero) => {
		return hero.id === id;
	});
	res.send(findHero);
});

app.put('/heroes/:id', function (req, res) {
	var id = Number.parseInt(req.params.id);

	var findHero = heroes.find((hero) => {
		return hero.id === id;
	});
	findHero.name = req.query.name;
	res.send(findHero);
});

app.post('/heroes', function (req, res) {
	var id = Number.parseInt(req.body.id);
	var name = req.body.name;
	for (let i = 0; i < heroes.length; i++)
		if (heroes[i] === id) {
			res.send("id already in the database! please try again");
			return;
		}
	var newHero ={id: id ,name: name};
	heroes.push(newHero);
	res.send(newHero);
});

app.delete('/heroes/:id', function (req, res) {
	var id = Number.parseInt(req.params.id);
	var heroIndex;
	for (let i = 0; i < heroes.length; i++) {
		if (heroes[i].id === id)
			heroIndex = i;
	}
	heroes.splice(heroIndex, 1);
	res.send(heroes);
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
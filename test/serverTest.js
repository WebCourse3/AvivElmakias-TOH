const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);
const should = chai.should();
var heroHandlerClass = require('../DB/heroOP');
sinon = require('sinon');
const heroClass = require('../models/hero');

const app = server.server;

describe('Heroes-get-request', function () {
	describe('/heroes', function () {
		it('should list all Heroes on /heroes GET', function (done) {
			chai.request(app)
				.get('/heroes')
				.end(function (err, res) {
					res.should.be.json;
					done();
				});
		});
	});
});

describe('Heroes-get-by-id', function () {
	describe('/heroes/:id', function () {
		it('should return a hero by id', function (done) {
			const heroHandlerStub = {};
			heroHandlerStub.getHeroById = sinon.stub();
			heroHandlerStub.getHeroById.withArgs('123').returns(new heroClass('123', 'Tal'));
			heroHandlerStub.heroExists = sinon.stub();
			heroHandlerStub.heroExists.withArgs('123').returns(true);
			server.setHeroHandler(heroHandlerStub);
			chai.request(app)
				.get(`/heroes/123`)
				.end(function (err, res) {
					res.body.should.have.property('id');
					res.body.id.should.equal('123');
					res.body.name.should.equal('Tal');
					done();
				});
		});
	});
});

describe('Heroes-put-request', function () {
	describe('/heroes/:id?name=Menachem', function () {
		it('should return a hero by id', function (done) {
			const heroHandlerStub = {};
			heroHandlerStub.updateHeroName = sinon.stub();
			heroHandlerStub.updateHeroName.withArgs('123', 'menachem').returns(new heroClass('123', 'menachem'));
			heroHandlerStub.heroExists = sinon.stub();
			heroHandlerStub.heroExists.withArgs('123').returns(true);
			heroHandlerStub.getHeroById = sinon.stub();
			heroHandlerStub.getHeroById.withArgs('123').returns(new heroClass('123', 'menachem'));
			server.setHeroHandler(heroHandlerStub);
			chai.request(app)
				.put(`/heroes/123?name=menachem`)
				.end(function (err, res) {
					res.body.should.have.property('name');
					res.body.name.should.equal('menachem');
					res.body.id.should.equal('123');
					done();
				});
		});
	});
});

describe('Heroes-post-request', function () {
	describe('/heroes-post', function () {
		it('should add a new hero to the array', function (done) {
			const heroHandlerStub = {};
			heroHandlerStub.addHero = sinon.stub();
			heroHandlerStub.addHero.withArgs('4', 'Tal').returns();
			heroHandlerStub.heroExists = sinon.stub();
			heroHandlerStub.heroExists.withArgs('4').returns(false);
			heroHandlerStub.getHeroes = sinon.stub();
			heroHandlerStub.getHeroes.withArgs().returns('Hero Was Succesfully added');
			server.setHeroHandler(heroHandlerStub);
			chai.request(app)
				.post('/heroes')
				.send({'id': '4', 'name': 'Tal'})
				.end(function (err, res) {
					res.text.should.equal('Hero Was Succesfully added');
					done();
				});
		});
	});
});

describe('functions', function () {
	describe('gets', function () {
		it('gets a hero by ID', function (done) {
			var heroHandler = new heroHandlerClass();
			var hero = heroHandler.getHeroById('42');
			assert.notEqual(hero, undefined);
			done();

		});
	});
});

describe('functions', function () {
	describe('gets', function () {
		it('gets all heroes', function (done) {
			var heroHandler = new heroHandlerClass();
			var hero = heroHandler.getHeroes();
			assert.notEqual(0, hero.length);
			done();

		});
	});
});

after('after', () => {
	app.close();
});
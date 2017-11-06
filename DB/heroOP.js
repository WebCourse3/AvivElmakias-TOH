'use strict';

const Hero = require('../models/hero');
var heroes = require('./HeroesJSON');

class herosHandler {


	 getHeroes() {
		return heroes;
	}
	   getHeroById(id) {
		return heroes.find(hero => hero.id == id);
	}

	 heroExists(id) {
		return heroes.filter(hero => hero.id == id).length === 1;
	}

	 addHero(heroId, heroName) {
		heroes.push(new Hero(heroId, heroName));
	}

	 deleteHeroById(id) {
		heroes = heroes.filter(hero => hero.id !== id);
	}

	 deleteHeroByName(name) {
		heroes = heroes.filter(hero => hero.name !== name);
	}

	 updateHeroName(id, newName) {
		let hero = this.getHeroById(id);
		hero.name = newName;
	}
}
module.exports = herosHandler;
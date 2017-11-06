'use strict';

const Hero = require('../models/hero');
const heroes = require('./Heroes');

class herosHandler {
	constructor() {
		this.heroesArr = [];
		heroes.heroesArray.forEach(hero=> this.heroesArr.push(new Hero(hero.id,hero.name)));
	}
/**/
	getHeroes() {
		return this.heroesArr;
	}
	   getHeroById(id) {
		return this.getHeroes().find(hero => hero.id === id);
	}

	 heroExists(id) {
		return this.getHeroes().filter(hero => hero.id === id).length === 1;
	}

	 addHero(heroId, heroName) {
		 this.getHeroes().push(new Hero(heroId, heroName));
	}

	 deleteHeroById(id) {
		 this.heroesArr = this.getHeroes().filter(hero => hero.id !== id);
	}

	 deleteHeroByName(name) {
		 this.heroesArr = this.getHeroes().filter(hero => hero.name !== name);
	}

	 updateHeroName(id, newName) {
		let hero = this.getHeroById(id);
		hero.name = newName;
	}
}
module.exports = herosHandler;
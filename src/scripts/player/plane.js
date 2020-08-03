import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Plane {

  /**
   * Название корабля, количество топлива, базовые характеристики, свободное место в трюмах, количество пассажиров
   */
  constructor(rang) {
    this.name = this.generateName();
    this.rang = rang;
    this.distance = 0;
    this.params = {
      fuel: 0,
      attack: 0,
      shield: 0,
      space: 0,
      speed: 0,
      health: 0
    };
    this.levels = {
      fuel: 1,
      attack: 1,
      shield: 1,
      space: 1,
      speed: 1,
      health: 1
    };
    
    this.status = 'в ангаре';
    this.currentQuest = {};
    this.compliteQuests = [];
    this.fallQuests = [];
    this.generateParams();
    this.state = {
      fuel:this.params.fuel,
      space:this.params.space,
      health: this.params.health
    }
  }

  /**
   * Генерирует название корабля
   */
  generateName() {
    let chance = new Chance();
    return chance.first({
      gender: "female"
    });
  }

  /**
   * Генерирует параметры корабля при инициализации в зависимости от переданного ранга
   */
  generateParams() {
    switch (this.rang) {
      case 1:
        this.params.fuel = randomNumber(1, 10);
        this.params.attack = randomNumber(1, 4);
        this.params.shield = randomNumber(1, 4);
        this.params.space = randomNumber(1, 10);
        this.params.speed = randomNumber(1, 10);
        this.params.health = randomNumber(1, 20);
        break;
      case 2:
        this.params.fuel = randomNumber(5, 15);
        this.params.attack = randomNumber(4, 9);
        this.params.shield = randomNumber(4, 9);
        this.params.space = randomNumber(5, 15);
        this.params.speed = randomNumber(5, 15);
        this.params.health = randomNumber(6, 25);
        break;
      case 3:
        this.params.fuel = randomNumber(1, 10);
        this.params.attack = randomNumber(1, 4);
        this.params.shield = randomNumber(1, 4);
        this.params.space = randomNumber(1, 10);
        this.params.speed = randomNumber(1, 10);
        this.params.health = randomNumber(1, 20);
        break;

      case 4:
        this.params.fuel = randomNumber(1, 10);
        this.params.attack = randomNumber(1, 4);
        this.params.shield = randomNumber(1, 4);
        this.params.space = randomNumber(1, 10);
        this.params.speed = randomNumber(1, 10);
        this.params.health = randomNumber(1, 20);
        break;
      case 5:
        this.params.fuel = randomNumber(1, 10);
        this.params.attack = randomNumber(1, 4);
        this.params.shield = randomNumber(1, 4);
        this.params.space = randomNumber(1, 10);
        this.params.speed = randomNumber(1, 10);
        this.params.health = randomNumber(1, 20);
        break;

      default:
        break;
    }


   
  }

  upgradeLevel(param, science) {
    if (this.levels[param] < 5) {
      this.levels[param] += 1;
      this.params[param] += randomNumber(1+science, 3+science);
      return true;
    }
    else {
      return false;
    }
  }

  addFuel() {
    if (this.state.fuel < this.params.fuel) {
      this.state.fuel += 1;
      return true;
    }
    return false;
  }

  addHealth() {
    if (this.state.health < this.params.health) {
      this.state.health += 1;
      return true;
    }
    return false;
  }
}
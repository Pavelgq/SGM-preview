import Creatures from './creatures.js';

import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Turkeys extends Creatures {
  constructor() {
    super();
    this.name = "Индюки";
    this.description = "Дюк и Инд";
    this.color = "#689AD3";
    this.sectors = [];
    this.relationship = [];
    this.state = {
      money: 0,
      science: randomNumber(0,5),
      army: 0,
      economy: 0
    };
  }

  /**
   * Особенность колонизации - строятся около сингулярности
   * @param {Array} sectors 
   */
  colonization(sectors) {
    let j = randomNumber(randomNumber(5, sectors.length / 2), randomNumber(sectors.length / 2, sectors.length - 6));
    while (j < sectors.length - 1) {
      let quant = this.quant;
      if (sectors[j].state.type != 'заброшенный') {
        j += 1;
        continue;
      }
      const coloniz = [sectors[j]];
      for (const k of coloniz) {
        let mas = [];
        for (let i = 0; i < k.neighbors.length; i++) {
          mas[i] = i;
        }
        while (quant > 0 || mas.length > 0) {
          let num = randomNumber(0, mas.length - 1);

          let curent = k.neighbors[mas[num]];
          let type = curent.state.type;
          if (type == 'необитаемый') {
            curent.state.type = 'жилой';
            curent.state.backColor = this.color;
            curent.inmates = this;
            this.sectors.push(curent);
            quant -= 1;
            coloniz.push(curent);
            break;
          }
          mas.splice(num, 1);
        }
        if (quant <= 0) break;
      }
      if (quant <= 0) break;
    }

  }
}
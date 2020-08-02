import Hangar from './hangar.js';

import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Player {

  constructor(place, creatures) {
    this.place = place;
    this.hangar = new Hangar();
    this.state = {
      exp: 0,
      money: 0,
    };
    this.relationship = this.setRelationship(creatures);

  }

  /**
   * Устанавливает начальные отношение между играком и npc
   * @param {Object} creatures 
   */
  setRelationship(creatures) {
    let result = {};
    for (const key in creatures) {
      result[key] = randomNumber(0, 10);
    }
    return result;
  }

  changeState(model) {
    const sector = model.map.sectors[this.place];
    let science = 1;
    if (sector.state.type == "жилой") {
      science = sector.inmates.state.science || 1;
    }
    this.state.money += sector.state.quantRes * science;  //Деньги с сектора

    this.hangar.questBuffer = [];
    this.hangar.changeState();

    if (this.hangar.questBuffer.length > 0) {
      this.hangar.questBuffer.forEach(quest => {
        this.state.money += quest.bonuses.money;
        this.state.exp += quest.bonuses.exp;

        for (const key in quest.bonuses.reputation) {
            const element = quest.bonuses.reputation[key];
            this.relationship[key] += element;
        }
      });
    }
    

  }

}
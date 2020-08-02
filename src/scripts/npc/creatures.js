import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Creatures {
    constructor() {
        this.quant = randomNumber(3,9);
    }


    /**
     * Случайная колонизация
     * @param {Array} sectors 
     */
    colonization(sectors) {
      let quant = this.quant;
      while (quant > 0) {
        let num = randomNumber(0, sectors.length-1);
        let type = sectors[num].state.type;
        if (type == 'необитаемый') {
          sectors[num].state.type = 'жилой';
          sectors[num].state.backColor = this.color;
          sectors[num].inmates = this;
          this.sectors.push(sectors[num]);
          quant-=1;
        }
        
      }
    }
    /**
     * Случайные действия npc
     */
    changeState() {
      console.log(`${this.name} на знает, как это сделать`);
    }
}
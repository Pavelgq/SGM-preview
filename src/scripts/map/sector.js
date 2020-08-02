import func from '../utils/functions.js';

const {randomNumber} = func;



export default class Sector {
  constructor(cube, id) {
    this.cube = cube;
    this.neighbors = [];
    this.id = id;
    this.position = 1;
    this.focus = false;
    
    this.state = {
      type: '',
      resources: [],
      planets: [],
      borderColor: '',
      backColor: ''
    };
  }


  // /**
  //  * Стэйт включает в себя 
  //  * тип клетки, соотвецтвенный цвет клетки 
  //  * ресурсы клетки и их количество (много, средне, мало)
  //  * принадлежность клетки (раса, необитаемая или пираты)
  //  */
  
}
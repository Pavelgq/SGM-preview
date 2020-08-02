import Sector from "./sector.js";
import func from "../utils/functions.js";
import Cube from "../map/cube.js"
import Planets from './planet.js';

const {
  planetNames
} = Planets;
const {
  randomNumber
} = func;
const {
  makeCounter
} = func;
const PARAMS_MAP = {
  width: 8,
  heidth: 12,
  radius: 4
}
const QUANT_PLAYERS = 4;
const SECTOR_TYPES = [{
    type: "заброшенный",
    color: "#DDAB48",
    quant: randomNumber(5, 10),
    planets: randomNumber(1, 5),
    resources: 0
  },
  {
    type: "сингулярность",
    color: "#6E55DD",
    quant: randomNumber(2, 4),
    planets: 0,
    resources: 0
  },
  {
    type: "необитаемый",
    color: "#eeeeee",
    quant: 99,
    planets: randomNumber(0, 10),
    resources: randomNumber(3, 10)
  }
];
const MAS_RESOURCES = ['железо', 'руда', 'кварц', 'брилианты', 'наноботы', 'еда', 'топливо', 'вода'];
export default class Galaxy {
  /**
   * Создаем карту с центральным сектором и радиусом
   */
  constructor() {
    this.sectors = [];
    this.position = 0;
  }

  /**
   * Заполняет массив секторов для карты размер, которой указан в PARAMS_MAP
   */
  getSectors() {
    const cube = new Cube(0, 0, 0);
    this.sectors.push(new Sector(cube, 0)); //Where is state?

    let counter = makeCounter();
    let counterNow;

    for (let i = 0; i < PARAMS_MAP.heidth; i++) {
      let newNeighbors = [];
      for (let j = 0; j < PARAMS_MAP.width - 1; j++) {
        counterNow = counter();
        let neighbor = this.sectors[i * PARAMS_MAP.width + j].cube.neighbor(0);
        let newSector = new Sector(neighbor, counterNow);

        this.sectors.push(newSector);
      }
      const odd = i % 2 ? 5 : 4;
      if (i != PARAMS_MAP.heidth - 1) {
        this.sectors.push(new Sector(this.sectors[i * PARAMS_MAP.width].cube.neighbor(odd), counter()));
      }

    }

  }

  /**
   * Получаем для каждого сектора соседние сектора (один раз для удобства)
   */
  getNeighbor() {
    this.position = randomNumber(0, this.sectors.length-1)
    this.sectors.forEach(element => {

      for (let i = 0; i < 6; i++) {
        const coord = element.cube.neighbor(i);
        this.sectors.some((neighbor, index, arr) => {
          if (neighbor.cube.equal(coord)) {
            element.neighbors.push(neighbor);
            return true;
          }
        })
      }
    });
  }
  /**
   * Генерируем состояния секторов
   */
  setState() {
    const mas = [];
    for (let i = 0; i < this.sectors.length; i++) {
      mas[i] = i;
    }
    SECTOR_TYPES.forEach(element => {
      let quantRes = 0;
      let quantPlanet = 0;
      for (let i = 0; i < element.quant; i++) {
        if (mas.length == 0) {
          break
        };
        const num = randomNumber(0, mas.length-1);
        this.sectors[mas[num]].state.type = element.type;
        
        this.sectors[mas[num]].state.backColor = element.color;
        
        quantRes = randomNumber(element.resources?1:0, element.resources);
        this.sectors[mas[num]].state.quantRes = quantRes;
        quantPlanet = randomNumber(0, element.planets);
        this.generateResources(this.sectors[mas[num]], quantRes);
        for (let i = 0; i < quantPlanet; i++) {
          let name = this.generatePlanets(this.sectors[mas[num]]);
        }
        mas.splice(num, 1);
      }
      console.log(mas.length, element.type);
    });
    console.log(mas.length);
  }
  
  /**
   * Генерирует планеты для сектора
   * @param {Sector} sector
   */
  generatePlanets(sector) {
    planetNames.then(function (res) {
      let num = randomNumber(0, res.length - 1);
      sector.state.planets.push(res[num].name);
    })
  }

  /**
   * Генерирует ресурсы для сектора
   * @param {Sector} sector
   * @param {Number} quant 
   */
  generateResources(sector, quant) {
    for (let i = 0; i < quant; i++) {
      sector.state.resources.push(MAS_RESOURCES[randomNumber(0, MAS_RESOURCES.length - 1)])
      //Чтобы ресурсы не повторялись
    }
  }

  /**
   * Заполняем сектора NPC игроками
   * @PARAMS_MAP {Array} Inmates Объекты обитателей секторов
   */
  setСolonization(creatures) {
    //Здесь будем популяцию создавать
    for (let i = 0; i < creatures.length; i++) {
      const element = creatures[i];
      element.colonization(this.sectors);
      
    }
    
  }
}
import Galaxy from '../map/galaxy.js';
import Quest from '../quests/quest.js';

import Creatures from '../npc/creatures.js';
import Bugs from '../npc/bugs.js';
import Marins from '../npc/marins.js';
import Turkeys from '../npc/turkeys.js';
import Pirates from '../npc/pirates.js';
import Player from '../player/player.js';

export default class Model {
  constructor() {
    this.state = {};
    this.creatures = {
      bugs: new Bugs(),
      marins: new Marins(),
      turkeys: new Turkeys(),
      pirates: new Pirates()
    };
    this.map = this.createMap();
    this.time = new Date(2111, 1, 28);
    this.quests = [];
    this.player = new Player(this.map.position, this.creatures);


    this.resetQuest = this.resetQuest.bind(this);
    this.updatePlane = this.updatePlane.bind(this);
  }

  createMap() {
    const map = new Galaxy();
    map.getSectors();
    map.getNeighbor();
    map.setState();

    const creatures = [];
    for (const key in this.creatures) {
      const element = this.creatures[key];
      creatures.push(element);
    }
    map.setСolonization(creatures);
    console.log(map);
    return map;
  }


  createQuests() {
    for (let i = 0; i < 3; i++) {
      this.quests.push(new Quest('доставка', this));
      this.quests.push(new Quest('поставка', this));
    }

  }

  acceptQuest(event) {
    const target = event.target.closest('.quest__item');
    let id = target.dataset.id;

    const select = target.querySelector('.quest__select--plane');
    const value = select.options[select.selectedIndex].value;
    console.log(value);
    this.player.hangar.planes.some(plane => {
      if (value == plane.name) {
        plane.currentQuest = this.quests[id];
        plane.status = "на задании";
        let targetCoord = this.map.sectors[plane.currentQuest.terms.sectorID].cube;
        plane.distance = targetCoord.distance(this.map.sectors[this.map.position].cube) * 2;
        return true;
      }
    });
  }

  resetQuest(event) {
    const target = event.target.closest('.quest__item');
    let id = target.dataset.id;
    this.quests[id] = new Quest('поставка', this);
  }

  change() {
    this.tickTime();

    // for (const key in  this.creatures) {
    //     const element =  this.creatures[key];
    //     element.changeState();
    // }
    this.player.changeState(this);
  }

  tickTime() {
    this.time.setDate(this.time.getDate() + 1);
  }


  updatePlane(event) {
    let updatePlane = event.target.closest('BUTTON').dataset.update;
    let target = event.target.closest('LI');
    const name = target.querySelector('.plane__accordion').id;
    let plane = this.player.hangar.getPlane(name);
    let science = this.map.sectors[this.map.position].getScience();
    const money = this.player.state.money;
    let coast;
    switch (updatePlane) {
      case 'add-fuel':
        coast = plane.rang*4/science;
        if (money >= coast) {
          if (plane.addFuel()) {
            this.player.state.money -= coast;
          }else {
            console.log("Бак полон");
          }
        } else {
          console.log("No money, no deal..");
        }

        break;
      case 'add-health':
        coast = plane.levels.health*10/science;
        if (money >= coast) {
          
          if (plane.addHealth()) {
            this.player.state.money -= coast;
          }else {
            console.log("Лучше не будет");
          }
        } else {
          console.log("No money, no deal..");
        }
        break;
      default:
        coast = plane.levels[updatePlane] * 100 / science;
        if (money >= coast) {
          this.player.state.money -= coast;
          plane.upgradeLevel(updatePlane, science);
        } else {
          console.log("No money, no deal..");
        }
        break;
    }

  }
}
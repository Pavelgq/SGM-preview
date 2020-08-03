import Plane from "./plane.js"

export default class Hangar {
  constructor() {
    this.planes = [];

    this.questBuffer = [];
    this.createPlane();
    this.createPlane();
  }

  createPlane() {
    const plane = new Plane(1);
    this.planes.push(plane);
  }

  getPlane(name) {
    let result;
    this.planes.some(plane => {
      if (name == plane.name) {
        result = plane;
        return true;
      }
    });
    return result;
  }

  changeState() {
    this.planes.forEach(plane => {
      if (plane.status == 'на задании') {
        if (plane.state.fuel > 0 && plane.distance > 0) {
          plane.state.fuel -= 1;
          plane.distance -= 1;
        } else {
          if (plane.distance > 0) {
            plane.fallQuests.push(plane.currentQuest);
            plane.currentQuest = {};
            plane.status = 'дрейфует';
          } else {
            if (plane.state.fuel > 0) {
              plane.compliteQuests.push(plane.currentQuest);
              this.questBuffer.push(plane.currentQuest);
              plane.currentQuest = {};
              plane.status = 'в ангаре';
            }
          }

        }
      }
    });
  }
}
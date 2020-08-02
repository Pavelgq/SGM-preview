export default class Cube {


  /**
   * Кубические координаты гексогональной сетки
   * @constructor
   * @param {number} q - Cube coord q
   * @param {number} r - Cube coord r
   * @param {number} s - Cube coord s
   */
  constructor(q, r, s) {
    this.q = q;
    this.r = r;
    this.s = s;



  if (Math.round(q + r + s) !== 0)
      throw `q + r + s must be 0, was ${q + r + s}`;
  }

  add(b) {
    return new Cube(this.q + b.q, this.r + b.r, this.s + b.s);
  }

  subtract(b) {
    return new Cube(this.q - b.q, this.r - b.r, this.s - b.s);
  }

  scale(k) {
    return new Cube(this.q * k, this.r * k, this.s * k);
  }

  rotateLeft() {
    return new Cube(-this.s, -this.q, -this.r);
  }

  rotateRight() {
    return new Cube(-this.r, -this.s, -this.q);
  }

  static direction(direction) {
    return Cube.directions[direction];

  }

  neighbor(direction) {
    return this.add(Cube.direction(direction));
  }

  diagonalNeighbor(direction) {
    return this.add(Cube.diagonals[direction]);
  }

  len() {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  distance(b) {
    return this.subtract(b).len();
  }

  round() {
    var qi = Math.round(this.q);
    var ri = Math.round(this.r);
    var si = Math.round(this.s);
    var q_diff = Math.abs(qi - this.q);
    var r_diff = Math.abs(ri - this.r);
    var s_diff = Math.abs(si - this.s);
    if (q_diff > r_diff && q_diff > s_diff) {
      qi = -ri - si;
    } else if (r_diff > s_diff) {
      ri = -qi - si;
    } else {
      si = -qi - ri;
    }
    return new Cube(qi, ri, si);
  }

  lerp(b, t) {
    return new Cube(this.q * (1.0 - t) + b.q * t, this.r * (1.0 - t) + b.r * t, this.s * (1.0 - t) + b.s * t);
  }

  lineDraw(b) {
    var N = this.distance(b);
    var a_nudge = new Cube(this.q + 1e-06, this.r + 1e-06, this.s - 2e-06);
    var b_nudge = new Cube(b.q + 1e-06, b.r + 1e-06, b.s - 2e-06);
    var results = [];
    var step = 1.0 / Math.max(N, 1);
    for (var i = 0; i <= N; i++) {
      results.push(a_nudge.lerp(b_nudge, step * i).round());
    }
    return results;
  }

  equal(b) {
    if (this.q === b.q && this.r === b.r && this.s === b.s) {
      return true;
    }
    return false;
  }

}


Cube.directions = [new Cube(1, 0, -1), new Cube(1, -1, 0), new Cube(0, -1, 1), new Cube(-1, 0, 1), new Cube(-1, 1, 0), new Cube(0, 1, -1)];
Cube.diagonals = [new Cube(2, -1, -1), new Cube(1, -2, 1), new Cube(-1, -1, 2), new Cube(-2, 1, 1), new Cube(-1, 2, -1), new Cube(1, 1, -2)];
class Snowflake {
  constructor () {
    this.r = random(2, 6);
    const x = random(width);
    const y = random(-100, 10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 5);
    this.acc = createVector();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.mult(0);
  }

  render() {
    stroke(255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }

  belowScreen() {
    return (this.pos.y > height + this.r);
  }
}


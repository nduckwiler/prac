class Snowflake {
  constructor () {
    this.r = random(2, 10);
    const x = random(width);
    const y = random(-100, 0);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);
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


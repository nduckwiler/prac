class Snowflake {
  constructor () {
    this.pos = createVector(300,200);
    this.vel = createVector();
    this.acc = createVector();
  }

  render() {
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }
}

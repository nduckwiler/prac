class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.opacity = 255;
    this.decayRate = 1;
  }

  update() {
    this.opacity -= this.decayRate;
  }
}

console.log(`\nConstructing circle...`);

const c = new Circle(4, 8);

console.log(`Expect 4, 8, 20: ${c.x}, ${c.y}, ${c.r}`);

console.log(`\nChecking current opacity...`);

console.log(`Expect 255: ${c.opacity}`);

c.update();

console.log(`Expect 254: ${c.opacity}`);

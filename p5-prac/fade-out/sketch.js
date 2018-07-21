var circles = [];
var spawn;

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.opacity = 255;
    this.decayRate = 1.5;
    this.growthRate = 2;
  }

  update() {
    this.opacity -= this.decayRate;
  }

  expired() {
    return this.opacity <= 0;
  }

  grow() {
    this.r += this.growthRate;
  }
}

function setup() {
  createCanvas(600,400);
}

function mousePressed() {
  spawn = new Circle(mouseX, mouseY);
}

function mouseClicked() {
  circles.push(spawn);
  spawn = null;
}

function draw() {
  background(0);

  // Remove expired circles
  circles = circles.filter(circle => !circle.expired());
  fill(255, 255, 255, 255);
  text(`circles array length: ${circles.length}`, 10, 10);

  // Grow spawn if it exists
  if (spawn && mouseIsPressed) {
    spawn.grow();
  }

  // Draw circles
  if (spawn) {
    ellipse(spawn.x, spawn.y, spawn.r);
  }

  circles.forEach((circle) => {
    fill(255, 255, 255, circle.opacity);
    ellipse(circle.x, circle.y, circle.r);
    circle.update();
  });
}

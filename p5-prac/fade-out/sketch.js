var circles = [];

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.opacity = 255;
    this.decayRate = 2;
  }

  update() {
    this.opacity -= this.decayRate;
  }

  expired() {
    return this.opacity <= 0;
  }
}

function setup() {
  createCanvas(600,400);
}

function mousePressed() {
  circles.push(new Circle(mouseX, mouseY));
}

function draw() {
  background(0);

  // Remove expired circles
  circles = circles.filter(circle => !circle.expired());
  fill(255, 255, 255, 255);
  text(`circles array length: ${circles.length}`, 10, 10);

  // Draw circles
  circles.forEach((circle) => {
    fill(255, 255, 255, circle.opacity);
    ellipse(circle.x, circle.y, circle.r);
    circle.update();
  });
}

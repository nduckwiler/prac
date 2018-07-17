var r = 20;
var circles = [];

function setup() {
  createCanvas(600,400);
}

function mousePressed() {
  circles.push({
    x: mouseX,
    y: mouseY,
    w: r,
    lifespan: 255
  });
}

function draw() {
  background(0);
  circles.forEach((circle) => {
    fill(255, 255, 255, circle.lifespan);
    ellipse(circle.x, circle.y, circle.w);
    circle.lifespan--;
  });
}

let x = 0;
let myCanvas;

function setup() {
  // put setup code here
  createCanvas(600,400);
  background('aquamarine');
  noStroke();
  line(15, 25, 70, 90);
}

function draw() {
  fill(237, 84, 40, 100);
  ellipse(mouseX, mouseY, 20, 20);
}

function mousePressed() {
  background('aquamarine');
}

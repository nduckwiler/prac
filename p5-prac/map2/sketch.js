// `y` contains y position of each circle
const y = [100, 200, 300];
const w = 30;
// `max` contains the limit of the x pos of each circle
const max = [null, 450, 150];

function setup() {
  // put setup code here
  createCanvas(600,400);
}

function draw() {
  noStroke();
  background('grey');

  // Draw circle 0 (no mapping)
  fill('greenyellow');
  ellipse(mouseX, y[0], w);

  // Draw circle 1 (stays within [0, max[1]])
  x1 = map(mouseX, 0, width, 0, max[1], true);
  fill('limegreen');
  ellipse(x1, y[1], w);

  // Draw circle 2 (stays within [0, max[2]])
  x2 = map(mouseX, 0, width, 0, max[2], true);
  fill('mediumseagreen');
  ellipse(x2, y[2], w);

  fill('white');
  stroke(200);
  line(0, y[0], width, y[0]);
  text('0', 0, y[0]);
  text(`${max[0]}`, width, y[0]);

  line(0, y[1], max[1], y[1]);
  text('0', 0, y[1]);
  text(`${max[1]}`, max[1], y[1]);

  line(0, y[2], max[2], y[2]);
  text('0', 0, y[2]);
  text(`${max[2]}`, max[2], y[2]);

}


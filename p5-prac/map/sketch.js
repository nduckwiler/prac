let r, b;

function setup() {
  // put setup code here
  createCanvas(600,400);
  noStroke();
}

function draw() {
  r = map(mouseX, 0, width, 0, 255, true);
  b = map(mouseY, 0, height, 0, 255, true);
  background(r, 0, b);
  fill('grey');
  ellipse(mouseX, mouseY, 20, 20);
  fill('white');
  text(`mouseX: ${mouseX}\nmouseY: ${mouseY}`, 0, 10);
  text(`mapped mouseX: ${Math.round(r)}\nmapped mouseY: ${Math.round(b)}`, 0, 50);

  text(`(${mouseX}, 0, ${mouseY})`, mouseX, mouseY - 20);
  text(`(${Math.round(r)}, 0, ${Math.round(b)})`, mouseX, mouseY);
}


const dots = [];
const dotTotal = 100;
const wiggleProximity = 70;
const wiggleMax = 3;
const rimWidth = 5;

function setup() {
  createCanvas(600,400);
  background('grey');
  for (let i = 0; i < dotTotal; i++) {
    dots.push({
      x: random(0, width),
      y: random(0, height),
      w: 20,
      ringW: random(1, 5),
      ringH: random(1, 5)
    });
  }
}

function draw() {
  // Remove background() if you want old dots to persist
  background(54, 78, 79);
  stroke('cadetblue');
  strokeWeight(rimWidth);
  noFill();
  rect(0, 0, width - rimWidth + 2, height - rimWidth + 2);

  // Move dots
  wiggle(dots);

  // Draw dots
  dots.forEach( (dot) => {
    // Draw inner dot
    stroke('white');
    strokeWeight(2.5);
    noFill();
    ellipse(dot.x, dot.y, dot.w + dot.ringW, dot.w + dot.ringH);
    // Draw outer dot
    noStroke();
    fill(237, 84, 40, 100);
    ellipse(dot.x, dot.y, dot.w);
  });

}

function mousePressed() {
}

function wiggle(dots) {
  dots.forEach( (dot) => {
    let proximity = dist(dot.x, dot.y, mouseX, mouseY);

    if (proximity <= wiggleProximity) {
      let wiggleIntensity = map(proximity, 0, wiggleProximity, 1, 0, true);
      dot.x += random(-wiggleMax, wiggleMax) * wiggleIntensity;
      dot.y += random(-wiggleMax, wiggleMax) * wiggleIntensity;
    }
  });
}

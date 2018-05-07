const dots = [];
const sounds = [];
let isHidden = true;
var env, analyzer;

function preload() {
  sounds[0] = loadSound('./assets/dee.mp3');
  sounds[1] = loadSound('./assets/gruffy.mp3');
}

function setup() {
  createCanvas(600,400);
  for (let i = 0; i < 2; i++) {
    dots.push({
     x: random(0, width - 10),
     y: random(0, height - 10),
     r: 20,
     a: 0
    });

    sounds[i].loop();
  }

  analyzer = new p5.Amplitude();
}

function draw() {
  background('lightseagreen');

  fill(255, 255, 255, 255);
  text('Press any key to show dots\nClick to mute', 10, 10);
  if (isHidden) {
    noStroke();
  } else {
    stroke(0.5);
  }

  dots.forEach( (dot, i) => {
    let d = dist(dot.x, dot.y, mouseX, mouseY);
    let alpha = map(d, 200, 0, 0, 255);
    fill(255, 255, 255, alpha);
    ellipse(dot.x, dot.y, dot.r);
    line(dot.x, dot.y, mouseX, mouseY);
    text(d, dot.x + 10, dot.y + 10);
    let amp = map(d, 200, 0, 0, 1.0, true);
    sounds[i].setVolume(amp);
  });


  fill(255, 255, 255, 255);
  strokeWeight(3);
  stroke('black');
  let level = analyzer.getLevel();
  let lineHeight = map(level, 0, 1.0, 0, height);
  line(width - 10, height, width - 10, height-lineHeight);
  text(level, width - 30, height - lineHeight);
  text('0.2', width - 20, height * 0.8)
  text('0.4', width - 20, height * 0.6)
  text('0.6', width - 20, height * 0.4)
  text('0.8', width - 20, height * 0.2)


}

function mousePressed() {
  sounds[0].stop();
  sounds[1].stop();
}

function keyPressed() {
  isHidden = !isHidden;
}


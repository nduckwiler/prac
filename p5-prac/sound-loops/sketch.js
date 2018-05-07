const dots = [];
const dotTotal = 2;

function preload() {
  song = loadSound('assets/frequency-decree.mp3');
}

function setup() {
  createCanvas(600,400);
  song.playMode('sustain');
  for (let i = 0; i < dotTotal; i++) {
    dots.push({
      x: random(0, width),
      y: random(0, height),
      r: 20,
    });
  }
}

function draw() {
  background('lightseagreen');
  text('Click to start a new loop', 20, 20);
  dots.forEach( (dot) => {
    ellipse(dot.x, dot.y, dot.r);
  });
  playDots();
}

function mousePressed() {
  /*
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
  */
    song.play();
}

function playDots() {
}


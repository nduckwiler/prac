var noise, env, analyzer;

function setup() {
  createCanvas(600,400);
  noise = new p5.Noise();
  noise.start()
  noise.amp(0);
  env = new p5.Env();
  env.setADSR(0.1, 0.1, 0.5, 0.1);
  env.setRange(3.0, 0);

  analyzer = new p5.Amplitude();
}

function draw() {
  background('lightseagreen');
  text('Click to play (might be loud!)', 10, 10);

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
  env.play(noise);
}

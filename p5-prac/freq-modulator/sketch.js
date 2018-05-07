/*
 * Based on p5.js example here:
 * https://p5js.org/examples/sound-frequency-modulation.html
 * 
*/
var osc, mod,env, analyzer;
const minFreq = 0;
const maxFreq = 200;
const minDepth = -150;
const maxDepth = 150;

function setup() {
  createCanvas(600,400);
  osc = new p5.Oscillator();
  osc.freq(220);
  osc.start()
  osc.amp(0.5);

  mod = new p5.Oscillator('sawtooth');
  mod.start()
  mod.amp(200);

  // Add the modulator's output to modulate the osc's frequency
  mod.disconnect();
  osc.freq(mod);

  analyzer = new p5.Amplitude();
}

function draw() {
  background('lightseagreen');
  text('Click to stop', 20, 20);

  let level = analyzer.getLevel();
  let lineHeight = map(level, 0, 1.0, 0, height);
  line(width - 10, height, width - 10, height-lineHeight);
  text(level, width - 30, height - lineHeight);
  text('0.2', width - 20, height * 0.8)
  text('0.4', width - 20, height * 0.6)
  text('0.6', width - 20, height * 0.4)
  text('0.8', width - 20, height * 0.2)

  let modFreq = map(mouseX, 0, width, minFreq, maxFreq);
  text(`modulator frequency changes with mouseX: ${modFreq}`, 40, 40);
  mod.freq(modFreq);

  let modDepth = map(mouseY, height, 0, minDepth, maxDepth);
  text(`modulator amplitude/depth changes with mouseY: ${modDepth}`, 40, 80);
  mod.amp(modDepth);

}

function mousePressed() {
  osc.stop();
}

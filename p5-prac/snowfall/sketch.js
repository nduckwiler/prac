var snow = [];
var gravity;
var textures;

function preload() {
  textures = loadImage('flakes32.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.05);
}

function draw() {
  background(0);
  image(textures, 0, 0);
  snow.push(new Snowflake());
  snow.forEach(flake => {
    flake.applyForce(gravity);
    flake.render();
    flake.update(); 
  }); 

  snow = snow.filter(flake => {
    return !(flake.belowScreen());
  });
}

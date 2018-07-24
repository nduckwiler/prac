var snow = [];
var gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.1);
}

function draw() {
  background(0);
  snow.push(new Snowflake());
  snow.forEach(flake => {
    flake.applyForce(gravity);
    flake.render();
    flake.update(); 
  }); 

  snow.filter(flake => {
    return flake.pos.y > width + 20;
  });
}

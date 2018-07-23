var snow = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  snow.push(new Snowflake());
}

function draw() {
  background(0);
  snow.forEach(flake => {
    flake.render();
  });

}

// x and y are ball center
ball = {
  x: 30,
  y: 50,
  w: 30,
  xSpeed: 2,
  ySpeed: 2
};

function setup() {
  createCanvas(600,400);
}

function draw() {
  noStroke();
  background('lightseagreen');
  drawBall(ball);
  move(ball);

}

function drawBall(ball) {
  fill('darkred');
  noStroke();
  ellipse(ball.x, ball.y, ball.w);
}

function move(ball) {
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;

  if (ball.x - ball.w/2 < 0 || ball.x + ball.w/2 > width) {
    ball.xSpeed = -ball.xSpeed;
  }

  if (ball.y - ball.w/2 < 0 || ball.y + ball.w/2 > height) {
    ball.ySpeed = -ball.ySpeed;
  }
}


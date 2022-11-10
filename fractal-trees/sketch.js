let h = 100;
let w = 10;
let x, y;

let slider;
let angle;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
  translate(width / 2, height);
  background(0);
  angle = slider.value();
  stroke(255);

  branch(h);
}

function branch(len) {
  if (len < 4) {
    return;
  }

  if (len < 30) {
    fill(0, 200, 0, 100);
    rect(0, 0, random(5, 10), 10, 2, 10, 1, 10);
  }

  line(0, 0, 0, -len);
  translate(0, -len);

  // push and pop current state ko save karke rakhenge taki
  // next function call mein same cheej ja sake

  push();
  rotate(angle);
  branch(len * 0.67);
  pop();
  push();
  rotate(-angle);
  branch(len * 0.67);
  pop();
}

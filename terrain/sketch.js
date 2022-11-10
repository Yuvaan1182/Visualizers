let rows, cols;
let sz = 10;
let matrix;
let w = 1200;
let h = 900;

let move = 0;

function setup() {
  createCanvas(600, 600, WEBGL);

  cols = w / sz;
  rows = h / sz;

  matrix = new Array(rows);

  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(cols);
  }
}

function draw() {
  move -= 0.02;

  let yoff = move;
  for (let j = 0; j < rows; j++) {
    let xoff = 0;
    for (let i = 0; i < cols; i++) {
      matrix[j][i] = map(noise(xoff, yoff), 0, 1, -150, 150);
      xoff += 0.07;
    }
    yoff += 0.1;
  }

  background(0);
  // stroke(255);
  noStroke();
  rotateX(PI / 3);
  translate(-w / 2, -height / 5);
  fill(random(100, 255), random(255), random(100, 255), random(100));
  // noFill();

  for (let j = 0; j < rows - 1; j++) {
    beginShape(TRIANGLE_STRIP);
    for (let i = 0; i < cols; i++) {
      vertex(i * sz, j * sz, matrix[j][i]);
      vertex(i * sz, (j + 1) * sz, matrix[j + 1][i]);
    }
    endShape();
  }
}

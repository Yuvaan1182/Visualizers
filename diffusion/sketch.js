// https://www.karlsims.com/rd.html
let grid, next;
let dA = 1;
let dB = 0.5;
let feed = 0.055;
let k = 0.062;
let deltaT = 1;

let kr, feedRate;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);

  grid = [];
  next = [];

  for (let x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (let y = 0; y < height; y++) {
      grid[x][y] = {
        a: 1,
        b: 0,
      };
      next[x][y] = {
        a: 1,
        b: 0,
      };
    }
  }

  for (let n = 1; n <= 10; n++) {
    let startx = floor(random(40, 350));
    let starty = floor(random(50, 350));
    let wx = random(0, 50);
    let wy = random(0, 50);
    for (let i = startx; i < floor(startx + wx); i++) {
      for (let j = floor(starty + random(0, 40)); j < floor(starty + wy); j++) {
        grid[i][j].b = 1;
      }
    }
  }
}

function draw() {
  background(255);

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      let a = grid[x][y].a;
      let b = grid[x][y].b;
      next[x][y].a =
        a + (dA * laplaceA(x, y) - a * b * b + feed * (1 - a)) * deltaT;
      next[x][y].b =
        b + (dB * laplaceB(x, y) + a * b * b - (k + feed) * b) * deltaT;

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let pix = (x + y * width) * 4;
      let a = next[x][y].a;
      let b = next[x][y].b;
      let c = constrain(floor((a - b) * 255), 0, 255);
      pixels[pix + 0] = c;
      pixels[pix + 1] = c;
      pixels[pix + 2] = c;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  swap();
}

function swap() {
  let temp = grid;
  grid = next;
  next = temp;
}

function laplaceA(x, y) {
  let sum = 0;
  sum += grid[x][y].a * -1;
  sum += grid[x - 1][y - 1].a * 0.05;
  sum += grid[x - 1][y + 1].a * 0.05;
  sum += grid[x + 1][y - 1].a * 0.05;
  sum += grid[x + 1][y + 1].a * 0.05;
  sum += grid[x - 1][y].a * 0.2;
  sum += grid[x + 1][y].a * 0.2;
  sum += grid[x][y - 1].a * 0.2;
  sum += grid[x][y + 1].a * 0.2;

  return sum;
}

function laplaceB(x, y) {
  let sum = 0;
  sum += grid[x][y].b * -1;
  sum += grid[x - 1][y - 1].b * 0.05;
  sum += grid[x - 1][y + 1].b * 0.05;
  sum += grid[x + 1][y - 1].b * 0.05;
  sum += grid[x + 1][y + 1].b * 0.05;
  sum += grid[x - 1][y].b * 0.2;
  sum += grid[x + 1][y].b * 0.2;
  sum += grid[x][y - 1].b * 0.2;
  sum += grid[x][y + 1].b * 0.2;

  return sum;
}

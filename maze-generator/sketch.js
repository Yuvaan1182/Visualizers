let cols, rows;
let sz = 30;
let grid = [];
let curr;
let stack = [];

function setup() {
  createCanvas(600, 600);

  rows = floor(height / sz);
  cols = floor(width / sz);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid.push(new Cell(j, i, sz));
    }
  }

  // frameRate();
  curr = grid[0];
  stack.push(curr);
}

function removeWalls(a, b) {
  let x = a.i - b.i;

  if (x === 1) {
    a.walls[3] = 0;
    b.walls[1] = 0;
  }
  if (x === -1) {
    a.walls[1] = 0;
    b.walls[3] = 0;
  }

  let y = a.j - b.j;
  if (y === 1) {
    a.walls[2] = 0;
    b.walls[0] = 0;
  }
  if (y === -1) {
    a.walls[0] = 0;
    b.walls[2] = 0;
  }
}

function draw() {
  background(0);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  curr.vis = true;
  curr.highlight();
  let next = curr.checkNeighbors(grid, rows, cols);
  if (next) {
    next.vis = true;
    stack.push(next);
    removeWalls(curr, next);
    curr = next;
  } else if (stack.length > 0) {
    curr = stack.pop();
  }
}

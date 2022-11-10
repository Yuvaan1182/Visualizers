class Cell {
  constructor(_i, _j, _sz) {
    this.i = _i;
    this.j = _j;
    this.walls = [true, true, true, true]; // trbl
    this.vis = false;
    this.sz = _sz;
  }

  isInside(x, y, rows, cols) {
    if (x >= 0 && x < rows && y >= 0 && y < cols) {
      return true;
    }

    return false;
  }

  getIndex(i, j, rows) {
    return i + j * rows;
  }

  checkNeighbors(grid, rows, cols) {
    let dx = [0, 1, 0, -1];
    let dy = [-1, 0, 1, 0];

    let neighbors = [];

    for (let i = 0; i < 4; i++) {
      let x = this.i + dx[i];
      let y = this.j + dy[i];

      let isIn = this.isInside(x, y, rows, cols);
      //   print(isIn, x, y, rows, cols);
      if (isIn) {
        let neighbor = grid[this.getIndex(x, y, rows)];

        if (!neighbor.vis) {
          neighbors.push(neighbor);
        }
      }
    }

    if (neighbors.length > 0) {
      let idx = floor(random(0, neighbors.length));

      return neighbors[idx];
    }

    return undefined;
  }

  highlight() {
    noStroke();
    fill("#A3C7D6");
    rect(this.i * this.sz, this.j * this.sz, this.sz, this.sz);
  }

  show() {
    let x = this.i * this.sz;
    let y = this.j * this.sz;

    stroke(255);

    // top
    if (this.walls[0]) line(x, y, x + this.sz, y); // l->r
    // right
    if (this.walls[1]) line(x + this.sz, y, x + this.sz, y + this.sz); // t->b
    // bottom
    if (this.walls[2]) line(x + this.sz, y + this.sz, x, y + this.sz); // r->l
    //left
    if (this.walls[3]) line(x, y + this.sz, x, y); // b->t

    if (this.vis) {
      noStroke();
      fill("#FB2576");
      rect(x, y, this.sz, this.sz);
    }
  }
}

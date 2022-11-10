let values;
let w = 4;
let col = [];

function setup() {
  createCanvas(800, 360);

  values = new Array(floor(width / w));
  col = new Array(values.length);

  for (let i = 0; i < values.length; i++) {
    values[i] = random(w, height);
    col[i] = -1;
  }

  frameRate(5);

  mergeSort(values, 0, values.length - 1);
}

async function merge(arr, start, mid, end) {
  let first = new Array(mid - start + 1);
  print(start, mid, end);
  let second = new Array(end - mid);

  let k = start;
  for (let i = 0; i < first.length; i++) {
    first[i] = arr[k++];
  }

  for (let i = 0; i < second.length; i++) {
    second[i] = arr[k++];
  }

  let i = 0,
    j = 0;
  k = start;
  while (i < first.length && j < second.length) {
    if (first[i] <= second[j]) {
      await sleep(10);
      col[k] = 1;
      arr[k++] = first[i++];
    } else {
      await sleep(10);
      col[k] = 0;
      arr[k++] = second[j++];
    }
  }

  while (i < first.length) {
    col[k] = 2;
    arr[k++] = first[i++];
  }

  while (j < second.length) {
    col[k] = 2;
    arr[k++] = second[j++];
  }

  for (let i = start; i <= end; i++) {
    col[i] = 1;
  }
}

async function mergeSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let mid = floor((start + end) / 2);

  await Promise.all([mergeSort(arr, start, mid), mergeSort(arr, mid + 1, end)]);

  await merge(arr, start, mid, end);
}

function draw() {
  background(0);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (col[i] == -1) {
      fill(255);
    } else if (col[i] == 0) {
      fill("#DD5353");
    } else if (col[i] == 1) {
      fill("#A8E890");
    } else {
      fill("#98A8F8");
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

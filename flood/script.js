const squareValues = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const colors = [
  "#F06292",
  "#9575CD",
  "#E1BEE7",
  "#FFD740",
  "#A5D6A7",
  "#00B8D4"
];

const squares = document.getElementsByClassName("square");

const randomElement = arr => arr[Math.floor(Math.random() * arr.length)];

function getSurroundingElements(row, col) {
  row = parseInt(row);
  col = parseInt(col);

  const toCheck = [];

  // down
  if (row < squareValues.length - 1) toCheck.push(squareValues[row + 1][col]);
  // right
  if (col < squareValues.length - 1) toCheck.push(squareValues[row][col + 1]);
  // up
  if (row > 0) toCheck.push(squareValues[row - 1][col]);
  // left
  if (col > 0) toCheck.push(squareValues[row][col - 1]);

  return toCheck;
}

function expand(element, color) {
  const { row, col } = element;
  square = squareValues[row][col];
  square.element.style.backgroundColor = color;

  const squaresToCheck = getSurroundingElements(row, col);

  squaresToCheck.forEach(squareToCheck => {
    if (flood.includes(squareToCheck)) return;
    
    if (squareToCheck.color === color) {
      flood.push(squareToCheck);
      expand(squareToCheck, color);
    }
  });
}

function changeColors() {
  const { row, col } = this.dataset;
  const color = squareValues[row][col].color;

  flood.forEach(el => expand(el, color));
}

[...squares].forEach(element => {
  const color = randomElement(colors);
  element.style.backgroundColor = color;

  const { row, col } = element.dataset;
  squareValues[row][col] = {
    element,
    row,
    col,
    color
  };

  element.addEventListener("click", changeColors);
});

const flood = [squareValues[0][0]];

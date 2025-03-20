const gridSizeBTN = document.querySelector("[data-id='grid-size-btn']");
const blackColorBTN = document.querySelector("[data-id='black-color-btn']");
const randomColorBTN = document.querySelector("[data-id='random-color-btn']");
const canvas = document.querySelector("[data-id='canvas']");

renderGrid(16);

function initializeGrid() {
  const gridSize = getGridSize();
  clearCanvas();
  renderGrid(gridSize);
}

function enableBlackColorMode() {
  canvas.childNodes.forEach((canvasCell) => {
    canvasCell.removeEventListener("mouseover", makeBackgroundRandom);
    canvasCell.addEventListener("mouseover", makeBackgroundBlack);
  });
}

function enableRandomColorMode() {
  canvas.childNodes.forEach((canvasCell) => {
    canvasCell.removeEventListener("mouseover", makeBackgroundBlack);
    canvasCell.addEventListener("mouseover", makeBackgroundRandom);
  });
}

gridSizeBTN.addEventListener("click", initializeGrid);
blackColorBTN.addEventListener("click", enableBlackColorMode);
randomColorBTN.addEventListener("click", enableRandomColorMode);

function getGridSize() {
  let gridSize;
  do {
    const userResponse = prompt("Enter size (max. 100)", 16);
    gridSize = +userResponse;
  } while (!(gridSize <= 100 && gridSize > 0));

  return gridSize;
}

function clearCanvas() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}

function renderGrid(gridSize) {
  const cellSize = canvas.clientWidth / gridSize;
  for (let index = 0; index < gridSize * gridSize; index++) {
    const canvasCell = document.createElement("div");
    canvasCell.style.cssText = `width: ${cellSize}px; height: ${cellSize}px;`;

    canvasCell.addEventListener("mouseover", makeBackgroundBlack);

    canvas.appendChild(canvasCell);
  }
}

function makeBackgroundBlack() {
  this.style.backgroundColor = "black";
}

function makeBackgroundRandom() {
  this.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
  const red = getRandomRGBNumber();
  const green = getRandomRGBNumber();
  const blue = getRandomRGBNumber();

  return `rgb(${red}, ${green}, ${blue})`;
}

function getRandomRGBNumber() {
  return Math.floor(Math.random() * 256);
}

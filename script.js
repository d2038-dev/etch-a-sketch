const gridSizeBTN = document.querySelector("[data-id='grid-size-btn']");
const randomColorBTN = document.querySelector("[data-id='random-color-btn']");
const darkeningEffectBTN = document.querySelector(
  "[data-id='darkening-effect-btn']"
);
const canvas = document.querySelector("[data-id='canvas']");

renderGrid(16);

function initializeGrid() {
  const gridSize = getGridSize();
  clearCanvas();
  randomColorBTN.classList.remove("game__button_active");
  darkeningEffectBTN.classList.remove("game__button_active");
  renderGrid(gridSize);
}

function toggleRandomColorMode() {
  const activeClass = "game__button_active";

  if (this.classList.contains(activeClass)) {
    canvas.childNodes.forEach((canvasCell) => {
      canvasCell.removeEventListener("mouseover", makeBackgroundRandom);
      canvasCell.addEventListener("mouseover", makeBackgroundBlack);
    });
  } else {
    canvas.childNodes.forEach((canvasCell) => {
      canvasCell.removeEventListener("mouseover", makeBackgroundBlack);
      canvasCell.addEventListener("mouseover", makeBackgroundRandom);
    });
  }
  this.classList.toggle(activeClass);
}

function toggleDarkeningEffect() {
  const activeClass = "game__button_active";

  if (this.classList.contains(activeClass)) {
    canvas.childNodes.forEach((canvasCell) => {
      canvasCell.removeEventListener("mouseover", progressiveOpacity, {
        capture: true,
      });
      canvasCell.addEventListener("mouseover", fullOpacity, { capture: true });
    });
  } else {
    canvas.childNodes.forEach((canvasCell) => {
      canvasCell.removeEventListener("mouseover", fullOpacity, {
        capture: true,
      });
      canvasCell.addEventListener("mouseover", progressiveOpacity, {
        capture: true,
      });
    });
  }

  this.classList.toggle("game__button_active");
}

gridSizeBTN.addEventListener("click", initializeGrid);
randomColorBTN.addEventListener("click", toggleRandomColorMode);
darkeningEffectBTN.addEventListener("click", toggleDarkeningEffect);

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
  const canvasStyles = window.getComputedStyle(canvas);
  let canvasWidth = canvasStyles.getPropertyValue("width");
  canvasWidth = canvasWidth.slice(0, -2);
  canvasWidth = +canvasWidth;
  const cellSize = canvasWidth / gridSize;
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

function progressiveOpacity() {
  const cellOpacity = this.style.opacity;
  if (cellOpacity === "") {
    this.style.opacity = "0.1";
  } else if (cellOpacity != "1") {
    const newCellOpacity = +cellOpacity + 0.1;
    this.style.opacity = `${newCellOpacity}`;
  }
}

function fullOpacity() {
  this.style.opacity = "";
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

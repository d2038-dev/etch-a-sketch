const canvas = document.querySelector("[data-id='canvas']");

for (let index = 0; index < 16 * 16; index++) {
  const canvasCell = document.createElement("div");
  canvasCell.classList.add("game__canvas-cell");
  canvasCell.textContent = `${index}`;

  canvasCell.addEventListener("mouseover", function () {
    this.classList.add("game__canvas-cell_change-color");
  });

  canvas.appendChild(canvasCell);
}

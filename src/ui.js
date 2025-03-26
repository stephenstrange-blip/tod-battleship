export function setup() {
  const fragment = new DocumentFragment();
  const container = document.createElement("div");
  const section = document.createElement("section");
  const board1 = document.createElement("div");
  const board2 = document.createElement("div");

  board1.classList.add("board", "player");
  board2.classList.add("board", "computer");
  container.classList.add("body-container");

  section.append(board1, board2);
  container.append(section);
  fragment.append(container);
  document.body.append(fragment);
}

export function populateBoard(row, col) {
  const section = document.querySelector("section");
  const player = document.querySelector(".player");
  const computer = document.querySelector(".computer");

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      const point = document.createElement("p");
      const point2 = document.createElement("p");
      point.dataset.location = `[${r},${c}]`;
      point2.dataset.location = `[${r},${c}]`;
      player.append(point);
      computer.append(point2);
    }
  }

  section.append(player, computer);
}

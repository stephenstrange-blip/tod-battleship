import { GameBoard } from "./gameBoard";

export class Player {
  constructor() {
    this.id = null;
    this.board = new GameBoard(10, 10);
  }

  setID(identifier) {
    this.id = identifier;
    this.board.id = identifier;
  }

  displayFleet() {
    const section = document.querySelector(".player-section");
    const shipContainer = document.createElement("div");
    const ships = this.board.ships;

    shipContainer.classList.add("ship-container");

    for (let ship of ships) {
      const div = document.createElement("div");
      div.classList.add(`ship${ship.id}`);
      shipContainer.append(div);
    }

    section.append(shipContainer);
  }
}

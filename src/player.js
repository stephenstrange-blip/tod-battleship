import { GameBoard } from "./gameBoard";

export class Player {
  constructor() {
    this.id = null;
    this.board = new GameBoard(10, 10);
    this.name = "player";
    this.missed = [];
    this.history = [];
  }

  setID(identifier) {
    this.id = identifier;
    this.board.id = identifier;
  }

  displayFleet() {
    const div = document.querySelector(`.${this.name}-info`);
    const shipContainer = document.createElement("div");
    const ships = this.board.ships;

    shipContainer.classList.add("ship-container");

    for (let ship of ships) {
      const div = document.createElement("div");
      div.classList.add(`ship${ship.id}`);
      shipContainer.append(div);
    }

    div.append(shipContainer);
  }

  displayInfo() {
    const section = document.querySelector(".player-section");
    const playerDiv = document.createElement("div");
    const infoContainer = document.createElement("p");
    const name = document.createElement("h1");
    const fleetStatus = document.createElement("h4");

    playerDiv.classList.add(`${this.name}-info`);
    fleetStatus.classList.add(`${this.name}-status`);

    name.textContent = this.name.toLocaleUpperCase();
    fleetStatus.textContent = `${this.board.ships.length} ships left`;

    infoContainer.append(name, fleetStatus);
    playerDiv.append(infoContainer);
    section.append(playerDiv);
  }

  setName(name) {
    this.name = name;
  }

  isHitAlready(currentAttack) {
    this.history.forEach((attack) => {
      if (attack === currentAttack) return true;
    });
    return false;
  }
}

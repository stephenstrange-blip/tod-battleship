import { Player } from "./player";
import { Ship } from "./ship";

export class GamePlay {
  constructor() {
    this.currentTurn = null;
    this.user = null;
    this.computer = null;
  }

  setup() {
    const fragment = new DocumentFragment();
    const container = document.createElement("div");
    const section = document.createElement("section");
    container.classList.add("body-container");

    container.append(section);
    fragment.append(container);
    document.body.append(fragment);
  }

  start() {
    this.user = new Player();
    this.user.setID(1);

    this.computer = new Player();
    this.computer.setID(0);

    this.user.board.construct();
    this.computer.board.construct();

    this.currentTurn = this.user;

    const pship1 = new Ship(2);
    const pShip2 = new Ship(4);

    const cShip1 = new Ship(3);
    const cShip2 = new Ship(5);

    this.user.board.setShip(pship1, pShip2);
    this.computer.board.setShip(cShip1, cShip2);

    this.turn(0, [-1, 4]);
    this.switchTurn();
    this.turn(1, [1, 1]);
    this.switchTurn();
    this.turn(0, [0, 0]);
    this.switchTurn();
    this.turn(0, [6, 1]);
  }

  turn(shipID, coordinates, isVertical = false) {
    let pShips = [...this.currentTurn.board.ships];
    let x = this.currentTurn.board;

    if (!x.verify(coordinates)) return;

    try {
      if (!isVertical) {
        x.isPlacementValid(pShips[shipID], coordinates);
        x.place(pShips[shipID], coordinates);
      } else {
        x.isPlacementValid(pShips[shipID], coordinates, true);
        x.place(pShips[shipID], coordinates, true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  switchTurn() {
    this.currentTurn =
      this.currentTurn === this.user ? this.computer : this.user;
  }
}

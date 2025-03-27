import { Player } from "./player";
import { Ship } from "./ship";

export class GamePlay {
  constructor() {
    this.currentEnemy = null;
    this.currentPlayer = null;
    this.user = null;
    this.computer = null;
  }

  setup() {
    const fragment = new DocumentFragment();
    const container = document.createElement("div");
    const playerSection = document.createElement("section");
    const boardSection = document.createElement("section");
    const boardHeader = document.createElement("h1");

    container.classList.add("body-container");
    boardSection.classList.add("board-section");
    playerSection.classList.add("player-section");

    boardHeader.textContent = "Place your ships now!";

    boardSection.append(boardHeader);
    container.append(playerSection, boardSection);
    fragment.append(container);
    document.body.append(fragment);
  }

  start() {
    this.user = new Player();
    this.user.setID(1);
    this.user.setName("user");

    this.computer = new Player();
    this.computer.setID(0);
    this.computer.setName("computer");

    this.user.board.construct();
    this.computer.board.construct();

    this.currentPlayer = this.user;

    const pship1 = new Ship(4);
    const pShip2 = new Ship(3);
    const pShip3 = new Ship(2);
    const pShip4 = new Ship(5);

    const cShip1 = new Ship(4);
    const cShip2 = new Ship(3);
    const cShip3 = new Ship(2);
    const cShip4 = new Ship(5);

    this.user.board.setShip(pship1, pShip2, pShip3, pShip4);
    this.computer.board.setShip(cShip1, cShip2, cShip3, cShip4);

    this.user.displayInfo();
    this.computer.displayInfo();

    this.user.displayFleet();
    this.computer.displayFleet();

    this.turn(0, [1, 4]);
    this.switchTurn();
    this.turn(0, [1, 1]);
    this.switchTurn();
    this.turn(1, [0, 0]);
    this.switchTurn();
    this.turn(1, [5, 2], true);
    this.switchTurn();
    this.turn(2, [6, 7], true);
    this.switchTurn();
    this.turn(2, [2, 2], true);
    this.switchTurn();
    this.turn(3, [4, 5]);
    this.switchTurn();
    this.turn(3, [5, 5]);

    this.currentPlayer = this.user;
    this.currentEnemy = this.computer;
    this.handleAttack();
  }

  turn(shipID, coordinates, isVertical = false) {
    let pShips = [...this.currentPlayer.board.ships];
    let x = this.currentPlayer.board;

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
    this.currentPlayer =
      this.currentPlayer === this.user ? this.computer : this.user;

    this.currentEnemy =
      this.currentPlayer === this.user ? this.computer : this.user;
  }

  handleAttack() {
    // you are going to attack the ENEMY board and ships
    // but the MISSES will be recorded in YOUR missed array
    const points = document.querySelectorAll(`#t${this.currentEnemy.id} > p`);

    points.forEach((point) => {
      const controller = new AbortController();
      const signal = controller.signal;

      point.addEventListener(
        "click",
        (event) => {
          event.stopImmediatePropagation();
          let coordinates = JSON.parse(point.dataset.loc);

          // do nothing if it is already attacked
          if (this.currentEnemy.isHitAlready(coordinates)) return;

          
          // shipID is included for successful attack,
          // and null for missed attack
          let result = this.currentEnemy.board.receiveAttack(coordinates);
         
          if (result.id !== null) {
            this.animateAttack(result.id);
            this.updateFleet(result.id);
            setTimeout(() => {}, 5000)
            this.animateAttack(result.id);
            
            point.classList.add("hit");
            controller.abort();
          } else {
            this.currentPlayer.missed.push(result.coordinates);
            point.classList.add("miss");
          }
          
          // push to player's history regardless if miss or not
          this.currentPlayer.history.push(result.coordinates);
          
          if (this.currentEnemy.board.checkRemainingShips() === 0)
            alert(`${this.currentPlayer.name} is the winner!`);

        },
        { signal },
      );
    });
  }

  updateFleet(shipID) {
    let ship = this.currentEnemy.board.ships[shipID];
    ship.hit();

    // sunk the ship if all of its points are hit
    if (ship.isSunk()) {
      ship.sunk();

      const remainingShips = this.currentEnemy.board.checkRemainingShips();
      const query = `.${this.currentEnemy.name}-info > p > h4`;
      const h4 = document.querySelector(query);
      h4.textContent = `${remainingShips} ships left`;
    }
  }

  animateAttack(shipID) {
    const query = `.${this.currentEnemy.name}-info > div > .ship${shipID}`;
    const ship = document.querySelector(query);
    ship.animate(
      {
        transform: [
          "translate(1px, 1px) rotate(0deg)",
          "translate(-1px, -2px) rotate(-1deg)",
          "translate(-3px, 0px) rotate(1deg)",
          "translate(3px, 2px) rotate(0deg)",
          "translate(1px, -1px) rotate(1deg)",
          "translate(-1px, 2px) rotate(-1deg",
          "translate(-3px, 1px) rotate(0deg)",
          "translate(3px, 1px) rotate(-1deg)",
          "translate(-1px, -1px) rotate(1deg)",
          "translate(1px, 2px) rotate(0deg)",
          "translate(1px, -2px) rotate(-1deg)",
        ]
      }, 500)
  }
}

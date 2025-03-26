export class GameBoard {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = [];
    this.ships = [];
    this.id = null;
  }

  // incoming command
  // test side effects with mock
  construct() {
    for (let i = 0; i < this.row; i++) {
      let column = Array(this.col).fill(-1);
      this.board.push(column);
    }

    const section = document.querySelector("section");
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    boardDiv.id = this.id !== undefined ? `t${this.id}` : 33;

    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.col; c++) {
        const point = document.createElement("p");
        point.dataset.loc = `[${r},${c}]`;
        boardDiv.append(point);
      }
    }
    section.append(boardDiv);
  }

  // incoming query
  // test the return value
  verify(arr) {
    return arr[0] >= 0 && arr[0] < this.row && arr[1] >= 0 && arr[1] < this.col;
  }

  isVacant(value) {
    return value === -1;
  }

  // incoming command
  // test the side effects with mock
  place(ship, coordinates, isVertical = false) {
    let [row, col] = [...coordinates];
    
    for (let i = 0; i < ship.length; i++) {
      if (!isVertical) {
        // update the local array
        this.board[row][col + i] = ship.id;

        //update the DOM
        let query = `#t${this.id} [data-loc='[${row},${col + i}]']`;
        const point = document.querySelector(query);
        point.id = ship.id;
        point.textContent = ship.id;
        
      } else {
        this.board[row + i][col] = ship.id;

        let query = `#t${this.id} [data-loc='[${row + i},${col}]']`;
        const point = document.querySelector(query);
        point.id = ship.id;
        point.textContent = ship.id;
      }
    }
  }

  // incoming command
  // test the side effect
  setShip(...ships) {
    const fleet = [...ships];

    // store each ship first before assigning ID
    // because their position on the board's ship array
    // may differ from their position from argument
    fleet.forEach((ship) => {
      this.ships.push(ship);
    });

    this.ships.forEach((ship, index) => {
      ship.id = index;
    });
  }

  isPlacementValid(ship, coordinates, isVertical = false) {
    let [row, col] = [...coordinates];
    let moveLength = ship.length - 1;

    // if ship is placed, check if it will not exceed board
    if (row + moveLength > this.row && col + moveLength > this.col)
      throw new Error("Out of bounds!");

    // or check if it will overwrite another ship already in the board
    for (let i = 0; i < ship.length; i++) {
      if (!isVertical && !this.isVacant(this.board[row][col + i]))
        throw new Error("Occupied!");
      else if (isVertical && !this.isVacant(this.board[row + i][col]))
        throw new Error("Occupied!");
    }
    return 2;
  }

  // incoming query
  // test the return value
  receiveAttack(coordinates) {
    let [row, col] = [...coordinates];
    let value = this.board[row][col];
    if (!this.isVacant(value)) {
      return value;
    }
    // if a miss, return the coordinates
    // and an outer function will record the miss
    return coordinates;
  }
}

export class GameBoard {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = [];
  }

  // incoming command
  // test side effects with mock
  construct() {
    for (let i = 0; i < this.row; i++) {
      let column = Array(this.col).fill(-1);
      this.board.push(column);
    }
  }

  // incoming query
  // test the return value
  verify(arr) {
    return arr[0] >= 0 && arr[0] < this.row && arr[1] >= 0 && arr[1] < this.col;
  }

  // incoming command
  // test the side effects with mock
  place(ship, coordinates, isVertical = false) {
    let [row, col] = [...coordinates];
    for (let i = 0; i < ship.length; i++) {
      if (!isVertical) this.board[row][col + i] = ship.id;
      else this.board[row + i][col] = ship.id;
    }
  }

  isVacant(value) {
    return value === -1;
  }

  isMoveValid(ship, coordinates, isVertical = false) {
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
    return true;
  }
}

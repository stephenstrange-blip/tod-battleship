import { GameBoard } from "./gameBoard";

export class Player {
  constructor() {
    this.id = null;
    this.board = new GameBoard(10, 10);
  }
}

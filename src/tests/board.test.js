import { GameBoard } from "../gameBoard";
import { Ship } from "../ship";

describe("Board should be a multidimensional array based on input", () => {
  const board = new GameBoard(10, 9);
  board.construct();

  test("Each row must have the same number of columns", () => {
    const getLength = jest.fn((arr) => arr.length);
    board.board.forEach((row) => {
      getLength(row);
    });

    expect(getLength.mock.calls).toHaveLength(10);
    expect(getLength.mock.results[0].value).toEqual(9);
    expect(
      getLength.mock.results[getLength.mock.results.length - 1].value,
    ).toEqual(9);
  });

  test("Board must only receive a valid coordinate", () => {
    expect(board.verify([0, 2])).toBe(true);
    expect(board.verify([1, 10])).toBe(false);
  });
});

describe("Board placement", () => {
  const board = new GameBoard(10, 9);
  board.construct();

  test("Board must correctly place the ship horizontally", () => {
    const checkH = jest.fn((rindex, cindex) => [rindex, cindex]);
    const ship = new Ship(3);
    ship.id = 1;
    board.place(ship, [3, 0]);

    board.board.forEach((r, rindex) => {
      r.forEach((i, cindex) => {
        if (i === ship.id) checkH(rindex, cindex);
      });
    });

    expect(checkH.mock.calls).toHaveLength(3);
    expect(checkH.mock.results[0].value).toEqual([3, 0]);
    expect(checkH.mock.results[checkH.mock.results.length - 1].value).toEqual([
      3, 2,
    ]);
  });

  test("Board must correctly place the ship vertically", () => {
    const checkV = jest.fn((rindex, cindex) => [rindex, cindex]);
    const ship = new Ship(3);
    ship.id = 2;
    board.place(ship, [0, 3], true);

    board.board.forEach((r, rindex) => {
      r.forEach((i, cindex) => {
        if (i === ship.id) checkV(rindex, cindex);
      });
    });

    expect(checkV.mock.calls).toHaveLength(3);
    expect(checkV.mock.results[0].value).toEqual([0, 3]);
    expect(checkV.mock.results[checkV.mock.results.length - 1].value).toEqual([
      2, 3,
    ]);
  });

  test("Board must not overwrite or place a move out of bounds", () => {
    const ship = new Ship(3);
    expect(() => board.isMoveValid(ship, [0, 3])).toThrow("Occupied!");
    expect(() => board.isMoveValid(ship, [9, 9])).toThrow("Out of bounds!");
    expect(board.isMoveValid(ship, [5, 4])).toBe(true);
  });
});

describe("Ship management", () => {
  const board = new GameBoard(10, 10);
  board.construct();

  test("Board must store a live collection of ships with unique IDs", () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(4);
    board.setShip(ship1, ship2);

    expect(board.ships.length).toEqual(2);
    expect(board.ships[0].id).toEqual(0);
    expect(board.ships[1].id).not.toEqual(0);
    expect(board.ships[2]).toBeFalsy();
  });
});
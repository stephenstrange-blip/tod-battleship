export class Ship {
  constructor(length) {
    this.isSunked = false;
    this.length = length;
    this.hits = 0;
    this.id = null;
  }

  // Incoming Command
  // test the side effect, (i.e. this.hits)
  hit() {
    this.hits += 1;
  }

  // Incoming command
  // test the side effect, (i.e. this.isSunked)
  sunk() {
    this.isSunked = true;
  }

  // Incoming query
  // test the return value
  isSunk() {
    return this.hits === this.length;
  }
}

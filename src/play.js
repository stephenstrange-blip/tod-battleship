import { Player } from "./player";
export class GamePlay {
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
    const player = new Player();
    const computer = new Player();
    player.id = 1;
    computer.id = 0;

    player.board.construct();
    computer.board.construct();
  }
}

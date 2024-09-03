import { Game } from './Game';

export class GameLoop {
  private game: Game;
  private lastTime: number = 0;

  constructor(game: Game) {
    this.game = game;
  }

  start(): void {
    requestAnimationFrame(this.loop.bind(this));
  }

  private loop(time: number): void {
    const deltaTime = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.game.update(deltaTime);
    this.game.render();

    requestAnimationFrame(this.loop.bind(this));
  }
}

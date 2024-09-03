import { GameLoop } from './engine/core/GameLoop';
import { Canvas2DRenderer } from './engine/renderers/Canvas2DRenderer';
import { PongGame } from './games/pong/PongGame';
import { SnakeGame } from './games/snake/SnakeGame';
import { InputHandler } from './engine/core/InputHandler';
import { Game } from './engine/core/Game';



export class SepinacoGameEngine {

  parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.init();
  }

  private init(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;

    if(this.parent) {
      this.parent.appendChild(canvas);
    } else {
      document.body.appendChild(canvas);
    };

    const renderer = new Canvas2DRenderer(canvas);
    const inputHandler = new InputHandler();

    // const gameType = 'pong'; // cambiar a 'snake' para jugar Snake
    // let game: Game;

    // if (gameType === 'pong') {
    //   game = new PongGame(renderer, inputHandler) as Game;
    // } else if (gameType === 'snake') {
    //   game = new SnakeGame(renderer, inputHandler) as Game;
    // } else {
    //   // default
    //   game = new PongGame(renderer, inputHandler) as Game;
    // }

    // const game: Game = new PongGame(renderer, inputHandler) as Game;
    const game: Game = new SnakeGame(renderer, inputHandler) as Game;


    const gameLoop = new GameLoop(game);
    gameLoop.start();
  }
}

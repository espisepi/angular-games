import { Game } from '../../engine/core/Game';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { InputHandler } from '../../engine/core/InputHandler';
import { IGameRenderer } from '../../engine/interfaces/IGameRenderer';

export class PongGame extends Game {
  constructor(renderer: IGameRenderer, input: InputHandler) {
    super(renderer);

    const playerPaddle = new Paddle(30, 250, 10, 100, input);
    const ball = new Ball(400, 300, 10);

    this.addEntity(playerPaddle);
    this.addEntity(ball);
  }
}

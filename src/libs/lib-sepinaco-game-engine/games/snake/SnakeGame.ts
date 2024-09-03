import { Game } from '../../engine/core/Game';
import { Snake } from './Snake';
import { Food } from './Food';
import { InputHandler } from '../../engine/core/InputHandler';
import { IGameRenderer } from '../../engine/interfaces/IGameRenderer';

export class SnakeGame extends Game {
  constructor(renderer: IGameRenderer, input: InputHandler) {
    super(renderer);

    const snake = new Snake(input);
    const food = new Food(15, 15, 20);

    this.addEntity(snake);
    this.addEntity(food);
  }
}

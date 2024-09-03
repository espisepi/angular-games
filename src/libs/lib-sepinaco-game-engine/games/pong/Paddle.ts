import { Entity } from '../../engine/core/Entity';
import { IGameRenderer } from '../../engine/interfaces/IGameRenderer';
import { InputHandler } from '../../engine/core/InputHandler';

export class Paddle extends Entity {
  constructor(public x: number, public y: number, public width: number, public height: number, private input: InputHandler) {
    super();
  }

  update(deltaTime: number): void {
    if (this.input.isKeyPressed('ArrowUp')) this.y -= 200 * deltaTime;
    if (this.input.isKeyPressed('ArrowDown')) this.y += 200 * deltaTime;
  }

  render(renderer: IGameRenderer): void {
    renderer.renderRect(this.x, this.y, this.width, this.height, 'white');
  }
}

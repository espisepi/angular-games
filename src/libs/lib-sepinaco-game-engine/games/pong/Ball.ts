import { Entity } from '../../engine/core/Entity';
import { IGameRenderer } from '../../engine/interfaces/IGameRenderer';

export class Ball extends Entity {
  private velocityX = 200;
  private velocityY = 200;

  constructor(public x: number, public y: number, public radius: number) {
    super();
  }

  update(deltaTime: number): void {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    if (this.y < 0 || this.y > 600) this.velocityY *= -1; // bounce off top/bottom walls
  }

  render(renderer: IGameRenderer): void {
    renderer.renderCircle(this.x, this.y, this.radius, 'white');
  }
}

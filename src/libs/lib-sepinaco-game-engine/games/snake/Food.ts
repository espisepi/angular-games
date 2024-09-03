import { Entity } from '../../engine/core/Entity';
import { IGameRenderer } from '../../engine/interfaces/IGameRenderer';

export class Food extends Entity {
  constructor(public x: number, public y: number, private gridSize: number) {
    super();
  }

  render(renderer: IGameRenderer): void {
    renderer.renderRect(this.x * this.gridSize, this.y * this.gridSize, this.gridSize, this.gridSize, 'red');
  }

  update(deltaTime: number): void {
    // No need for update logic in this case
  }
}

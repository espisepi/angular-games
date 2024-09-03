import { Entity } from '../../engine/core/Entity';
import { IGameRenderer } from '../../engine/interfaces/IGameRenderer';
import { InputHandler } from '../../engine/core/InputHandler';

export class Snake extends Entity {
  private segments: { x: number; y: number }[] = [{ x: 10, y: 10 }];
  private direction = { x: 1, y: 0 };
  private gridSize = 20;

  constructor(private input: InputHandler) {
    super();
  }

  update(deltaTime: number): void {
    this.handleInput();

    const head = { ...this.segments[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;

    this.segments.unshift(head);
    this.segments.pop(); // remove last segment to simulate movement
  }

  private handleInput(): void {
    if (this.input.isKeyPressed('ArrowUp') && this.direction.y !== 1) this.direction = { x: 0, y: -1 };
    if (this.input.isKeyPressed('ArrowDown') && this.direction.y !== -1) this.direction = { x: 0, y: 1 };
    if (this.input.isKeyPressed('ArrowLeft') && this.direction.x !== 1) this.direction = { x: -1, y: 0 };
    if (this.input.isKeyPressed('ArrowRight') && this.direction.x !== -1) this.direction = { x: 1, y: 0 };
  }

  render(renderer: IGameRenderer): void {
    for (const segment of this.segments) {
      renderer.renderRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize, 'green');
    }
  }
}

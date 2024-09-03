import { Entity } from './Entity';
import { IGameRenderer } from '../interfaces/IGameRenderer';

export abstract class Game {
  protected entities: Entity[] = [];
  protected renderer: IGameRenderer;

  constructor(renderer: IGameRenderer) {
    this.renderer = renderer;
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  update(deltaTime: number): void {
    this.entities.forEach(entity => entity.update(deltaTime));
  }

  render(): void {
    this.renderer.clear();
    this.entities.forEach(entity => entity.render(this.renderer));
  }
}

import { IGameRenderer } from "../interfaces/IGameRenderer";

export abstract class Entity {
  abstract update(deltaTime: number): void;
  abstract render(renderer: IGameRenderer): void;
}

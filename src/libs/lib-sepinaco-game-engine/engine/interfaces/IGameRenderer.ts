export interface IGameRenderer {
  renderRect(x: number, y: number, width: number, height: number, color: string): void;
  renderCircle(x: number, y: number, radius: number, color: string): void;
  clear(): void;
}

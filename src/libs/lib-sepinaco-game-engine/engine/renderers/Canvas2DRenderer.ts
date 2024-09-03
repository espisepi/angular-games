import { IGameRenderer } from '../interfaces/IGameRenderer';

export class Canvas2DRenderer implements IGameRenderer {
  private context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;
  }

  renderRect(x: number, y: number, width: number, height: number, color: string): void {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  renderCircle(x: number, y: number, radius: number, color: string): void {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2);
    this.context.fill();
  }

  clear(): void {
    this.context.clearRect(0, 0, 800, 600); // Assuming fixed size, can be dynamic
  }
}

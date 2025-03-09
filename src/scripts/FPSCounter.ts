import { Game } from './Game.js';

export class FPSCounter {
	private fps: number = 0;

	public process(deltaTimeMillis: number): void {
		const deltaTimeSeconds = deltaTimeMillis / 1000;
		this.fps = Math.round(1 / deltaTimeSeconds);
	}

	public draw(): void {
		const context = Game.getInstance().getCanvas().getContext();
		context.fillStyle = 'white';
		context.fillRect(0, 0, 200, 100);
		context.font = '25px Arial';
		context.fillStyle = 'black';
		context.fillText(`FPS: ${this.fps}`, 10, 30);
	}
}

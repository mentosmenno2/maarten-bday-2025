export class FPSCounter {
	private fps: number = 0;
	private fpsHistory: number[] = [];
	private readonly maxSamples = 30;

	public update(deltaTimeMillis: number): void {
		const deltaTimeSeconds = deltaTimeMillis / 1000;
		const currentFps = 1 / deltaTimeSeconds;

		// Keep FPS history of 30 frames
		this.fpsHistory.push(currentFps);
		if (this.fpsHistory.length > this.maxSamples) {
			this.fpsHistory.shift();
		}

		// Calculate average FPS of last 30 frames to prevent flickering
		const total = this.fpsHistory.reduce((sum, val) => sum + val, 0);
		this.fps = Math.round(total / this.fpsHistory.length);
	}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.font = '14px Arial';
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'white';
		ctx.strokeText(`FPS: ${this.fps}`, 10, 10);
		ctx.shadowBlur = 0;
		ctx.fillStyle = 'black';
		ctx.fillText(`FPS: ${this.fps}`, 10, 10);
	}
}

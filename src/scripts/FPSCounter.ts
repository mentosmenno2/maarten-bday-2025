export class FPSCounter {
	private fps: number = 0;

	public update(deltaTimeMillis: number): void {
		const deltaTimeSeconds = deltaTimeMillis / 1000;
		this.fps = Math.round(1 / deltaTimeSeconds);
	}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.font = '25px Arial';
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'white';
		ctx.strokeText(`FPS: ${this.fps}`, 10, 10);
		ctx.shadowBlur = 0;
		ctx.fillStyle = 'black';
		ctx.fillText(`FPS: ${this.fps}`, 10, 10);
	}
}

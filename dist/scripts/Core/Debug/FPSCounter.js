export class FPSCounter {
    fps = 0;
    fpsHistory = [];
    maxSamples = 30;
    update(deltaTimeMillis) {
        const deltaTimeSeconds = deltaTimeMillis / 1000;
        const currentFps = 1 / deltaTimeSeconds;
        this.fpsHistory.push(currentFps);
        if (this.fpsHistory.length > this.maxSamples) {
            this.fpsHistory.shift();
        }
        const total = this.fpsHistory.reduce((sum, val) => sum + val, 0);
        this.fps = Math.round(total / this.fpsHistory.length);
    }
    render(ctx) {
        ctx.save();
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.strokeText(`FPS: ${this.fps}`, 10, 10);
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'black';
        ctx.fillText(`FPS: ${this.fps}`, 10, 10);
        ctx.restore();
    }
}

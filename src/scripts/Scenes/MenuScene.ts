import { AbstractScene } from './AbstractScene.js';

export class MenuScene extends AbstractScene {
	update(deltaTime: number): void {
		console.log(`MenuScene deltaTime ${deltaTime}`);
	}
	render(ctx: CanvasRenderingContext2D): void {
		const { width, height } = this.game.getCanvas().getElement();

		ctx.fillStyle = '#0f0f1f';
		ctx.fillRect(0, 0, width, height);

		ctx.fillStyle = '#ff66cc';
		ctx.font = '48px sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText('SynthWave Rhythm Game', width / 2, height / 2 - 50);

		ctx.fillStyle = '#66ccff';
		ctx.font = '24px sans-serif';
		ctx.fillText('Klik om te starten', width / 2, height / 2 + 20);
	}
}

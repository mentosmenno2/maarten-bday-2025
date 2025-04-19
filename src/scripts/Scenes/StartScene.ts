import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { AbstractScene } from './AbstractScene.js';
import { SongSelectScene } from './SongSelectScene.js';

export class StartScene extends AbstractScene {
	public update(): void {}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#0f0f1f';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.fillStyle = ColorUtils.getRgb(ColorEnum.Purple);
		ctx.font = '48px sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText(
			'SynthWave Rhythm Game',
			ctx.canvas.width / 2,
			ctx.canvas.height / 2 - 50,
		);

		ctx.fillStyle = ColorUtils.getRgb(ColorEnum.LightBlue);
		ctx.font = '24px sans-serif';
		ctx.fillText(
			'Klik om te starten',
			ctx.canvas.width / 2,
			ctx.canvas.height / 2 + 20,
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public handleClick(): void {
		this.game.setCurrentScene(new SongSelectScene(this.game));
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public handleMouseMove(): void {
		this.game.getCanvas().getElement().style.cursor = 'pointer';
	}
}

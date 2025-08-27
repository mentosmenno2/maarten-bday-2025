import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';

export class SongSelectScene extends AbstractScene {

	constructor(game: Game) {
		super(game);
	}

	public update(): void {}

	public render(ctx: CanvasRenderingContext2D): void {
		// Settings button


		// Song file select button in middle of screen.


		// Old version
		// ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
		// ctx.font = '32px sans-serif';
		// ctx.textAlign = 'center';
		// ctx.textBaseline = 'top';

		// ctx.fillText('Select a song file', ctx.canvas.width / 2, 50);

		console.log(ctx.canvas);
	}
}

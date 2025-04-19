import { ColorEnum } from '../ColorEnum.js';
import { ColorUtils } from '../ColorUtils.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';

export class SongSelectScene extends AbstractScene {
	private songs: string[] = ['Song 1', 'Song 2', 'Song 3'];

	constructor(game: Game) {
		super(game);
	}

	public update(): void {}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Black);
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
		ctx.font = '32px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';

		this.songs.forEach((song, i) => {
			const y = 100 + i * 60;
			ctx.fillText(song, ctx.canvas.width / 2, y);
		});
	}
}

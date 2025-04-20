import { ActualVector2 } from '../Core/Position/ActualVector2.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { SettingsScene } from './SettingsScene.js';

export class SongSelectScene extends AbstractScene {
	private songs: string[] = ['Song 1', 'Song 2', 'Song 3'];

	constructor(game: Game) {
		super(game);
	}

	public update(): void {}

	public render(ctx: CanvasRenderingContext2D): void {
		// Settings button
		ctx.font = '32px sans-serif';
		ctx.textAlign = 'right';
		ctx.textBaseline = 'top';
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
		ctx.fillText('Instellingen', 100, 500); // Simpele tekstknop voorlopig

		// Song list

		ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
		ctx.font = '32px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';

		this.songs.forEach((song, i) => {
			const y = 100 + i * 60;
			ctx.fillText(song, ctx.canvas.width / 2, y);
		});
	}

	public handleClick(vector2: ActualVector2): void {
		if (
			vector2.getX() >= 100 &&
			vector2.getX() <= 300 &&
			vector2.getY() >= 480 &&
			vector2.getY() <= 520
		) {
			this.game.getSceneManager().push(new SettingsScene(this.game));
		}
	}
}

import { Wallpaper } from '../Core/GameObjects/Wallpaper.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { SongSelectScene } from './SongSelectScene.js';

export class StartScene extends AbstractScene {

	private wallpaper: Wallpaper;

	constructor(game: Game) {
		super(game);
		this.wallpaper = new Wallpaper(game);
	}

	public update(deltaTime: number, ctx: CanvasRenderingContext2D): void {
		this.wallpaper.update(deltaTime, ctx);

		if ( this.game.getInputManager().isAnyInput() ) {
			this.game.getInputManager().reset();
			this.game.getSceneManager().push(new SongSelectScene(this.game));

			// Go to fullscreen
			// this.game.getCanvas().getElement().requestFullscreen();
		}

	}

	public render(ctx: CanvasRenderingContext2D): void {
		this.wallpaper.render(ctx);

		ctx.save();
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Pink);
		ctx.font = `${ctx.canvas.height * 0.08}px Arial`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.shadowColor = ColorUtils.getHex(ColorEnum.White);
		const time = performance.now() / 1000;
		ctx.shadowBlur = 15 + Math.sin(time * 3) * 10;
		ctx.fillText('Klik om te starten', ctx.canvas.width / 2, ctx.canvas.height / 2);
		ctx.restore();
	}
}

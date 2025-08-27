import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { SongSelectScene } from './SongSelectScene.js';

export class StartScene extends AbstractScene {

	constructor(game: Game) {
		super(game);
	}

	public update(): void {
		if ( this.game.getInputManager().isAnyInput() ) {
			this.game.getInputManager().reset();
			this.game.getSceneManager().push(new SongSelectScene(this.game));

			// Go to fullscreen
			// this.game.getCanvas().getElement().requestFullscreen();
		}

	}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Pink);
		ctx.font = `${ctx.canvas.height * 0.08}px sans-serif`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.shadowColor = ColorUtils.getHex(ColorEnum.White);
		const time = performance.now() / 1000;
		ctx.shadowBlur = 15 + Math.sin(time * 3) * 10;
		ctx.fillText('Klik om te starten', ctx.canvas.width / 2, ctx.canvas.height / 2);
		ctx.restore();
	}
}

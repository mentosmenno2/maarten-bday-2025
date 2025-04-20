import { Background } from '../Core/Style/Background.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { SongSelectScene } from './SongSelectScene.js';

export class StartScene extends AbstractScene {
	private background: Background;

	constructor(game: Game) {
		super(game);
		this.background = new Background(this.game);
	}

	public update(): void {
		this.background.update();
	}

	public render(ctx: CanvasRenderingContext2D): void {
		this.background.render(ctx);

		const { width, height } = ctx.canvas;

		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Pink);
		ctx.font = '48px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.shadowColor = ColorUtils.getHex(ColorEnum.White);
		const time = performance.now() / 1000;
		ctx.shadowBlur = 15 + Math.sin(time * 3) * 10;

		ctx.fillText('Klik om te starten', width / 2, height / 2);
		ctx.shadowBlur = 0;
		ctx.shadowColor = 'transparent';
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public handleClick(): void {
		this.game.getCanvas().getElement().requestFullscreen();
		this.game.getSceneManager().push(new SongSelectScene(this.game));
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public handleMouseMove(): void {
		this.game.getCanvas().getElement().style.cursor = 'pointer';
	}
}

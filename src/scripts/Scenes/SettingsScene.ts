import { ActualVector2 } from '../Core/Position/ActualVector2.js';
import { SettingsInterface } from '../Core/Settings/SettingsInterface.js';
import { SettingsService } from '../Core/Settings/SettingsService.js';
import { Background } from '../Core/Style/Background.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';

export class SettingsScene extends AbstractScene {
	private background: Background;
	private settings: SettingsInterface;

	constructor(game: Game) {
		super(game);
		this.background = new Background(this.game);
		this.settings = SettingsService.get();
	}

	public update(): void {
		this.background.update();
	}

	public render(ctx: CanvasRenderingContext2D): void {
		this.background.render(ctx);

		ctx.textAlign = 'left';
		ctx.font = '20px Arial';
		ctx.fillStyle = 'white';

		ctx.fillText('Muziekvolume:', 100, 100);
		this.renderSlider(ctx, 300, 100, this.settings.musicVolume);

		ctx.fillText('Effectvolume:', 100, 160);
		this.renderSlider(ctx, 300, 160, this.settings.effectsVolume);

		ctx.fillText('Druk op ESC om terug te keren', 100, 240);
	}

	private renderSlider(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		value: number,
	): void {
		ctx.fillStyle = '#444';
		ctx.fillRect(x, y, 200, 20);

		ctx.fillStyle = '#0ff'; // slider kleur
		ctx.fillRect(x, y, value * 200, 20);
	}

	public handleClick(vector2: ActualVector2): void {
		if (
			vector2.getY() >= 100 &&
			vector2.getY() <= 120 &&
			vector2.getX() >= 300 &&
			vector2.getX() <= 500
		) {
			this.settings.musicVolume = (vector2.getX() - 300) / 200;
		}
		if (
			vector2.getY() >= 160 &&
			vector2.getY() <= 180 &&
			vector2.getX() >= 300 &&
			vector2.getX() <= 500
		) {
			this.settings.effectsVolume = (vector2.getX() - 300) / 200;
		}
		SettingsService.update(this.settings);
	}
}

import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { SettingsScene } from './SettingsScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { CollisionHelper } from '../Core/Helpers/CollisionHelper.js';

export class SongSelectScene extends AbstractScene {

	private settingsBtnRect: {
		x: number,
		y: number,
		w: number,
		h: number
	};

	constructor(game: Game) {
		super(game);
		this.settingsBtnRect = { x: 0, y: 0, w: 0, h: 0 };
	}


	public update(): void {
		// Detect click/touch on settings button
		const input = this.game.getInputManager();
		if (input.isMouseOrFingerJustPressed()) {
			const pos = input.getMouseOrFingerPosition();
			if (pos && CollisionHelper.boxPosCollide(this.settingsBtnRect, pos)) {
				// Open settings scene
				this.game.getSceneManager().push(new SettingsScene(this.game));
				input.reset();
			}
		}
	}

	public render(ctx: CanvasRenderingContext2D): void {
		// Settings button on top right of screen (scales with height)
		const { width, height } = ctx.canvas;
		const btnHeight = Math.round(height * 0.08);
		const btnPadding = Math.round(btnHeight * 0.5);
		ctx.font = `${Math.round(btnHeight * 0.5)}px sans-serif`;
		const text = 'Instellingen';
		const textMetrics = ctx.measureText(text);
		const btnWidth = Math.round(textMetrics.width + btnPadding * 2);
		const x = width - btnWidth - btnPadding;
		const y = btnPadding;

		// Save rect for click detection
		this.settingsBtnRect = { x, y, w: btnWidth, h: btnHeight };

		ctx.save();
		ctx.fillStyle = ColorUtils ? ColorUtils.getHex(ColorEnum.LightBlue) : '#66ccff';
		ctx.strokeStyle = ColorUtils ? ColorUtils.getHex(ColorEnum.Purple) : '#9933ff';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.roundRect(x, y, btnWidth, btnHeight, btnHeight * 0.3);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = ColorUtils ? ColorUtils.getHex(ColorEnum.Purple) : '#9933ff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(text, x + btnWidth / 2, y + btnHeight / 2);
		ctx.restore();
	}
}

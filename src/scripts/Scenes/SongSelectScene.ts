import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';

export class SongSelectScene extends AbstractScene {

	private selectSongButton: {
		x: number;
		y: number;
		width: number;
		height: number;
		text: string;
		fontSize: number;
		fontFamily: string;
		padding: number;
	};

	constructor(game: Game) {
		super(game);
		this.selectSongButton = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			text: "Bestand uploaden",
			fontSize: 0,
			fontFamily: 'Arial',
			padding: 10
		};
	}


	public update(_deltaTime: number, ctx: CanvasRenderingContext2D): void {
		this.updateSongSelectButton(ctx);
	}

	private updateSongSelectButton(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		this.selectSongButton.fontSize = ctx.canvas.height * 0.05;
		ctx.font = `${this.selectSongButton.fontSize}px ${this.selectSongButton.fontFamily}`;
		const textMetrics = ctx.measureText(this.selectSongButton.text);
		this.selectSongButton.width = textMetrics.width + this.selectSongButton.padding * 2;
		this.selectSongButton.height = this.selectSongButton.fontSize + this.selectSongButton.padding * 2;
		this.selectSongButton.x = (ctx.canvas.width - this.selectSongButton.width) / 2;
		this.selectSongButton.y = (ctx.canvas.height - this.selectSongButton.height) / 2;
		ctx.restore();
	}

	public render(ctx: CanvasRenderingContext2D): void {
		this.renderSongSelectButton(ctx);
	}

	private renderSongSelectButton(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Pink);
		ctx.fillRect(this.selectSongButton.x, this.selectSongButton.y, this.selectSongButton.width, this.selectSongButton.height);
		ctx.font = `${this.selectSongButton.fontSize}px ${this.selectSongButton.fontFamily}`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.fillText(this.selectSongButton.text, this.selectSongButton.x + this.selectSongButton.width / 2, this.selectSongButton.y + this.selectSongButton.height / 2);
		ctx.restore();
	}
}

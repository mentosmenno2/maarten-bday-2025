import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { CollisionHelper } from '../Core/Helpers/CollisionHelper.js';
import { ApiClient } from '../API/ApiClient.js';
import { DifficultySelectScene } from './DifficultySelectScene.js';

export class SongSelectScene extends AbstractScene {

	private selectSongButton: {
		x: number;
		y: number;
		w: number;
		h: number;
		text: string;
		fontSize: number;
		fontFamily: string;
		padding: number;
	};

	private fileInput: HTMLInputElement;

	constructor(game: Game) {
		super(game);
		this.selectSongButton = {
			x: 0,
			y: 0,
			w: 0,
			h: 0,
			text: "Bestand uploaden",
			fontSize: 0,
			fontFamily: 'Arial',
			padding: 10
		};

		this.fileInput = document.createElement('input');
		this.fileInput.type = 'file';
		this.fileInput.onchange = this.handleFileInputChange.bind(this);
	}


	public update(_deltaTime: number, ctx: CanvasRenderingContext2D): void {
		this.updateSongSelectButton(ctx);
		this.handleSongSelectButtonClick();
	}

	private updateSongSelectButton(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		this.selectSongButton.fontSize = ctx.canvas.height * 0.05;
		ctx.font = `${this.selectSongButton.fontSize}px ${this.selectSongButton.fontFamily}`;
		const textMetrics = ctx.measureText(this.selectSongButton.text);
		this.selectSongButton.w = textMetrics.width + this.selectSongButton.padding * 2;
		this.selectSongButton.h = this.selectSongButton.fontSize + this.selectSongButton.padding * 2;
		this.selectSongButton.x = (ctx.canvas.width - this.selectSongButton.w) / 2;
		this.selectSongButton.y = (ctx.canvas.height - this.selectSongButton.h) / 2;
		ctx.restore();
	}

	private handleSongSelectButtonClick(): void {
		const inputManager = this.game.getInputManager();
		const clicked = inputManager.isMouseOrFingerJustPressed();
		const clickpos = inputManager.getMouseOrFingerPosition();
		if ( ! clicked || ! clickpos || ! CollisionHelper.boxPosCollide(this.selectSongButton, clickpos) ) {
			return;
		}

		// Open file input
		this.fileInput.click();
	}

	public render(ctx: CanvasRenderingContext2D): void {
		this.renderSongSelectButton(ctx);
	}

	private renderSongSelectButton(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Pink);
		ctx.fillRect(this.selectSongButton.x, this.selectSongButton.y, this.selectSongButton.w, this.selectSongButton.h);
		ctx.font = `${this.selectSongButton.fontSize}px ${this.selectSongButton.fontFamily}`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.fillText(this.selectSongButton.text, this.selectSongButton.x + this.selectSongButton.w / 2, this.selectSongButton.y + this.selectSongButton.h / 2);
		ctx.restore();
	}

	private handleFileInputChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) {
			return;
		}

		const file = input.files[0];
		if (!file) {
			return;
		}

		this.fileInput.value = '';
		this.fileInput.files = null;
		this.uploadSongFile(file);
	}

	private async uploadSongFile(file: File): Promise<void> {
		const apiClient = new ApiClient();
		let response = null;
		try {
			response = await apiClient.parseSong(file);
		} catch (error) {
			window.alert(`Error uploading file: ${error}`);
			return;
		}

		console.log('Song parsed successfully:', response.song);

		this.game.getInputManager().reset();
		this.game.getSceneManager().push(new DifficultySelectScene(this.game, response.song));
	}
}

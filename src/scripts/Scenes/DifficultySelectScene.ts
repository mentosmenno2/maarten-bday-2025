import { SongInterface } from '../API/SongInterface.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { CollisionHelper } from '../Core/Helpers/CollisionHelper.js';
import { LevelScene } from './LevelScene.js';

export class DifficultySelectScene extends AbstractScene {

	private backgroundImage: HTMLImageElement|null;
	private coverImage: HTMLImageElement|null;

	private difficultyButtons: Array<{
		x: number; y: number; w: number; h: number; difficultyIndex: number, difficultyName: string
	}>;

	private previewAudio: HTMLAudioElement;

	constructor(game: Game, private song: SongInterface) {
		super(game);

		this.difficultyButtons = [];
		for (let difficultyIndex = 0; difficultyIndex < this.song.difficulties.length; difficultyIndex++) {
			this.difficultyButtons.push({
				x: 0,
				y: 0,
				w: 0,
				h: 0,
				difficultyIndex: difficultyIndex,
				difficultyName: this.song.difficulties[difficultyIndex].name
			});
		}

		const backgroundImageBase64 = this.song.backgroundImageBase64 || this.song.coverImageBase64;
		this.backgroundImage = null;
		if (backgroundImageBase64) {
			this.backgroundImage = new Image();
			this.backgroundImage.src = backgroundImageBase64;
		}

		const coverImageBase64 = this.song.coverImageBase64 || this.song.backgroundImageBase64;
		if (coverImageBase64) {
			this.coverImage = new Image();
			this.coverImage.src = coverImageBase64;
		}

		this.previewAudio = document.createElement('audio');
		if (this.song.audioBase64) {
			const srcElement = document.createElement('source');
			srcElement.src = this.song.audioBase64;
			this.previewAudio.appendChild(srcElement);
		}
		this.previewAudio.loop = true;
		this.previewAudio.volume = 0.1;
		this.previewAudio.preload = 'auto';
		this.previewAudio.autoplay = true;
		this.previewAudio.load();
	}

	public update(): void {
		this.updateDifficultyButtons();
		this.handleDifficultyButtonsClick();
	}

	private updateDifficultyButtons(): void {
		const { width, height } = this.game.getCanvas().getElement();

		this.difficultyButtons.forEach((button, index) => {
			button.x = Math.round((width - button.w) / 2);
			button.y = Math.round(height * (0.3 + index * 0.1));
			button.w = Math.round(width * 0.28);
			button.h = Math.round(height * 0.08);
		});
	}

	private handleDifficultyButtonsClick(): void {
		const inputManager = this.game.getInputManager();
		const clicked = inputManager.isMouseOrFingerJustPressed();
		const clickpos = inputManager.getMouseOrFingerPosition();
		if ( ! clicked || ! clickpos ) {
			return;
		}

		const collidedButton = this.difficultyButtons.find(button => CollisionHelper.boxPosCollide(button, clickpos));
		if ( ! collidedButton ) {
			return;
		}

		if ( ! this.previewAudio.paused ) {
			this.previewAudio.pause();
		}
		this.game.getInputManager().reset();
		this.game.getSceneManager().push(new LevelScene(this.game, this.song, collidedButton.difficultyIndex));
	}

	public render(ctx: CanvasRenderingContext2D): void {
		this.renderBackgroundImage(ctx);
		this.renderCoverImage(ctx);
		this.renderSongTitle(ctx);
		this.renderSongArtist(ctx);
		this.renderMapper(ctx);
		this.renderDifficultyButtons(ctx);
	}

	private renderBackgroundImage(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		if (this.backgroundImage) {
			ctx.filter = 'blur(10px)';
			ctx.globalAlpha = 1;
			const imageAspectRatio = this.backgroundImage.width / this.backgroundImage.height;
			const canvasAspectRatio = width / height;
			if (imageAspectRatio > canvasAspectRatio) {
				const scaledHeight = height;
				const scaledWidth = scaledHeight * imageAspectRatio;
				ctx.drawImage(this.backgroundImage, (width - scaledWidth) / 2, 0, scaledWidth, scaledHeight);
			} else {
				const scaledWidth = width;
				const scaledHeight = scaledWidth / imageAspectRatio;
				ctx.drawImage(this.backgroundImage, 0, (height - scaledHeight) / 2, scaledWidth, scaledHeight);
			}
			ctx.filter = 'none';
			ctx.globalAlpha = 0.7;
			ctx.fillStyle = ColorUtils.getHex(ColorEnum.Black);
			ctx.fillRect(0, 0, width, height);
		} else {
			ctx.fillStyle = ColorUtils.getHex(ColorEnum.Black);
			ctx.fillRect(0, 0, width, height);
		}
		ctx.restore();
	}

	private renderCoverImage(ctx: CanvasRenderingContext2D): void {
		if (! this.coverImage) {
			return;
		}

		const { width, height } = ctx.canvas;

		ctx.save();
		const artSize = Math.round(Math.min(width, height) * 0.25);
		const artX = width / 2 - artSize / 2;
		const artY = Math.round(height * 0.12);
		ctx.beginPath();
		ctx.arc(width/2, artY + artSize/2, artSize/2, 0, Math.PI*2);
		ctx.closePath();
		ctx.clip();

		const imageAspectRatio = this.coverImage.width / this.coverImage.height;
		const artAspectRatio = artSize / artSize;
		if (imageAspectRatio > artAspectRatio) {
			const scaledHeight = artSize;
			const scaledWidth = scaledHeight * imageAspectRatio;
			ctx.drawImage(this.coverImage, artX + (artSize - scaledWidth) / 2, artY, scaledWidth, scaledHeight);
		} else {
			const scaledWidth = artSize;
			const scaledHeight = scaledWidth / imageAspectRatio;
			ctx.drawImage(this.coverImage, artX, artY + (artSize - scaledHeight) / 2, scaledWidth, scaledHeight);
		}
		ctx.restore();
	}

	private renderSongTitle(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		let titleFontSize = Math.round(height*0.06);
		ctx.font = `${titleFontSize}px Arial`;
		let titleWidth = ctx.measureText(this.song.title).width;
		while (titleWidth > width * 0.92 && titleFontSize > 10) {
			titleFontSize--;
			ctx.font = `${titleFontSize}px Arial`;
			titleWidth = ctx.measureText(this.song.title).width;
		}
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.strokeStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
		ctx.lineWidth = 5;
		ctx.strokeText(this.song.title, width/2, height*0.42);
		ctx.fillText(this.song.title, width/2, height*0.42);
		ctx.restore();
	}

	private renderSongArtist(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		let artistFontSize = Math.round(height*0.04);
		ctx.font = `${artistFontSize}px Arial`;
		let artistWidth = ctx.measureText(this.song.artist).width;
		while (artistWidth > width * 0.92 && artistFontSize > 8) {
			artistFontSize--;
			ctx.font = `${artistFontSize}px Arial`;
			artistWidth = ctx.measureText(this.song.artist).width;
		}
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.strokeStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
		ctx.lineWidth = 5;
		ctx.strokeText(this.song.artist, width/2, height*0.50);
		ctx.fillText(this.song.artist, width/2, height*0.50);
		ctx.restore();
	}

	private renderMapper(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		if (this.song.builder) {
			ctx.font = `${Math.round(height*0.025)}px Arial`;
			ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.strokeStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
			ctx.lineWidth = 5;
			ctx.strokeText(`Maker: ${this.song.builder}`, width/2, height*0.55);
			ctx.fillText(`Maker: ${this.song.builder}`, width/2, height*0.55);
		}
		ctx.restore();
	}

	private renderDifficultyButtons(ctx: CanvasRenderingContext2D): void {
		ctx.save();

		// Loop this.difficultyButtons
		for (const difficultyButton of this.difficultyButtons) {
			ctx.fillStyle = ColorUtils.getRgba(ColorEnum.Black, 0.8);
			ctx.strokeStyle = ColorUtils.getHex(ColorEnum.White);
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.roundRect(difficultyButton.x, difficultyButton.y, difficultyButton.w, difficultyButton.h, difficultyButton.h * 0.3);
			ctx.fill();
			ctx.stroke();
			ctx.font = `${Math.round(difficultyButton.h * 0.45)}px Arial`;
			ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(difficultyButton.difficultyName, difficultyButton.x + difficultyButton.w / 2, difficultyButton.y + difficultyButton.h / 2);
		}
		ctx.restore();
	}
}

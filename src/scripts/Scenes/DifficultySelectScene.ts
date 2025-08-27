import { SongInterface } from '../API/SongInterface.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';

export class DifficultySelectScene extends AbstractScene {

	private backgroundImage: HTMLImageElement|null;
	private coverImage: HTMLImageElement|null;

	constructor(game: Game, private song: SongInterface) {
		super(game);

		const backgroundImageBase64 = this.song.backgroundImageBase64 || this.song.coverImageBase64;
		this.backgroundImage = null;
		if (backgroundImageBase64) {
			this.backgroundImage = new window.Image();
			this.backgroundImage.src = backgroundImageBase64;
		}

		const coverImageBase64 = this.song.coverImageBase64 || this.song.backgroundImageBase64;
		if (coverImageBase64) {
			this.coverImage = new window.Image();
			this.coverImage.src = coverImageBase64;
		}
	}

	public update(): void {
		// Update the level
	}

	public render(ctx: CanvasRenderingContext2D): void {
		this.renderBackgroundImage(ctx);
		this.renderCoverImage(ctx);
		this.renderSongTitle(ctx);
		this.renderSongArtist(ctx);
		this.renderMapper(ctx);
		this.renderStartButton(ctx);
	}

	private renderBackgroundImage(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		if (this.backgroundImage) {
			ctx.filter = 'blur(10px)';
			ctx.globalAlpha = 1;
			ctx.drawImage(this.backgroundImage, 0, 0, width, height);
			ctx.filter = 'none';
			ctx.globalAlpha = 0.7;
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, width, height);
		} else {
			ctx.fillStyle = '#222';
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
		ctx.drawImage(this.coverImage, artX, artY, artSize, artSize);
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
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
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
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.fillText(this.song.artist, width/2, height*0.50);
		ctx.restore();
	}

	private renderMapper(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		if (this.song.builder) {
			ctx.font = `${Math.round(height*0.025)}px Arial`;
			ctx.fillStyle = '#ccc';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.fillText(`Mapper: ${this.song.builder}`, width/2, height*0.55);
		}
		ctx.restore();
	}

	private renderStartButton(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		const btnW = Math.round(width * 0.28);
		const btnH = Math.round(height * 0.08);
		const btnX = Math.round((width - btnW) / 2);
		const btnY = Math.round(height * 0.7);

		ctx.save();
		ctx.fillStyle = '#fff3';
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.roundRect(btnX, btnY, btnW, btnH, btnH*0.3);
		ctx.fill();
		ctx.stroke();
		ctx.font = `${Math.round(btnH*0.45)}px Arial`;
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('Start', btnX + btnW/2, btnY + btnH/2);
		ctx.restore();
	}
}

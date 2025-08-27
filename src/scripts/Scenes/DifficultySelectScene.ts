import { SongInterface } from '../API/SongInterface.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';

export class DifficultySelectScene extends AbstractScene {

	constructor(game: Game, private song: SongInterface) {
		super(game);
	}

	public update(): void {
		// Update the level
	}

	public render(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		// 1. Background image (70% darker overlay)
		const backgroundImageBase64 = this.song.backgroundImageBase64 || this.song.coverImageBase64;
		if (backgroundImageBase64) {
			const bgImg = new window.Image();
			bgImg.src = backgroundImageBase64;
			ctx.save();
			ctx.globalAlpha = 1;
			ctx.drawImage(bgImg, 0, 0, width, height);
			ctx.globalAlpha = 0.7;
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, width, height);
			ctx.restore();
		} else {
			ctx.fillStyle = '#222';
			ctx.fillRect(0, 0, width, height);
		}

		// 2. Albumart (cover)
		const coverImageBase64 = this.song.coverImageBase64 || this.song.backgroundImageBase64;
		if (coverImageBase64) {
			const artImg = new window.Image();
			artImg.src = coverImageBase64;
			const artSize = Math.round(Math.min(width, height) * 0.25);
			const artX = width / 2 - artSize / 2;
			const artY = Math.round(height * 0.12);
			ctx.save();
			ctx.beginPath();
			ctx.arc(width/2, artY + artSize/2, artSize/2, 0, Math.PI*2);
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(artImg, artX, artY, artSize, artSize);
			ctx.restore();
		}

		// 3. Song title
		ctx.save();
		ctx.font = `${Math.round(height*0.06)}px Arial`;
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.fillText(this.song.title, width/2, height*0.42);
		ctx.restore();

		// 4. Song artist
		ctx.save();
		ctx.font = `${Math.round(height*0.04)}px Arial`;
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.fillText(this.song.artist, width/2, height*0.50);
		ctx.restore();

		// 5. Builder (smaller)
		if (this.song.builder) {
			ctx.save();
			ctx.font = `${Math.round(height*0.025)}px Arial`;
			ctx.fillStyle = '#ccc';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.fillText(`Mapper: ${this.song.builder}`, width/2, height*0.55);
			ctx.restore();
		}

		// 6. Start button
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

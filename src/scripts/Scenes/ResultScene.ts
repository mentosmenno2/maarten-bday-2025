import { SongInterface } from '../API/SongInterface.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { CollisionHelper } from '../Core/Helpers/CollisionHelper.js';
import { SongSelectScene } from './SongSelectScene.js';

export class ResultScene extends AbstractScene {
	private backgroundImage: HTMLImageElement | null;
	private backButton: {
		x: number;
		y: number;
		w: number;
		h: number;
	};

	constructor(
		game: Game,
		private song: SongInterface,
		private score: number,
	) {
		super(game);

		this.backButton = {
			x: 0,
			y: 0,
			w: 0,
			h: 0,
		};

		const backgroundImageBase64 =
			this.song.backgroundImageBase64 || this.song.coverImageBase64;
		this.backgroundImage = null;
		if (backgroundImageBase64) {
			this.backgroundImage = new Image();
			this.backgroundImage.src = backgroundImageBase64;
		}
	}

	public update(_deltaTime: number, ctx: CanvasRenderingContext2D): void {
		this.updateBackButton(ctx);
		this.handleBackButtonClick();
	}

	private updateBackButton(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		this.backButton = {
			x: Math.round((width - this.backButton.w) / 2),
			y: Math.round(height * 0.7),
			w: Math.round(width - 40),
			h: Math.round(height * 0.08),
		};
	}

	private handleBackButtonClick(): void {
		const inputManager = this.game.getInputManager();
		const clicked = inputManager.isMouseOrFingerJustPressed();
		const clickpos = inputManager.getMouseOrFingerPositions();
		if (
			!clicked ||
			clickpos.length === 0 ||
			!CollisionHelper.boxPosCollide(this.backButton, clickpos[0])
		) {
			return;
		}

		this.game.getInputManager().reset();
		this.game.getSceneManager().replace(new SongSelectScene(this.game));
	}

	public render(ctx: CanvasRenderingContext2D): void {
		this.renderBackgroundImage(ctx);
		this.renderHappyBirthdayText(ctx);
		this.renderScoreText(ctx);
		this.renderScore(ctx);
		this.renderBackButton(ctx);
	}

	private renderBackgroundImage(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		if (this.backgroundImage) {
			ctx.filter = 'blur(10px)';
			ctx.globalAlpha = 1;
			const imageAspectRatio =
				this.backgroundImage.width / this.backgroundImage.height;
			const canvasAspectRatio = width / height;
			if (imageAspectRatio > canvasAspectRatio) {
				const scaledHeight = height;
				const scaledWidth = scaledHeight * imageAspectRatio;
				ctx.drawImage(
					this.backgroundImage,
					(width - scaledWidth) / 2,
					0,
					scaledWidth,
					scaledHeight,
				);
			} else {
				const scaledWidth = width;
				const scaledHeight = scaledWidth / imageAspectRatio;
				ctx.drawImage(
					this.backgroundImage,
					0,
					(height - scaledHeight) / 2,
					scaledWidth,
					scaledHeight,
				);
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

	private renderHappyBirthdayText(ctx: CanvasRenderingContext2D): void {
		const words = [
			'gefeliciteerd',
			'congratulations',
			'verjaardag',
			'birthday',
		];

		const isHappyBirthday = words.some((word) =>
			this.song.title.toLowerCase().includes(word),
		);
		if (!isHappyBirthday) {
			return;
		}

		const { width, height } = ctx.canvas;

		ctx.save();
		let titleFontSize = Math.round(height * 0.08);
		ctx.font = `${titleFontSize}px Arial`;
		let titleWidth = ctx.measureText(this.song.title).width;
		while (titleWidth > width * 0.92 && titleFontSize > 10) {
			titleFontSize--;
			ctx.font = `${titleFontSize}px Arial`;
			titleWidth = ctx.measureText(this.song.title).width;
		}
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.fillText('Gefeliciteerd!', width / 2, height * 0.2);
		ctx.restore();
	}

	private renderScoreText(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		let titleFontSize = Math.round(height * 0.06);
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
		ctx.fillText('Score', width / 2, height * 0.42);
		ctx.restore();
	}

	private renderScore(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		ctx.save();
		let artistFontSize = Math.round(height * 0.04);
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
		ctx.fillText(this.score.toFixed(0), width / 2, height * 0.5);
		ctx.restore();
	}

	private renderBackButton(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.fillStyle = ColorUtils.getRgba(ColorEnum.Black, 0.8);
		ctx.strokeStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.roundRect(
			this.backButton.x,
			this.backButton.y,
			this.backButton.w,
			this.backButton.h,
			this.backButton.h * 0.3,
		);
		ctx.fill();
		ctx.stroke();
		ctx.font = `${Math.round(this.backButton.h * 0.45)}px Arial`;
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(
			'Nieuw nummer kiezen',
			this.backButton.x + this.backButton.w / 2,
			this.backButton.y + this.backButton.h / 2,
		);
		ctx.restore();
	}
}

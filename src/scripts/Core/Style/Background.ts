import { Game } from '../../Game.js';
import { ColorEnum } from './ColorEnum.js';
import { ColorUtils } from './ColorUtils.js';

type Star = { x: number; y: number; radius: number };

export class Background {
	private game: Game;
	private stars: Star[] = [];

	constructor(game: Game) {
		this.game = game;
		this.generateStars();
	}

	public update(): void {}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.save();

		const { width, height } = ctx.canvas;
		const horizonY = height * 0.75;

		// Gradient background from top to horizon
		const gradient = ctx.createLinearGradient(0, 0, 0, horizonY);
		gradient.addColorStop(0, ColorUtils.getHex(ColorEnum.DarkBlue));
		gradient.addColorStop(0.7, ColorUtils.getHex(ColorEnum.Purple));
		gradient.addColorStop(1, ColorUtils.getHex(ColorEnum.Pink));
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, width, horizonY);

		// Floor below horizon
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
		ctx.fillRect(0, horizonY, width, height - horizonY);

		// Stars above the horizon
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		for (const star of this.stars) {
			ctx.beginPath();
			ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
			ctx.fill();
		}

		// Grid on floor
		ctx.strokeStyle = ColorUtils.getHex(ColorEnum.Pink);
		ctx.lineWidth = 1;
		ctx.shadowColor = ColorUtils.getHex(ColorEnum.Pink);
		ctx.shadowBlur = 8;

		const gridSpacing = 40;

		// Horizontal lines
		for (let y = 0; y < 10; y++) {
			const lineY = horizonY + y * gridSpacing;
			ctx.beginPath();
			ctx.moveTo(0, lineY);
			ctx.lineTo(width, lineY);
			ctx.stroke();
		}

		// Vertical lines
		const lines = 30;
		for (let i = 0; i <= lines; i++) {
			const x = (i / lines - 0.5) * 2;
			const startX = width / 2 + x * width;
			const endX = width / 2 + x * 50;
			ctx.beginPath();
			ctx.moveTo(startX, height);
			ctx.lineTo(endX, horizonY);
			ctx.stroke();
		}
		ctx.shadowBlur = 0;
		ctx.shadowColor = 'transparent';

		// Horizon glow (just above horizon)
		const glowGradient = ctx.createLinearGradient(
			0,
			horizonY - 20,
			0,
			horizonY,
		);
		glowGradient.addColorStop(0, ColorUtils.getRgba(ColorEnum.Yellow, 0));
		glowGradient.addColorStop(1, ColorUtils.getRgba(ColorEnum.Yellow, 0.7));
		ctx.fillStyle = glowGradient;
		ctx.fillRect(0, horizonY - 80, width, 80);

		// Text with glow
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

		ctx.restore();
	}

	private generateStars(): void {
		this.stars = [];
		const count = 100;
		const width = this.game.getCanvas().getElement().width;
		const height = this.game.getCanvas().getElement().height * 0.75;

		for (let i = 0; i < count; i++) {
			this.stars.push({
				x: Math.random() * width,
				y: Math.random() * height,
				radius: Math.random() * 2.5,
			});
		}
	}
}

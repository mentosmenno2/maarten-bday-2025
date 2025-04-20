import { Game } from '../../Game.js';

export class Vector2Utils {
	public static toScaledX(actualX: number): number {
		const canvas = Game.getInstance().getCanvas();
		const scaledCanvasWidth = canvas.getScaledWidth();
		const actualCanvasWidth = canvas.getWidth();
		return (actualX / actualCanvasWidth) * scaledCanvasWidth;
	}

	public static toScaledY(actualY: number): number {
		const canvas = Game.getInstance().getCanvas();
		const scaledCanvasHeight = canvas.getScaledHeight();
		const actualCanvasHeight = canvas.getHeight();
		return (actualY / actualCanvasHeight) * scaledCanvasHeight;
	}

	public static toActualX(scaledX: number): number {
		const canvas = Game.getInstance().getCanvas();
		const scaledCanvasWidth = canvas.getScaledWidth();
		const actualCanvasWidth = canvas.getWidth();
		return (scaledX / scaledCanvasWidth) * actualCanvasWidth;
	}

	public static toActualY(scaledY: number): number {
		const canvas = Game.getInstance().getCanvas();
		const scaledCanvasHeight = canvas.getScaledHeight();
		const actualCanvasHeight = canvas.getHeight();
		return (scaledY / scaledCanvasHeight) * actualCanvasHeight;
	}
}

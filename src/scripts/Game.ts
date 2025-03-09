import { Canvas } from './Canvas.js';
import { FPSCounter } from './FPSCounter.js';

export class Game {
	private static instance: Game | null;

	private lastLoopTimestampMillis: number;
	private canvas: Canvas;
	private fpsCounter: FPSCounter;

	private constructor() {
		this.lastLoopTimestampMillis = new Date().getTime();
		this.canvas = new Canvas();
		this.fpsCounter = new FPSCounter();

		this.setup();

		window.requestAnimationFrame(this.loop.bind(this));
	}

	public static getInstance(): Game {
		if (!this.instance) {
			this.instance = new Game();
		}
		return this.instance;
	}

	private setup(): void {
		this.canvas.updateSize();
	}

	private loop(timestampMillis: number): void {
		// Calculate deltaTime
		const deltaTimeMillis = this.lastLoopTimestampMillis
			? timestampMillis - this.lastLoopTimestampMillis
			: 0;
		this.lastLoopTimestampMillis = timestampMillis;

		// Process and draw
		this.process(deltaTimeMillis);
		this.draw();

		window.requestAnimationFrame(this.loop.bind(this));
	}

	private process(deltaTimeMillis: number): void {
		this.canvas.updateSize();
		this.fpsCounter.process(deltaTimeMillis);
	}

	private draw(): void {
		this.fpsCounter.draw();
	}

	public getCanvas(): Canvas {
		return this.canvas;
	}
}

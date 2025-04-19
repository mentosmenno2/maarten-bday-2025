import { Canvas } from './Canvas.js';
import { FPSCounter } from './FPSCounter.js';
import { AbstractScene } from './Scenes/AbstractScene.js';
import { MenuScene } from './Scenes/MenuScene.js';

export class Game {
	private static instance: Game | null;

	private lastLoopTimestampMillis: number;
	private canvas: Canvas;
	private fpsCounter: FPSCounter;
	private currentScene: AbstractScene;

	private constructor() {
		this.lastLoopTimestampMillis = new Date().getTime();
		this.canvas = new Canvas();
		this.fpsCounter = new FPSCounter();
		this.currentScene = new MenuScene(this);

		this.start();
	}

	public static getInstance(): Game {
		if (!this.instance) {
			this.instance = new Game();
		}
		return this.instance;
	}

	private start(): void {
		this.canvas.updateSize();

		window.requestAnimationFrame(this.loop.bind(this));
	}

	private loop(timestampMillis: number): void {
		// Calculate deltaTime
		const deltaTimeMillis = timestampMillis - this.lastLoopTimestampMillis;
		this.lastLoopTimestampMillis = timestampMillis;

		// Process and draw
		this.update(deltaTimeMillis);
		this.render(this.canvas.getContext());

		// New loop
		window.requestAnimationFrame(this.loop.bind(this));
	}

	private update(deltaTimeMillis: number): void {
		this.canvas.updateSize();

		this.currentScene.update(deltaTimeMillis);
		this.fpsCounter.update(deltaTimeMillis);
	}

	private render(ctx: CanvasRenderingContext2D): void {
		this.currentScene.render(ctx);
		this.fpsCounter.render(ctx);
	}

	public getCanvas(): Canvas {
		return this.canvas;
	}

	public getCurrentScene(): AbstractScene {
		return this.currentScene;
	}

	public setCurrentScene(scene: AbstractScene): void {
		this.currentScene = scene;
	}
}

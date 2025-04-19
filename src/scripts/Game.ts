import { Canvas } from './Core/Canvas.js';
import { FPSCounter } from './Core/Debug/FPSCounter.js';
import { GlobalEventHandler } from './Core/GlobalEventHandler.js';
import { Position } from './Core/Position/Position.js';
import { AbstractScene } from './Scenes/AbstractScene.js';
import { StartScene } from './Scenes/StartScene.js';

export class Game {
	private static instance: Game | null;

	private lastLoopTimestampMillis: number;
	private loopTimeAccumulator: number;
	private canvas: Canvas;
	private fpsCounter: FPSCounter;
	private currentScene: AbstractScene;
	private globalEventHandler: GlobalEventHandler;

	private constructor() {
		this.lastLoopTimestampMillis = 0;
		this.loopTimeAccumulator = 0;
		this.canvas = new Canvas();
		this.fpsCounter = new FPSCounter();
		this.currentScene = new StartScene(this);
		this.globalEventHandler = new GlobalEventHandler(this);
	}

	public static getInstance(): Game {
		if (!this.instance) {
			this.instance = new Game();
		}
		return this.instance;
	}

	public start(): void {
		this.canvas.updateSize();
		this.globalEventHandler.addEventListeners();

		window.requestAnimationFrame(this.loop.bind(this));
	}

	private loop(timestampMillis: number): void {
		// Calculate deltaTime
		const deltaTimeMillis = timestampMillis - this.lastLoopTimestampMillis;
		this.lastLoopTimestampMillis = timestampMillis;

		// Skip loop iteration if running faster than max FPS
		this.loopTimeAccumulator += deltaTimeMillis;
		const maxFPS = Number.MAX_SAFE_INTEGER;
		const minDeltaTimeMillis = 1000 / maxFPS;
		if (this.loopTimeAccumulator < minDeltaTimeMillis) {
			// New loop
			window.requestAnimationFrame(this.loop.bind(this));
			return;
		}

		// Process and draw
		this.update(Math.max(deltaTimeMillis, minDeltaTimeMillis));
		this.render(this.canvas.getContext());
		this.loopTimeAccumulator = 0;

		// New loop
		window.requestAnimationFrame(this.loop.bind(this));
	}

	private update(deltaTimeMillis: number): void {
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

	public handleClick(position: Position): void {
		if (this.currentScene.handleClick) {
			this.currentScene.handleClick(position);
		}
	}

	public handleMouseMove(position: Position): void {
		if (this.currentScene.handleMouseMove) {
			this.currentScene.handleMouseMove(position);
		}
	}
}

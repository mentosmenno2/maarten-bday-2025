import { Canvas } from './Core/Canvas.js';
import { FPSCounter } from './Core/Debug/FPSCounter.js';
import { GlobalEventHandler } from './Core/GlobalEventHandler.js';
import { ActualVector2 } from './Core/Position/ActualVector2.js';
import { SceneManager } from './SceneManager.js';
import { StartScene } from './Scenes/StartScene.js';

export class Game {
	private static instance: Game | null;

	private lastLoopTimestampMillis: number;
	private loopTimeAccumulator: number;
	private canvas: Canvas;
	private fpsCounter: FPSCounter;
	private sceneManager: SceneManager;
	private globalEventHandler: GlobalEventHandler;

	private constructor() {
		this.lastLoopTimestampMillis = 0;
		this.loopTimeAccumulator = 0;
		this.canvas = new Canvas();
		this.canvas.updateSize();
		this.fpsCounter = new FPSCounter();
		this.sceneManager = new SceneManager(new StartScene(this));
		this.globalEventHandler = new GlobalEventHandler(this);
	}

	public static getInstance(): Game {
		if (!this.instance) {
			this.instance = new Game();
		}
		return this.instance;
	}

	public start(): void {
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
		this.sceneManager.update(deltaTimeMillis);
		this.fpsCounter.update(deltaTimeMillis);
	}

	private render(ctx: CanvasRenderingContext2D): void {
		// Reset
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Render
		this.sceneManager.render(ctx);
		this.fpsCounter.render(ctx);
	}

	public getSceneManager(): SceneManager {
		return this.sceneManager;
	}

	public getCanvas(): Canvas {
		return this.canvas;
	}

	public handleClick(vector2: ActualVector2): void {
		this.sceneManager.handleClick(vector2);
	}

	public handleMouseMove(vector2: ActualVector2): void {
		this.sceneManager.handleMouseMove(vector2);
	}
}

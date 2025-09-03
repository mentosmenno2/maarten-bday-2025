import { AssetManager } from './Core/Assets/AssetManager.js';
import { Canvas } from './Core/Canvas.js';
import { FPSCounter } from './Core/Debug/FPSCounter.js';
import { GlobalEventHandler } from './Core/GlobalEventHandler.js';
import { InputManager } from './Core/InputManager.js';
import { SceneManager } from './SceneManager.js';
import { StartScene } from './Scenes/StartScene.js';

export class Game {
	private static instance: Game | null;

	private lastLoopTimestampMillis: number;
	private loopTimeAccumulator: number;
	private assetManager: AssetManager;
	private inputManager: InputManager;
	private canvas: Canvas;
	private preRenderCanvas: Canvas;
	private fpsCounter: FPSCounter;
	private sceneManager: SceneManager;
	private globalEventHandler: GlobalEventHandler;

	private constructor() {
		this.lastLoopTimestampMillis = 0;
		this.loopTimeAccumulator = 0;
		this.assetManager = new AssetManager();
		this.inputManager = new InputManager(this);
		this.canvas = new Canvas('game');
		this.canvas.updateSize();
		this.preRenderCanvas = new Canvas('pre-render');
		this.preRenderCanvas.updateSize();
		this.fpsCounter = new FPSCounter();
		this.sceneManager = new SceneManager(new StartScene(this));
		this.globalEventHandler = new GlobalEventHandler(this);
		return;
	}

	public static getInstance(): Game {
		if (!this.instance) {
			this.instance = new Game();
		}
		return this.instance;
	}

	public start(): void {
		this.globalEventHandler.addEventListeners();
		this.inputManager.addEventListeners();

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
		const prerenderContext = this.preRenderCanvas.getContext();
		this.update(
			Math.max(deltaTimeMillis, minDeltaTimeMillis),
			prerenderContext,
		);
		this.render(prerenderContext);
		this.loopTimeAccumulator = 0;

		// Reset just pressed
		this.inputManager.resetJustPressed();

		// New loop
		window.requestAnimationFrame(this.loop.bind(this));
	}

	private update(deltaTimeMillis: number, ctx: CanvasRenderingContext2D): void {
		this.sceneManager.update(deltaTimeMillis, ctx);
		this.fpsCounter.update(deltaTimeMillis);
	}

	private render(prerenderCtx: CanvasRenderingContext2D): void {
		// Reset prerender canvas
		prerenderCtx.clearRect(
			0,
			0,
			prerenderCtx.canvas.width,
			prerenderCtx.canvas.height,
		);

		// Render to prerender canvas
		this.sceneManager.render(prerenderCtx);
		this.fpsCounter.render(prerenderCtx);

		// Copy prerender canvas to main canvas
		const mainCtx = this.canvas.getContext();
		mainCtx.drawImage(
			prerenderCtx.canvas,
			0,
			0,
			prerenderCtx.canvas.width,
			prerenderCtx.canvas.height,
			0,
			0,
			mainCtx.canvas.width,
			mainCtx.canvas.height,
		);
	}

	public getSceneManager(): SceneManager {
		return this.sceneManager;
	}

	public getInputManager(): InputManager {
		return this.inputManager;
	}

	public getAssetManager(): AssetManager {
		return this.assetManager;
	}

	public getCanvas(): Canvas {
		return this.canvas;
	}

	public getPreRenderCanvas(): Canvas {
		return this.preRenderCanvas;
	}
}

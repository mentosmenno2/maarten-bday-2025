import { AssetManager } from './Core/Assets/AssetManager.js';
import { Canvas } from './Core/Canvas.js';
import { FPSCounter } from './Core/Debug/FPSCounter.js';
import { GlobalEventHandler } from './Core/GlobalEventHandler.js';
import { InputManager } from './Core/InputManager.js';
import { SceneManager } from './SceneManager.js';
import { StartScene } from './Scenes/StartScene.js';
export class Game {
    static instance;
    lastLoopTimestampMillis;
    loopTimeAccumulator;
    assetManager;
    inputManager;
    canvas;
    preRenderCanvas;
    fpsCounter;
    sceneManager;
    globalEventHandler;
    constructor() {
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
    static getInstance() {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    }
    start() {
        this.globalEventHandler.addEventListeners();
        this.inputManager.addEventListeners();
        window.requestAnimationFrame(this.loop.bind(this));
    }
    loop(timestampMillis) {
        const deltaTimeMillis = timestampMillis - this.lastLoopTimestampMillis;
        this.lastLoopTimestampMillis = timestampMillis;
        this.loopTimeAccumulator += deltaTimeMillis;
        const maxFPS = Number.MAX_SAFE_INTEGER;
        const minDeltaTimeMillis = 1000 / maxFPS;
        if (this.loopTimeAccumulator < minDeltaTimeMillis) {
            window.requestAnimationFrame(this.loop.bind(this));
            return;
        }
        const prerenderContext = this.preRenderCanvas.getContext();
        this.update(Math.max(deltaTimeMillis, minDeltaTimeMillis), prerenderContext);
        this.render(prerenderContext);
        this.loopTimeAccumulator = 0;
        this.inputManager.resetJustPressed();
        window.requestAnimationFrame(this.loop.bind(this));
    }
    update(deltaTimeMillis, ctx) {
        this.sceneManager.update(deltaTimeMillis, ctx);
        this.fpsCounter.update(deltaTimeMillis);
    }
    render(prerenderCtx) {
        prerenderCtx.clearRect(0, 0, prerenderCtx.canvas.width, prerenderCtx.canvas.height);
        this.sceneManager.render(prerenderCtx);
        this.fpsCounter.render(prerenderCtx);
        const mainCtx = this.canvas.getContext();
        mainCtx.drawImage(prerenderCtx.canvas, 0, 0, prerenderCtx.canvas.width, prerenderCtx.canvas.height, 0, 0, mainCtx.canvas.width, mainCtx.canvas.height);
    }
    getSceneManager() {
        return this.sceneManager;
    }
    getInputManager() {
        return this.inputManager;
    }
    getAssetManager() {
        return this.assetManager;
    }
    getCanvas() {
        return this.canvas;
    }
    getPreRenderCanvas() {
        return this.preRenderCanvas;
    }
}

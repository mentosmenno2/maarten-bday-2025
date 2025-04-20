import { ActualVector2 } from './Core/Position/ActualVector2.js';
import { AbstractScene } from './Scenes/AbstractScene.js';

export class SceneManager {
	private sceneStack: AbstractScene[] = [];

	constructor(scene: AbstractScene) {
		this.push(scene);
	}

	public getCurrent(): AbstractScene | null {
		return this.sceneStack.length > 0
			? this.sceneStack[this.sceneStack.length - 1]
			: null;
	}

	public push(scene: AbstractScene): void {
		this.sceneStack.push(scene);
	}

	public pop(): void {
		this.sceneStack.pop();
	}

	public replace(scene: AbstractScene): void {
		this.sceneStack = [scene];
	}

	public reset(): void {
		this.sceneStack = [];
	}

	public update(dt: number): void {
		const current = this.getCurrent();
		if (current) current.update(dt);
	}

	public render(ctx: CanvasRenderingContext2D): void {
		const current = this.getCurrent();
		if (current) current.render(ctx);
	}

	public handleClick(vector2: ActualVector2): void {
		const current = this.getCurrent();
		if (current && current.handleClick) current.handleClick(vector2);
	}

	public handleMouseMove(vector2: ActualVector2): void {
		const current = this.getCurrent();
		if (current && current.handleMouseMove) current.handleMouseMove(vector2);
	}
}

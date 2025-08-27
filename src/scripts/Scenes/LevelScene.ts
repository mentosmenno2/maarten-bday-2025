import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';

export class LevelScene extends AbstractScene {

	constructor(game: Game) {
		super(game);
	}


	public update(): void {
		// Update the level
	}

	public render(_ctx: CanvasRenderingContext2D): void {
		// Render the level
	}
}

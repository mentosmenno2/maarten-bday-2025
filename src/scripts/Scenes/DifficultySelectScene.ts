import { SongInterface } from '../API/SongInterface.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';

export class DifficultySelectScene extends AbstractScene {

	constructor(game: Game, private song: SongInterface) {
		super(game);
	}

	public update(): void {
		// Update the level
	}

	public render(_ctx: CanvasRenderingContext2D): void {
		// Render the level
	}
}

import { Game } from '../Game.js';

export abstract class AbstractScene {
	protected game: Game;

	constructor(game: Game) {
		this.game = game;

		// Reset cursor to default
		this.game.getCanvas().getElement().style.cursor = 'default';
	}

	public abstract update(deltaTime: number): void;

	public abstract render(ctx: CanvasRenderingContext2D): void;
}

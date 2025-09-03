import { Game } from '../../Game.js';

export abstract class AbstractGameObject {
	protected game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	public abstract update(
		deltaTime: number,
		ctx: CanvasRenderingContext2D,
	): void;

	public abstract render(ctx: CanvasRenderingContext2D): void;
}

import { ActualVector2 } from '../Core/Position/ActualVector2.js';
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

	public handleClick?(vector2: ActualVector2): void;

	public handleMouseMove?(vector2: ActualVector2): void;
}

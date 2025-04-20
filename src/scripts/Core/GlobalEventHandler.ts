import { Game } from './../Game.js';
import { ActualVector2 } from './Position/ActualVector2.js';

export class GlobalEventHandler {
	private game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	public addEventListeners(): void {
		window.addEventListener('resize', this.onResize.bind(this));
		window.addEventListener('click', this.onClick.bind(this));
		window.addEventListener('mousemove', this.onMouseMove.bind(this));
	}

	private onResize(): void {
		this.game.getCanvas().updateSize();
	}

	private onClick(e: PointerEvent): void {
		const rect = this.game.getCanvas().getElement().getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		this.game.handleClick(new ActualVector2(x, y));
	}

	private onMouseMove(e: PointerEvent): void {
		const rect = this.game.getCanvas().getElement().getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		this.game.handleMouseMove(new ActualVector2(x, y));
	}
}

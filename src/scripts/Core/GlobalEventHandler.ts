import { Game } from './../Game.js';

export class GlobalEventHandler {
	private game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	public addEventListeners(): void {
		window.addEventListener('resize', this.onResize.bind(this));
	}

	private onResize(): void {
		this.game.getCanvas().updateSize();
		this.game.getPreRenderCanvas().updateSize();
	}
}

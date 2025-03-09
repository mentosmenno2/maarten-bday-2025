export class Game {
	private static instance: Game | null;

	private constructor() {}

	public static getInstance(): Game {
		if (!this.instance) {
			this.instance = new Game();
		}
		return this.instance;
	}
}

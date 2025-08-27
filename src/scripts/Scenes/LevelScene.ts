import { SongInterface } from '../API/SongInterface.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { StartScene } from './StartScene.js';

export class LevelScene extends AbstractScene {

	private audio: HTMLAudioElement;

	constructor(game: Game, private song: SongInterface, private difficultyIndex: number) {
		super(game);

		this.audio = document.createElement('audio');
		if (this.song.audioBase64) {
			const srcElement = document.createElement('source');
			srcElement.src = this.song.audioBase64;
			this.audio.appendChild(srcElement);
		}
		this.audio.volume = 1;
		this.audio.preload = 'auto';
		this.audio.load();
	}

	public update(): void {

		// Play audio when ready
		if ( this.audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA && this.audio.paused ) {
			this.audio.play();
		}

		// End when audio finished
		if ( this.audio.ended ) {
			this.game.getInputManager().reset();
			this.game.getSceneManager().replace( new StartScene(this.game) );
		}
	}

	public render(_ctx: CanvasRenderingContext2D): void {
		// Render the level
	}
}

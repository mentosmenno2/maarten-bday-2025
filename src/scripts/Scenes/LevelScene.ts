import { SongInterface } from '../API/SongInterface.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { StartScene } from './StartScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';

export class LevelScene extends AbstractScene {

	private audio: HTMLAudioElement;
	private hitzoneLeft: {
		x: number,
		y: number,
		w: number,
		h: number
	}
	private hitzoneRight: {
		x: number,
		y: number,
		w: number,
		h: number
	}
	private targets: {
		x: number,
		y: number,
		w: number,
		h: number,
		position: 'LEFT'|'RIGHT',
		time: number,
		hit?: boolean
	}[] = [];
	private score: number = 0;

	constructor(game: Game, private song: SongInterface, private difficultyIndex: number) {
		super(game);

		const apples = [{seeds:false}];
		for (let i = 0; i < apples.length; i++) {
			let apple = apples[i];
			apple.seeds = true;
		}

		// Load difficulty
		const chosenDifficulty = this.song.difficulties[this.difficultyIndex];
		if (! chosenDifficulty) {
			return; // Defuq, hackerman
		}

		// Create hit zones
		this.hitzoneLeft = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};
		this.hitzoneRight = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};

		// Load targets
		for (const target of chosenDifficulty.targets) {
			this.targets.push({
				x: 0,
				y: 0,
				w: 0,
				h: 0,
				position: target.position,
				time: target.time,
				hit: false
			});
		}

		// Create and load audio
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

	public update(_deltaTime: number, ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		// Play audio when ready
		if ( this.audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA && this.audio.paused ) {
			this.audio.play();
		}

		// End when audio finished
		if ( this.audio.ended ) {
			this.game.getInputManager().reset();
			this.game.getSceneManager().replace( new StartScene(this.game) );
		}

		// Determine width, height, x and y for hitzones
		const hitzoneCenterY = height * 0.7;
		const hitzoneMargin = height * 0.05;

		this.hitzoneLeft.w = width * 0.5;
		this.hitzoneLeft.h = 2 * hitzoneMargin;
		this.hitzoneLeft.x = 0;
		this.hitzoneLeft.y = hitzoneCenterY - this.hitzoneLeft.h / 2;

		this.hitzoneRight.w = width * 0.5;
		this.hitzoneRight.h = 2 * hitzoneMargin;
		this.hitzoneRight.x = width * 0.5;
		this.hitzoneRight.y = hitzoneCenterY - this.hitzoneRight.h / 2;

		const audioCurrentTimeInMilliseconds = this.audio.currentTime * 1000;
		const appearWindow = 2000; // 2 seconds

		for (let i = 0; i < this.targets.length; i++) {
			const target = this.targets[i];
			target.h = height * 0.05;
			target.w = target.h;

			target.x = target.position === 'LEFT' ? ( ( this.hitzoneLeft.x + this.hitzoneLeft.w / 2 ) - target.w / 2 ) : ( ( this.hitzoneRight.x + this.hitzoneRight.w / 2 ) - target.w / 2 );

			// Calculate target.y so that it moves from top to hitzone over 2 seconds window
			const startY = 0 - target.h / 2;
			const endY = hitzoneCenterY - target.h / 2;
			const timeUntilTarget = target.time - audioCurrentTimeInMilliseconds;
			const progress = timeUntilTarget / appearWindow * -1;
			target.y = startY + ( hitzoneCenterY ) + (endY - startY) * progress;
		}
	}

	public render(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;

		// Background
		ctx.save();
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Black);
		ctx.fillRect(0, 0, width, height);
		ctx.restore();

		// Draw hit zones
		ctx.save();
		ctx.globalAlpha = 0.12;
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Pink);
		ctx.fillRect(this.hitzoneLeft.x, this.hitzoneLeft.y, this.hitzoneLeft.w, this.hitzoneLeft.h);
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
		ctx.fillRect(this.hitzoneRight.x, this.hitzoneRight.y, this.hitzoneRight.w, this.hitzoneRight.h);
		ctx.restore();

		// Draw targets
		for (const target of this.targets) {
			ctx.save();
			ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
			ctx.fillRect(target.x, target.y, target.w, target.h);
			ctx.restore();
		}

		// Draw score
		ctx.save();
		ctx.font = `${Math.round(height*0.045)}px Arial`;
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText(`Score: ${this.score}`, 24, 18);
		ctx.restore();
	}
}

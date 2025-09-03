import { SongInterface } from '../API/SongInterface.js';
import { Game } from '../Game.js';
import { AbstractScene } from './AbstractScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { CollisionHelper } from '../Core/Helpers/CollisionHelper.js';
import { ResultScene } from './ResultScene.js';
import { Duck } from '../Core/Assets/Images/Duck.js';

export class LevelScene extends AbstractScene {
	private audio: HTMLAudioElement;
	private hitzoneLeft: {
		x: number;
		y: number;
		w: number;
		h: number;
		pressedDown: boolean;
	};
	private hitzoneRight: {
		x: number;
		y: number;
		w: number;
		h: number;
		pressedDown: boolean;
	};
	private targets: {
		x: number;
		y: number;
		w: number;
		h: number;
		position: 'LEFT' | 'RIGHT';
		time: number;
		hit: boolean;
		hittable: boolean;
	}[] = [];
	private score: number = 0;
	private combo: number = 0;
	private scoreMultiplier: number = 1;

	private progressBar: {
		x: number;
		y: number;
		w: number;
		h: number;
		progress: number;
		duck: Duck;
	};

	constructor(
		game: Game,
		private song: SongInterface,
		private difficultyIndex: number,
	) {
		super(game);

		// Load difficulty
		const chosenDifficulty = this.song.difficulties[this.difficultyIndex];
		if (!chosenDifficulty) {
			return; // Defuq, hackerman
		}

		// Create hit zones
		this.hitzoneLeft = {
			x: 0,
			y: 0,
			w: 0,
			h: 0,
			pressedDown: false,
		};
		this.hitzoneRight = {
			x: 0,
			y: 0,
			w: 0,
			h: 0,
			pressedDown: false,
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
				hit: false,
				hittable: true,
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

		// Create progress bar
		this.progressBar = {
			x: 0,
			y: 0,
			w: 0,
			h: 0,
			progress: 0,
			duck: this.game.getAssetManager().images.duck,
		};
	}

	public update(_deltaTime: number, ctx: CanvasRenderingContext2D): void {
		// End when audio finished
		if (this.audio.ended) {
			this.game.getInputManager().reset();
			this.game
				.getSceneManager()
				.replace(new ResultScene(this.game, this.song, this.score));
			return;
		}

		// Play audio when ready
		if (
			this.audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA &&
			this.audio.paused
		) {
			this.audio.play();
		}

		this.updateHitzone(ctx);
		this.updateTargets(ctx);
		this.updateProgressBar(ctx);
	}

	private updateScoreMultiplier(hit: boolean): void {
		if (!hit) {
			this.combo = 0; // Reset combo on miss
			this.scoreMultiplier = 1; // Reset multiplier on miss
			return;
		}

		this.combo++;
		if (this.combo >= 30) {
			this.scoreMultiplier = 8;
		} else if (this.combo >= 20) {
			this.scoreMultiplier = 4;
		} else if (this.combo >= 10) {
			this.scoreMultiplier = 2;
		} else {
			this.scoreMultiplier = 1;
		}
	}
	private updateHitzone(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;
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

		this.hitzoneLeft.pressedDown =
			this.getCurrentActiveUserAction(ctx).has('LEFT');
		this.hitzoneRight.pressedDown =
			this.getCurrentActiveUserAction(ctx).has('RIGHT');
	}

	private updateTargets(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;
		const hitzoneCenterY = this.hitzoneLeft.y + this.hitzoneLeft.h / 2;
		const audioCurrentTimeInMilliseconds = this.audio.currentTime * 1000;
		const appearWindowMillis = 2000;

		for (let i = 0; i < this.targets.length; i++) {
			// Set size and position
			const target = this.targets[i];
			target.h = height * 0.02;
			target.w = this.hitzoneLeft.w - width * 0.1;
			target.x =
				target.position === 'LEFT'
					? this.hitzoneLeft.x + this.hitzoneLeft.w / 2 - target.w / 2
					: this.hitzoneRight.x + this.hitzoneRight.w / 2 - target.w / 2;
			const startY = 0 - target.h / 2;
			const endY = hitzoneCenterY - target.h / 2;
			const timeUntilTarget = target.time - audioCurrentTimeInMilliseconds;
			const progress = (timeUntilTarget / appearWindowMillis) * -1;
			target.y = startY + hitzoneCenterY + (endY - startY) * progress;

			// If target passes hitzone, treat as missed
			if (
				!target.hit &&
				target.hittable &&
				target.y > this.hitzoneLeft.y + this.hitzoneLeft.h
			) {
				target.hittable = false;
				this.score = Math.max(0, this.score - 100);
				this.updateScoreMultiplier(false);
			}
		}

		// Check for hits on left side
		const closestLeftTargetIndex =
			this.getClosestTargetIndexToCurrentAudioTime('LEFT');
		const closestLeftTarget =
			closestLeftTargetIndex !== null
				? this.targets[closestLeftTargetIndex]
				: null;
		if (
			closestLeftTarget &&
			this.getCurrentJustPressedUserAction(ctx).has('LEFT')
		) {
			const leftTargetHit = CollisionHelper.boxBoxCollide(
				closestLeftTarget,
				this.hitzoneLeft,
			);
			if (leftTargetHit) {
				closestLeftTarget.hit = true;
				closestLeftTarget.hittable = false;
				this.score += 100 * this.scoreMultiplier;
			} else {
				this.score = Math.max(0, this.score - 100);
			}
			this.updateScoreMultiplier(leftTargetHit);
		}

		// Check for hits on right side
		const closestRightTargetIndex =
			this.getClosestTargetIndexToCurrentAudioTime('RIGHT');
		const closestRightTarget =
			closestRightTargetIndex !== null
				? this.targets[closestRightTargetIndex]
				: null;
		if (
			closestRightTarget &&
			this.getCurrentJustPressedUserAction(ctx).has('RIGHT')
		) {
			const rightTargetHit = CollisionHelper.boxBoxCollide(
				closestRightTarget,
				this.hitzoneRight,
			);
			if (rightTargetHit) {
				closestRightTarget.hit = true;
				closestRightTarget.hittable = false;
				this.score += 100 * this.scoreMultiplier;
			} else {
				this.score = Math.max(0, this.score - 100);
			}
			this.updateScoreMultiplier(rightTargetHit);
		}
	}

	private updateProgressBar(ctx: CanvasRenderingContext2D): void {
		const { width, height } = ctx.canvas;
		this.progressBar.x = 24;
		this.progressBar.y = height - 24;
		this.progressBar.w = width - 48;
		this.progressBar.h = 12;

		this.progressBar.progress = this.audio.currentTime / this.audio.duration;
	}

	private getClosestTargetIndexToCurrentAudioTime(
		position: 'LEFT' | 'RIGHT',
	): number | null {
		const audioCurrentTimeInMilliseconds = this.audio.currentTime * 1000;

		let closestTargetIndex = null;
		let closestTargetTimeDiff = Infinity;
		for (let i = 0; i < this.targets.length; i++) {
			const target = this.targets[i];
			if (target.position !== position || !target.hittable) continue;

			const targetTime = target.time;
			const timeDiff = Math.abs(targetTime - audioCurrentTimeInMilliseconds);

			if (timeDiff < closestTargetTimeDiff) {
				closestTargetTimeDiff = timeDiff;
				closestTargetIndex = i;
			}
		}

		return closestTargetIndex;
	}

	private getCurrentJustPressedUserAction(
		ctx: CanvasRenderingContext2D,
	): Set<'LEFT' | 'RIGHT'> {
		const inputManager = this.game.getInputManager();
		const { width, height } = ctx.canvas;

		const inputs = new Set<'LEFT' | 'RIGHT'>();

		// Check touch or click
		const clickOrFingerPos = inputManager.getMouseOrFingerPositions();
		if (
			inputManager.isMouseOrFingerJustPressed() &&
			clickOrFingerPos.length !== 0
		) {
			clickOrFingerPos.forEach((fingerPos: { x: number; y: number }) => {
				if (
					CollisionHelper.boxPosCollide(
						{ x: 0, y: 0, w: width / 2, h: height },
						fingerPos,
					)
				) {
					inputs.add('LEFT');
				}
				if (
					CollisionHelper.boxPosCollide(
						{ x: width / 2, y: 0, w: width / 2, h: height },
						fingerPos,
					)
				) {
					inputs.add('RIGHT');
				}
			});
		}

		// Check keyboard arrows
		if (inputManager.isKeyJustPressed('ArrowLeft')) {
			inputs.add('LEFT');
		}
		if (inputManager.isKeyJustPressed('ArrowRight')) {
			inputs.add('RIGHT');
		}

		// Check keyboard AD
		if (inputManager.isKeyJustPressed('KeyA')) {
			inputs.add('LEFT');
		}
		if (inputManager.isKeyJustPressed('KeyD')) {
			inputs.add('RIGHT');
		}

		return inputs;
	}

	private getCurrentActiveUserAction(
		ctx: CanvasRenderingContext2D,
	): Set<'LEFT' | 'RIGHT'> {
		const inputManager = this.game.getInputManager();
		const { width, height } = ctx.canvas;

		const inputs = new Set<'LEFT' | 'RIGHT'>();

		// Check touch or click
		const clickOrFingerPos = inputManager.getMouseOrFingerPositions();
		if (inputManager.isMouseOrFingerDown() && clickOrFingerPos.length !== 0) {
			clickOrFingerPos.forEach((fingerPos: { x: number; y: number }) => {
				if (
					CollisionHelper.boxPosCollide(
						{ x: 0, y: 0, w: width / 2, h: height },
						fingerPos,
					)
				) {
					inputs.add('LEFT');
				}
				if (
					CollisionHelper.boxPosCollide(
						{ x: width / 2, y: 0, w: width / 2, h: height },
						fingerPos,
					)
				) {
					inputs.add('RIGHT');
				}
			});
		}

		// Check keyboard arrows
		if (inputManager.isKeyDown('ArrowLeft')) {
			inputs.add('LEFT');
		}
		if (inputManager.isKeyDown('ArrowRight')) {
			inputs.add('RIGHT');
		}

		// Check keyboard AD
		if (inputManager.isKeyDown('KeyA')) {
			inputs.add('LEFT');
		}
		if (inputManager.isKeyDown('KeyD')) {
			inputs.add('RIGHT');
		}

		return inputs;
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
		ctx.globalAlpha = this.hitzoneLeft.pressedDown ? 1 : 0.5;
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.Pink);
		ctx.fillRect(
			this.hitzoneLeft.x,
			this.hitzoneLeft.y,
			this.hitzoneLeft.w,
			this.hitzoneLeft.h,
		);
		ctx.globalAlpha = this.hitzoneRight.pressedDown ? 1 : 0.5;
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
		ctx.fillRect(
			this.hitzoneRight.x,
			this.hitzoneRight.y,
			this.hitzoneRight.w,
			this.hitzoneRight.h,
		);
		ctx.restore();

		// Draw targets
		for (const target of this.targets) {
			ctx.save();
			ctx.fillStyle = ColorUtils.getHex(
				target.hit ? ColorEnum.Green : ColorEnum.White,
			);
			ctx.globalAlpha = target.hittable ? 1 : 0.5;
			ctx.fillRect(target.x, target.y, target.w, target.h);
			ctx.restore();
		}

		// Draw score
		ctx.save();
		ctx.font = `${Math.round(height * 0.045)}px Arial`;
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText(`Score: ${this.score}`, 24, 18);
		ctx.restore();

		// Draw multiplier in right corner
		ctx.save();
		ctx.font = `${Math.round(height * 0.045)}px Arial`;
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText(
			`Bonus: ${this.scoreMultiplier}x`,
			24,
			18 + Math.round(height * 0.045),
		);
		ctx.restore();

		// Render progress bar
		ctx.save();
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
		ctx.fillRect(
			this.progressBar.x,
			this.progressBar.y,
			this.progressBar.w,
			this.progressBar.h,
		);
		ctx.fillStyle = ColorUtils.getHex(ColorEnum.LightBlue);
		ctx.fillRect(
			this.progressBar.x,
			this.progressBar.y,
			this.progressBar.w * this.progressBar.progress,
			this.progressBar.h,
		);
		ctx.restore();
		if (this.progressBar.duck.isLoaded()) {
			ctx.save();
			const duckX =
				this.progressBar.x +
				this.progressBar.w * this.progressBar.progress -
				12;
			const duckY = this.progressBar.y + this.progressBar.h / 2 - 12;
			ctx.scale(-1, 1);
			ctx.drawImage(
				this.progressBar.duck.getElement(),
				-duckX - 24,
				duckY,
				24,
				24,
			);
			ctx.restore();
		}
	}
}

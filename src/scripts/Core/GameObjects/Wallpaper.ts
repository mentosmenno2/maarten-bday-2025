import { Game } from "../../Game.js";
import { Wallpaper as WallpaperAsset } from "../Assets/Images/Wallpaper.js";
import { AbstractGameObject } from "./AbstractGameObject.js";

export class Wallpaper extends AbstractGameObject {
	private asset: WallpaperAsset;

	private x: number;
	private y: number;
	private w: number;
	private h: number;

	public constructor(game: Game) {
		super(game);
		this.asset = game.getAssetManager().wallpaper;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
	}

	public update(_deltaTime: number, _ctx: CanvasRenderingContext2D): void {
		const imageAspectRatio = this.asset.getElement().width / this.asset.getElement().height;
		const canvasAspectRatio = _ctx.canvas.width / _ctx.canvas.height;

		if (imageAspectRatio > canvasAspectRatio) {
			this.h = _ctx.canvas.height;
			this.w = _ctx.canvas.height * imageAspectRatio;
		} else {
			this.w = _ctx.canvas.width;
			this.h = _ctx.canvas.width / imageAspectRatio;
		}
		this.x = (_ctx.canvas.width - this.w) / 2;
		this.y = (_ctx.canvas.height - this.h) / 2;
	}

	public render(ctx: CanvasRenderingContext2D): void {
		if ( ! this.asset.isLoaded() ) {
			return;
		}
		ctx.save();
		ctx.drawImage(this.asset.getElement(), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}

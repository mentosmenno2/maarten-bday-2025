import { AbstractGameObject } from './AbstractGameObject.js';
export class Wallpaper extends AbstractGameObject {
    asset;
    x;
    y;
    w;
    h;
    constructor(game) {
        super(game);
        this.asset = game.getAssetManager().images.wallpaper;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
    }
    update(_deltaTime, _ctx) {
        const imageAspectRatio = this.asset.getElement().width / this.asset.getElement().height;
        const canvasAspectRatio = _ctx.canvas.width / _ctx.canvas.height;
        if (imageAspectRatio > canvasAspectRatio) {
            this.h = _ctx.canvas.height;
            this.w = _ctx.canvas.height * imageAspectRatio;
        }
        else {
            this.w = _ctx.canvas.width;
            this.h = _ctx.canvas.width / imageAspectRatio;
        }
        this.x = (_ctx.canvas.width - this.w) / 2;
        this.y = (_ctx.canvas.height - this.h) / 2;
    }
    render(ctx) {
        if (!this.asset.isLoaded()) {
            return;
        }
        ctx.save();
        ctx.drawImage(this.asset.getElement(), this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}

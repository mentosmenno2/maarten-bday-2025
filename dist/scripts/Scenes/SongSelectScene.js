import { AbstractScene } from './AbstractScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { CollisionHelper } from '../Core/Helpers/CollisionHelper.js';
import { ApiClient } from '../API/ApiClient.js';
import { DifficultySelectScene } from './DifficultySelectScene.js';
import { Wallpaper } from '../Core/GameObjects/Wallpaper.js';
export class SongSelectScene extends AbstractScene {
    wallpaper;
    selectSongButton;
    statusText;
    fileInput;
    constructor(game) {
        super(game);
        this.wallpaper = new Wallpaper(game);
        this.selectSongButton = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            text: 'Bestand uploaden',
            textLoading: 'Laden...',
            loading: false,
            fontSize: 0,
            fontFamily: 'Arial',
            padding: 10,
        };
        this.statusText = {
            x: 0,
            y: 0,
            fontSize: 0,
            fontFamily: 'Arial',
            text: 'Upload OSU of BeatSaber beatmap',
        };
        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = '.osz,.zip';
        this.fileInput.onchange = this.handleFileInputChange.bind(this);
    }
    update(deltaTime, ctx) {
        this.wallpaper.update(deltaTime, ctx);
        this.updateSongSelectButton(ctx);
        this.updateStatusText(ctx);
        this.handleSongSelectButtonClick();
    }
    updateSongSelectButton(ctx) {
        ctx.save();
        this.selectSongButton.fontSize = ctx.canvas.height * 0.05;
        ctx.font = `${this.selectSongButton.fontSize}px ${this.selectSongButton.fontFamily}`;
        const textMetrics = ctx.measureText(this.selectSongButton.text);
        this.selectSongButton.w =
            textMetrics.width + this.selectSongButton.padding * 2;
        this.selectSongButton.h =
            this.selectSongButton.fontSize + this.selectSongButton.padding * 2;
        this.selectSongButton.x = (ctx.canvas.width - this.selectSongButton.w) / 2;
        this.selectSongButton.y = (ctx.canvas.height - this.selectSongButton.h) / 2;
        ctx.restore();
    }
    updateStatusText(ctx) {
        ctx.save();
        this.statusText.fontSize = ctx.canvas.height * 0.02;
        ctx.font = `${this.statusText.fontSize}px ${this.statusText.fontFamily}`;
        const textMetrics = ctx.measureText(this.statusText.text);
        this.statusText.x = (ctx.canvas.width - textMetrics.width) / 2;
        this.statusText.y =
            (ctx.canvas.height - this.selectSongButton.h) / 2 -
                ctx.canvas.height * 0.05;
        ctx.restore();
    }
    handleSongSelectButtonClick() {
        const inputManager = this.game.getInputManager();
        const clicked = inputManager.isMouseOrFingerJustPressed();
        const clickpos = inputManager.getMouseOrFingerPositions();
        if (this.selectSongButton.loading ||
            !clicked ||
            clickpos.length === 0 ||
            !CollisionHelper.boxPosCollide(this.selectSongButton, clickpos[0])) {
            return;
        }
        this.fileInput.click();
    }
    render(ctx) {
        this.wallpaper.render(ctx);
        this.renderSongSelectButton(ctx);
        this.renderStatusText(ctx);
    }
    renderSongSelectButton(ctx) {
        ctx.save();
        ctx.fillStyle = ColorUtils.getHex(ColorEnum.Pink);
        ctx.fillRect(this.selectSongButton.x, this.selectSongButton.y, this.selectSongButton.w, this.selectSongButton.h);
        ctx.font = `${this.selectSongButton.fontSize}px ${this.selectSongButton.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
        const text = this.selectSongButton.loading
            ? this.selectSongButton.textLoading
            : this.selectSongButton.text;
        ctx.globalAlpha = this.selectSongButton.loading ? 0.5 : 1;
        ctx.fillText(text, this.selectSongButton.x + this.selectSongButton.w / 2, this.selectSongButton.y + this.selectSongButton.h / 2);
        ctx.restore();
    }
    renderStatusText(ctx) {
        ctx.save();
        ctx.font = `${this.statusText.fontSize}px ${this.statusText.fontFamily}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
        ctx.strokeStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
        ctx.lineWidth = 10;
        ctx.strokeText(this.statusText.text, this.statusText.x, this.statusText.y);
        ctx.fillText(this.statusText.text, this.statusText.x, this.statusText.y);
        ctx.restore();
    }
    handleFileInputChange(event) {
        const input = event.target;
        if (!input.files || input.files.length === 0) {
            return;
        }
        const file = input.files[0];
        if (!file) {
            return;
        }
        this.fileInput.value = '';
        this.fileInput.files = null;
        this.uploadSongFile(file);
    }
    async uploadSongFile(file) {
        this.selectSongButton.loading = true;
        const apiClient = new ApiClient();
        let response = null;
        try {
            response = await apiClient.parseSong(file);
        }
        catch (error) {
            window.alert(`Fout bij uploaden bestand: ${error}`);
            return;
        }
        this.selectSongButton.loading = false;
        this.game.getInputManager().reset();
        this.game
            .getSceneManager()
            .push(new DifficultySelectScene(this.game, response.song));
    }
}

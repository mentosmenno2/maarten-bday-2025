import { AbstractScene } from './AbstractScene.js';
import { ColorEnum } from '../Core/Style/ColorEnum.js';
import { ColorUtils } from '../Core/Style/ColorUtils.js';
import { CollisionHelper } from '../Core/Helpers/CollisionHelper.js';
import { LevelScene } from './LevelScene.js';
export class DifficultySelectScene extends AbstractScene {
    song;
    backgroundImage;
    coverImage;
    songTitle;
    songArtist;
    mapper;
    chooseText;
    difficultyButtons;
    previewAudio;
    constructor(game, song) {
        super(game);
        this.song = song;
        this.songTitle = {
            x: 0,
            y: 0,
            fontSize: 0,
            text: this.song.title,
            maxWidth: 0,
        };
        this.songArtist = {
            x: 0,
            y: 0,
            fontSize: 0,
            text: this.song.artist,
            maxWidth: 0,
        };
        this.mapper = {
            x: 0,
            y: 0,
            fontSize: 0,
            text: `Maker: ${this.song.builder || 'Onbekend'}`,
            maxWidth: 0,
        };
        this.chooseText = {
            x: 0,
            y: 0,
            fontSize: 0,
            text: 'Kies moeilijkheidsgraad',
            maxWidth: 0,
        };
        this.difficultyButtons = [];
        for (let difficultyIndex = 0; difficultyIndex < this.song.difficulties.length; difficultyIndex++) {
            this.difficultyButtons.push({
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                difficultyIndex: difficultyIndex,
                text: this.song.difficulties[difficultyIndex].name,
            });
        }
        const backgroundImageBase64 = this.song.backgroundImageBase64 || this.song.coverImageBase64;
        this.backgroundImage = null;
        if (backgroundImageBase64) {
            this.backgroundImage = new Image();
            this.backgroundImage.src = backgroundImageBase64;
        }
        this.coverImage = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            image: null,
        };
        const coverImageBase64 = this.song.coverImageBase64 || this.song.backgroundImageBase64;
        if (coverImageBase64) {
            this.coverImage.image = new Image();
            this.coverImage.image.src = coverImageBase64;
        }
        this.previewAudio = document.createElement('audio');
        if (this.song.audioBase64) {
            const srcElement = document.createElement('source');
            srcElement.src = this.song.audioBase64;
            this.previewAudio.appendChild(srcElement);
        }
        this.previewAudio.loop = true;
        this.previewAudio.volume = 0.1;
        this.previewAudio.preload = 'auto';
        this.previewAudio.autoplay = true;
        this.previewAudio.load();
    }
    update(_deltaTime, ctx) {
        this.updateCoverImage(ctx);
        this.updateSongTitle(ctx);
        this.updateSongArtist(ctx);
        this.updateMapper(ctx);
        this.updateChooseText(ctx);
        this.updateDifficultyButtons(ctx);
        this.handleDifficultyButtonsClick();
    }
    updateCoverImage(ctx) {
        const { width, height } = ctx.canvas;
        const size = Math.round(Math.min(width, height) * 0.15);
        this.coverImage.x = 20;
        this.coverImage.y = 20;
        this.coverImage.w = size;
        this.coverImage.h = size;
    }
    updateSongTitle(ctx) {
        const { width } = ctx.canvas;
        this.songTitle.x = this.coverImage.x + this.coverImage.w + 20;
        this.songTitle.y = this.coverImage.y;
        this.songTitle.fontSize = this.coverImage.h * 0.3;
        this.songTitle.maxWidth = Math.round(width - this.songTitle.x - 20);
    }
    updateSongArtist(ctx) {
        const { width } = ctx.canvas;
        this.songArtist.x = this.coverImage.x + this.coverImage.w + 20;
        this.songArtist.y = this.coverImage.y + this.coverImage.h * 0.35;
        this.songArtist.fontSize = this.coverImage.h * 0.3;
        this.songArtist.maxWidth = Math.round(width - this.songArtist.x - 20);
    }
    updateMapper(ctx) {
        const { width } = ctx.canvas;
        this.mapper.x = this.coverImage.x + this.coverImage.w + 20;
        this.mapper.y = this.coverImage.y + this.coverImage.h * 0.7;
        this.mapper.fontSize = this.coverImage.h * 0.25;
        this.mapper.maxWidth = Math.round(width - this.mapper.x - 20);
    }
    updateChooseText(ctx) {
        const { width, height } = ctx.canvas;
        this.chooseText.x = width / 2;
        this.chooseText.y = this.coverImage.y + this.coverImage.h + 20;
        this.chooseText.fontSize = Math.min(width, height) * 0.05;
        this.chooseText.maxWidth = Math.round(width - 40);
    }
    updateDifficultyButtons(ctx) {
        const { width, height } = ctx.canvas;
        const topY = this.chooseText.y + this.chooseText.fontSize + 20;
        this.difficultyButtons.forEach((button, index) => {
            button.x = 20;
            button.y = topY + index * (height * 0.05 + 20);
            button.w = width - 40;
            button.h = height * 0.05;
        });
    }
    handleDifficultyButtonsClick() {
        const inputManager = this.game.getInputManager();
        const clicked = inputManager.isMouseOrFingerJustPressed();
        const clickpos = inputManager.getMouseOrFingerPositions();
        if (!clicked || clickpos.length === 0) {
            return;
        }
        const collidedButton = this.difficultyButtons.find((button) => CollisionHelper.boxPosCollide(button, clickpos[0]));
        if (!collidedButton) {
            return;
        }
        if (!this.previewAudio.paused) {
            this.previewAudio.pause();
        }
        this.game.getInputManager().reset();
        this.game
            .getSceneManager()
            .push(new LevelScene(this.game, this.song, collidedButton.difficultyIndex));
    }
    render(ctx) {
        this.renderBackgroundImage(ctx);
        this.renderCoverImage(ctx);
        this.renderSongTitle(ctx);
        this.renderSongArtist(ctx);
        this.renderMapper(ctx);
        this.renderChooseText(ctx);
        this.renderDifficultyButtons(ctx);
    }
    renderBackgroundImage(ctx) {
        const { width, height } = ctx.canvas;
        ctx.save();
        if (this.backgroundImage) {
            ctx.filter = 'blur(10px)';
            ctx.globalAlpha = 1;
            const imageAspectRatio = this.backgroundImage.width / this.backgroundImage.height;
            const canvasAspectRatio = width / height;
            if (imageAspectRatio > canvasAspectRatio) {
                const scaledHeight = height;
                const scaledWidth = scaledHeight * imageAspectRatio;
                ctx.drawImage(this.backgroundImage, (width - scaledWidth) / 2, 0, scaledWidth, scaledHeight);
            }
            else {
                const scaledWidth = width;
                const scaledHeight = scaledWidth / imageAspectRatio;
                ctx.drawImage(this.backgroundImage, 0, (height - scaledHeight) / 2, scaledWidth, scaledHeight);
            }
            ctx.filter = 'none';
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = ColorUtils.getHex(ColorEnum.Black);
            ctx.fillRect(0, 0, width, height);
        }
        else {
            ctx.fillStyle = ColorUtils.getHex(ColorEnum.Black);
            ctx.fillRect(0, 0, width, height);
        }
        ctx.restore();
    }
    renderCoverImage(ctx) {
        if (!this.coverImage.image) {
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.coverImage.x + this.coverImage.w / 2, this.coverImage.y + this.coverImage.h / 2, this.coverImage.h / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        const imageAspectRatio = this.coverImage.image.width / this.coverImage.image.height;
        const artAspectRatio = this.coverImage.w / this.coverImage.h;
        if (imageAspectRatio > artAspectRatio) {
            const scaledHeight = this.coverImage.h;
            const scaledWidth = scaledHeight * imageAspectRatio;
            ctx.drawImage(this.coverImage.image, this.coverImage.x + (this.coverImage.w - scaledWidth) / 2, this.coverImage.y, scaledWidth, scaledHeight);
        }
        else {
            const scaledWidth = this.coverImage.w;
            const scaledHeight = scaledWidth / imageAspectRatio;
            ctx.drawImage(this.coverImage.image, this.coverImage.x, this.coverImage.y + (this.coverImage.h - scaledHeight) / 2, scaledWidth, scaledHeight);
        }
        ctx.restore();
    }
    renderSongTitle(ctx) {
        ctx.save();
        ctx.font = `${this.songTitle.fontSize}px Arial`;
        ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.strokeStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
        ctx.lineWidth = 5;
        ctx.strokeText(this.songTitle.text, this.songTitle.x, this.songTitle.y, this.songTitle.maxWidth);
        ctx.fillText(this.songTitle.text, this.songTitle.x, this.songTitle.y, this.songTitle.maxWidth);
        ctx.restore();
    }
    renderSongArtist(ctx) {
        ctx.save();
        ctx.font = `${this.songArtist.fontSize}px Arial`;
        ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.strokeStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
        ctx.lineWidth = 5;
        ctx.strokeText(this.songArtist.text, this.songArtist.x, this.songArtist.y, this.songArtist.maxWidth);
        ctx.fillText(this.songArtist.text, this.songArtist.x, this.songArtist.y, this.songArtist.maxWidth);
        ctx.restore();
    }
    renderMapper(ctx) {
        if (!this.mapper.text) {
            return;
        }
        ctx.save();
        ctx.font = `${this.mapper.fontSize}px Arial`;
        ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.strokeStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
        ctx.lineWidth = 5;
        ctx.strokeText(this.mapper.text, this.mapper.x, this.mapper.y, this.mapper.maxWidth);
        ctx.fillText(this.mapper.text, this.mapper.x, this.mapper.y, this.mapper.maxWidth);
        ctx.restore();
    }
    renderChooseText(ctx) {
        ctx.save();
        ctx.font = `${this.chooseText.fontSize}px Arial`;
        ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.strokeStyle = ColorUtils.getHex(ColorEnum.DarkBlue);
        ctx.lineWidth = 5;
        ctx.strokeText(this.chooseText.text, this.chooseText.x, this.chooseText.y, this.chooseText.maxWidth);
        ctx.fillText(this.chooseText.text, this.chooseText.x, this.chooseText.y, this.chooseText.maxWidth);
        ctx.restore();
    }
    renderDifficultyButtons(ctx) {
        ctx.save();
        for (const difficultyButton of this.difficultyButtons) {
            ctx.fillStyle = ColorUtils.getRgba(ColorEnum.Black, 0.8);
            ctx.strokeStyle = ColorUtils.getHex(ColorEnum.White);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(difficultyButton.x, difficultyButton.y, difficultyButton.w, difficultyButton.h, difficultyButton.h * 0.3);
            ctx.fill();
            ctx.stroke();
            ctx.font = `${Math.round(difficultyButton.h * 0.45)}px Arial`;
            ctx.fillStyle = ColorUtils.getHex(ColorEnum.White);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(difficultyButton.text, difficultyButton.x + difficultyButton.w / 2, difficultyButton.y + difficultyButton.h / 2, difficultyButton.w);
        }
        ctx.restore();
    }
}

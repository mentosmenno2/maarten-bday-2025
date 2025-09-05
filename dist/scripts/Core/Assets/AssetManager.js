import { MenuMusic } from './Audio/MenuMusic.js';
import { Duck } from './Images/Duck.js';
import { Wallpaper } from './Images/Wallpaper.js';
export class AssetManager {
    images;
    audio;
    constructor() {
        this.images = {
            wallpaper: new Wallpaper(),
            duck: new Duck(),
        };
        this.audio = {
            menuMusic: new MenuMusic(),
        };
    }
    isLoaded() {
        return (this.images.wallpaper.isLoaded() &&
            this.images.duck.isLoaded() &&
            this.audio.menuMusic.isLoaded());
    }
}

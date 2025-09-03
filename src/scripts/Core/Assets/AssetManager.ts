import { MenuMusic } from './Audio/MenuMusic.js';
import { Duck } from './Images/Duck.js';
import { Wallpaper } from './Images/Wallpaper.js';

export class AssetManager {
	public images: {
		wallpaper: Wallpaper;
		duck: Duck;
	};

	public audio: {
		menuMusic: MenuMusic;
	};

	constructor() {
		this.images = {
			wallpaper: new Wallpaper(),
			duck: new Duck(),
		};

		this.audio = {
			menuMusic: new MenuMusic(),
		};
	}

	public isLoaded(): boolean {
		return (
			this.images.wallpaper.isLoaded() &&
			this.images.duck.isLoaded() &&
			this.audio.menuMusic.isLoaded()
		);
	}
}

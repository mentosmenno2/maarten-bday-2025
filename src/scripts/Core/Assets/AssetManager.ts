import { Wallpaper } from "./Images/Wallpaper.js";

export class AssetManager {
	public wallpaper: Wallpaper;

	constructor() {
		this.wallpaper = new Wallpaper();
	}

	public isLoaded(): boolean {
		return this.wallpaper.isLoaded();
	}
}

import { Duck } from "./Images/Duck.js";
import { Wallpaper } from "./Images/Wallpaper.js";

export class AssetManager {
	public wallpaper: Wallpaper;
	public duck: Duck;

	constructor() {
		this.wallpaper = new Wallpaper();
		this.duck = new Duck();
	}

	public isLoaded(): boolean {
		return this.wallpaper.isLoaded() && this.duck.isLoaded();
	}
}

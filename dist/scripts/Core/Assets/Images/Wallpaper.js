export class Wallpaper {
    element;
    constructor() {
        this.element = new Image();
        this.element.src = `${window.location.href}dist/images/wallpaper.png`;
    }
    getElement() {
        return this.element;
    }
    isLoaded() {
        return this.element.complete;
    }
}

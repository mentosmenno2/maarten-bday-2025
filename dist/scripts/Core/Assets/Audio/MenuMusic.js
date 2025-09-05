export class MenuMusic {
    element;
    constructor() {
        this.element = document.createElement('audio');
        const srcElement = document.createElement('source');
        srcElement.src = `${window.location.href}dist/audio/menu-music.mp3`;
        this.element.appendChild(srcElement);
        this.element.loop = true;
        this.element.preload = 'auto';
        this.element.load();
    }
    getElement() {
        return this.element;
    }
    isLoaded() {
        return this.element.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA;
    }
}

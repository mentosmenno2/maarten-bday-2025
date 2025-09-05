export class Duck {
    element;
    constructor() {
        this.element = new Image();
        this.element.src = `${window.location.href}dist/images/duck.png`;
    }
    getElement() {
        return this.element;
    }
    isLoaded() {
        return this.element.complete;
    }
}

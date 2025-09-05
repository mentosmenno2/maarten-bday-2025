export class Canvas {
    element;
    context;
    constructor(id) {
        this.element = document.getElementById(id);
        this.context = this.element.getContext('2d', {
            desynchronized: true,
        });
    }
    getElement() {
        return this.element;
    }
    getContext() {
        return this.context;
    }
    getWidth() {
        return this.element.width;
    }
    getHeight() {
        return this.element.height;
    }
    getScaledWidth() {
        return 100;
    }
    getScaledHeight() {
        return 100;
    }
    updateSize() {
        const width = this.element.width;
        const height = this.element.height;
        const displayWidth = this.element.offsetWidth * window.devicePixelRatio;
        const displayHeight = this.element.offsetHeight * window.devicePixelRatio;
        if (width !== displayWidth) {
            this.element.width = displayWidth;
        }
        if (height !== displayHeight) {
            this.element.height = displayHeight;
        }
    }
}

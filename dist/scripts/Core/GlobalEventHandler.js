export class GlobalEventHandler {
    game;
    constructor(game) {
        this.game = game;
    }
    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
    }
    onResize() {
        this.game.getCanvas().updateSize();
        this.game.getPreRenderCanvas().updateSize();
    }
}

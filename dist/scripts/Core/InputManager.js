export class InputManager {
    game;
    keysDown = new Set();
    keysJustPressed = new Set();
    mouseDown = false;
    mouseJustPressed = false;
    touchActive = false;
    touchJustPressed = false;
    lastMousePos = null;
    lastTouchPos;
    constructor(game) {
        this.game = game;
    }
    addEventListeners() {
        this.game
            .getCanvas()
            .getElement()
            .addEventListener('keydown', (e) => {
            if (!this.keysDown.has(e.key)) {
                this.keysJustPressed.add(e.key);
            }
            this.keysDown.add(e.key);
        });
        this.game
            .getCanvas()
            .getElement()
            .addEventListener('keyup', (e) => {
            this.keysDown.delete(e.key);
        });
        this.game
            .getCanvas()
            .getElement()
            .addEventListener('mousedown', (e) => {
            if (!this.mouseDown) {
                this.mouseJustPressed = true;
                this.touchJustPressed = false;
            }
            this.mouseDown = true;
            this.touchActive = false;
            this.lastMousePos = {
                x: e.clientX * window.devicePixelRatio,
                y: e.clientY * window.devicePixelRatio,
            };
            this.lastTouchPos = [];
        });
        this.game
            .getCanvas()
            .getElement()
            .addEventListener('mouseup', () => {
            this.mouseDown = false;
            this.touchActive = false;
        });
        this.game
            .getCanvas()
            .getElement()
            .addEventListener('mousemove', (e) => {
            this.lastMousePos = {
                x: e.clientX * window.devicePixelRatio,
                y: e.clientY * window.devicePixelRatio,
            };
            this.lastTouchPos = [];
        });
        this.game
            .getCanvas()
            .getElement()
            .addEventListener('touchstart', (e) => {
            if (!this.touchActive) {
                this.touchJustPressed = true;
                this.mouseJustPressed = false;
            }
            this.touchActive = e.touches.length > 0;
            this.lastTouchPos = [];
            Array.from(e.touches).forEach((touch) => {
                this.lastTouchPos.push({
                    x: touch.clientX * window.devicePixelRatio,
                    y: touch.clientY * window.devicePixelRatio,
                });
            });
            if (e.touches.length > 0) {
                this.lastMousePos = null;
            }
        });
        this.game
            .getCanvas()
            .getElement()
            .addEventListener('touchend', (e) => {
            this.touchActive = e.touches.length > 0;
            this.lastTouchPos = [];
            Array.from(e.touches).forEach((touch) => {
                this.lastTouchPos.push({
                    x: touch.clientX * window.devicePixelRatio,
                    y: touch.clientY * window.devicePixelRatio,
                });
            });
            if (e.touches.length > 0) {
                this.lastMousePos = null;
            }
        });
        this.game
            .getCanvas()
            .getElement()
            .addEventListener('touchmove', (e) => {
            this.touchActive = e.touches.length > 0;
            this.lastTouchPos = [];
            Array.from(e.touches).forEach((touch) => {
                this.lastTouchPos.push({
                    x: touch.clientX * window.devicePixelRatio,
                    y: touch.clientY * window.devicePixelRatio,
                });
            });
            if (e.touches.length > 0) {
                this.lastMousePos = null;
            }
        });
    }
    isKeyDown(key) {
        return this.keysDown.has(key);
    }
    isKeyJustPressed(key) {
        return this.keysJustPressed.has(key);
    }
    isMouseDown() {
        return this.mouseDown;
    }
    isMouseJustPressed() {
        return this.mouseJustPressed;
    }
    isTouching() {
        return this.touchActive;
    }
    isTouchJustPressed() {
        return this.touchJustPressed;
    }
    isMouseOrFingerDown() {
        return this.mouseDown || this.touchActive;
    }
    isMouseOrFingerJustPressed() {
        return this.mouseJustPressed || this.touchJustPressed;
    }
    getMousePosition() {
        return this.lastMousePos;
    }
    getTouchPositions() {
        return this.lastTouchPos;
    }
    getMouseOrFingerPositions() {
        if (this.lastMousePos) {
            return [this.lastMousePos];
        }
        return this.lastTouchPos;
    }
    isAnyInput() {
        return this.mouseDown || this.touchActive || this.keysDown.size > 0;
    }
    isAnyInputJustPressed() {
        return (this.mouseJustPressed ||
            this.touchJustPressed ||
            this.keysJustPressed.size > 0);
    }
    resetJustPressed() {
        this.keysJustPressed.clear();
        this.mouseJustPressed = false;
        this.touchJustPressed = false;
    }
    reset() {
        this.resetJustPressed();
        this.keysDown.clear();
        this.mouseDown = false;
        this.touchActive = false;
        this.lastMousePos = null;
        this.lastTouchPos = [];
    }
}

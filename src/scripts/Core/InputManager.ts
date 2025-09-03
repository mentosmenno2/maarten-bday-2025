import { Game } from "../Game.js";


export class InputManager {
    private game: Game;

    private keysDown: Set<string> = new Set();
    private keysJustPressed: Set<string> = new Set();
    private mouseDown: boolean = false;
    private mouseJustPressed: boolean = false;
    private touchActive: boolean = false;
    private touchJustPressed: boolean = false;
    private lastMousePos: { x: number, y: number } | null = null;
    private lastTouchPos: { x: number, y: number } | null = null;

	constructor(game: Game) {
		this.game = game;
	}

    addEventListeners() {
        // Keyboard
        this.game.getCanvas().getElement().addEventListener('keydown', (e: KeyboardEvent) => {
			if (!this.keysDown.has(e.key)) {
                this.keysJustPressed.add(e.key);
            }
            this.keysDown.add(e.key);
        });
        this.game.getCanvas().getElement().addEventListener('keyup', (e: KeyboardEvent) => {
            this.keysDown.delete(e.key);
        });

        // Mouse
        this.game.getCanvas().getElement().addEventListener('mousedown', (e: MouseEvent) => {
            if (!this.mouseDown) {
                this.mouseJustPressed = true;
				this.touchJustPressed = false;
            }
            this.mouseDown = true;
			this.touchActive = false;
            this.lastMousePos = {
				x: e.clientX * window.devicePixelRatio,
				y: e.clientY * window.devicePixelRatio
			};
			this.lastTouchPos = null;
        });
        this.game.getCanvas().getElement().addEventListener('mouseup', () => {
            this.mouseDown = false;
			this.touchActive = false;
        });
        this.game.getCanvas().getElement().addEventListener('mousemove', (e: MouseEvent) => {
           this.lastMousePos = {
				x: e.clientX * window.devicePixelRatio,
				y: e.clientY * window.devicePixelRatio
			};
			this.lastTouchPos = null;
        });

        // Touch
        this.game.getCanvas().getElement().addEventListener('touchstart', (e: TouchEvent) => {
            if (!this.touchActive) {
                this.touchJustPressed = true;
				this.mouseJustPressed = false;
            }
            this.touchActive = true;
            if (e.touches.length > 0) {
                this.lastTouchPos = {
                    x: e.touches[0].clientX * window.devicePixelRatio,
                    y: e.touches[0].clientY * window.devicePixelRatio
                };
				this.lastMousePos = null;
            }
        });
        this.game.getCanvas().getElement().addEventListener('touchend', () => {
            this.touchActive = false;
			this.lastTouchPos = null;
        });
        this.game.getCanvas().getElement().addEventListener('touchmove', (e: TouchEvent) => {
            if (e.touches.length > 0) {
                this.lastTouchPos = {
                    x: e.touches[0].clientX * window.devicePixelRatio,
                    y: e.touches[0].clientY * window.devicePixelRatio
                };
				this.lastMousePos = null;
            }
        });
    }

    isKeyDown(key: string): boolean {
        return this.keysDown.has(key);
    }

    isKeyJustPressed(key: string): boolean {
        return this.keysJustPressed.has(key);
    }

    isMouseDown(): boolean {
        return this.mouseDown;
    }

    isMouseJustPressed(): boolean {
        return this.mouseJustPressed;
    }

    isTouching(): boolean {
        return this.touchActive;
    }

    isTouchJustPressed(): boolean {
        return this.touchJustPressed;
    }

	isMouseOrFingerDown(): boolean {
        return this.mouseDown || this.touchActive;
    }

	isMouseOrFingerJustPressed(): boolean {
        return this.mouseJustPressed || this.touchJustPressed;
    }

    getMousePosition(): { x: number, y: number } | null {
        return this.lastMousePos;
    }

    getTouchPosition(): { x: number, y: number } | null {
        return this.lastTouchPos;
    }

    getMouseOrFingerPosition(): { x: number, y: number } | null {
        return this.lastMousePos || this.lastTouchPos;
    }

    isAnyInput(): boolean {
        return this.mouseDown || this.touchActive || this.keysDown.size > 0;
    }

	isAnyInputJustPressed(): boolean {
        return this.mouseJustPressed || this.touchJustPressed || this.keysJustPressed.size > 0;
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
        this.lastTouchPos = null;
    }
}

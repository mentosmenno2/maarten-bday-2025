
import { Game } from '../Game.js';
import { ActualVector2 } from './Position/ActualVector2.js';

export class InputManager {
	private game: Game;

    private keysDown: Set<string> = new Set();
    private keysJustPressed: Set<string> = new Set();
    private mouseDown: boolean = false;
    private mouseJustPressed: boolean = false;
    private touchActive: boolean = false;
    private touchJustPressed: boolean = false;
    private lastMousePos: ActualVector2 | null = null;
    private lastTouchPos: ActualVector2 | null = null;

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
            }
            this.mouseDown = true;
            this.lastMousePos = new ActualVector2(e.clientX, e.clientY);
        });
        this.game.getCanvas().getElement().addEventListener('mouseup', () => {
            this.mouseDown = false;
        });
        this.game.getCanvas().getElement().addEventListener('mousemove', (e: MouseEvent) => {
            this.lastMousePos = new ActualVector2(e.clientX, e.clientY);
        });

        // Touch
        this.game.getCanvas().getElement().addEventListener('touchstart', (e: TouchEvent) => {
            if (!this.touchActive) {
                this.touchJustPressed = true;
            }
            this.touchActive = true;
            if (e.touches.length > 0) {
                this.lastTouchPos = new ActualVector2(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                );
            }
        });
        this.game.getCanvas().getElement().addEventListener('touchend', () => {
            this.touchActive = false;
        });
        this.game.getCanvas().getElement().addEventListener('touchmove', (e: TouchEvent) => {
            if (e.touches.length > 0) {
                this.lastTouchPos = new ActualVector2(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                );
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

    getMousePosition(): ActualVector2 | null {
        return this.lastMousePos;
    }

    getTouchPosition(): ActualVector2 | null {
        return this.lastTouchPos;
    }

	getMouseOrFingerPosition(): ActualVector2 | null {
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

export class Duck {
	private element: HTMLImageElement;

	public constructor() {
		this.element = new Image();
		this.element.src = `${window.location.href}dist/images/duck.png`;
	}

	public getElement(): HTMLImageElement {
		return this.element;
	}

	public isLoaded(): boolean {
		return this.element.complete;
	}
}

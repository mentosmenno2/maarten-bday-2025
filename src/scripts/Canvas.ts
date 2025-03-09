export class Canvas {
	private element: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	public constructor() {
		this.element = <HTMLCanvasElement>document.getElementById('game');
		this.context = <CanvasRenderingContext2D>this.element.getContext('2d');
	}

	public getContext(): CanvasRenderingContext2D {
		return this.context;
	}

	public updateSize(): void {
		const width = this.element.width;
		const height = this.element.height;
		const displayWidth = this.element.offsetWidth;
		const displayHeight = this.element.offsetHeight;

		if (width !== displayWidth) {
			this.element.width = displayWidth;
		}

		if (height !== displayHeight) {
			this.element.height = displayHeight;
		}
	}
}

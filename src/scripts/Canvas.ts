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
}

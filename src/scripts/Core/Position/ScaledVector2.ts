import { Vector2Interface } from './Vector2Interface.js';
import { Vector2Utils } from './Vector2Utils.js';

export class ScaledVector2 implements Vector2Interface {
	private x: number;
	private y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public getX(): number {
		return this.x;
	}

	public setX(x: number): void {
		this.x = x;
	}

	public getY(): number {
		return this.y;
	}

	public setY(y: number): void {
		this.y = y;
	}

	public getActualVector2(): ScaledVector2 {
		return new ScaledVector2(
			Vector2Utils.toActualX(this.x),
			Vector2Utils.toActualY(this.y),
		);
	}
}

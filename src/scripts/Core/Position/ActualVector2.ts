import { ScaledVector2 } from './ScaledVector2.js';
import { Vector2Interface } from './Vector2Interface.js';
import { Vector2Utils } from './Vector2Utils.js';

export class ActualVector2 implements Vector2Interface {
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

	public getScaledVector2(): ScaledVector2 {
		return new ScaledVector2(
			Vector2Utils.toScaledX(this.x),
			Vector2Utils.toScaledY(this.y),
		);
	}
}

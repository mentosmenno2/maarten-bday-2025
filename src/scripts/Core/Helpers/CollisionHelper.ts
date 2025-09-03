export class CollisionHelper {
	/**
	 * Check if two axis-aligned bounding boxes collide
	 */
	static boxBoxCollide(
		a: { x: number; y: number; w: number; h: number },
		b: { x: number; y: number; w: number; h: number },
	): boolean {
		return (
			a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
		);
	}

	/**
	 * Check if a point is inside a bounding box
	 */
	static boxPosCollide(
		box: { x: number; y: number; w: number; h: number },
		point: { x: number; y: number },
	): boolean {
		return (
			point.x >= box.x &&
			point.x <= box.x + box.w &&
			point.y >= box.y &&
			point.y <= box.y + box.h
		);
	}
}

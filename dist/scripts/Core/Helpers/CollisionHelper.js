export class CollisionHelper {
    static boxBoxCollide(a, b) {
        return (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y);
    }
    static boxPosCollide(box, point) {
        return (point.x >= box.x &&
            point.x <= box.x + box.w &&
            point.y >= box.y &&
            point.y <= box.y + box.h);
    }
}

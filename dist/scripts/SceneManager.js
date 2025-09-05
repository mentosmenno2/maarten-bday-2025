export class SceneManager {
    sceneStack = [];
    constructor(scene) {
        this.push(scene);
    }
    getCurrent() {
        return this.sceneStack.length > 0
            ? this.sceneStack[this.sceneStack.length - 1]
            : null;
    }
    push(scene) {
        this.sceneStack.push(scene);
    }
    pop() {
        this.sceneStack.pop();
    }
    replace(scene) {
        this.sceneStack = [scene];
    }
    reset() {
        this.sceneStack = [];
    }
    update(dt, ctx) {
        const current = this.getCurrent();
        if (current)
            current.update(dt, ctx);
    }
    render(ctx) {
        const current = this.getCurrent();
        if (current)
            current.render(ctx);
    }
}

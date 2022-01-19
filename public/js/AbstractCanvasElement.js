export class AbstractCanvasElement {
    constructor(ctx, properties) {
        var _a, _b, _c;
        this.ctx = ctx;
        this.x = properties.x;
        this.y = properties.y;
        this.width = properties.width;
        this.height = properties.height;
        this.lineWidth = (_a = properties.lineWidth) !== null && _a !== void 0 ? _a : 0;
        this.fillStyle = (_b = properties.fillStyle) !== null && _b !== void 0 ? _b : "grey";
        this.strokeStyle = (_c = properties.strokeStyle) !== null && _c !== void 0 ? _c : "rgba(0, 0, 0, 0)";
    }
    _Draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    _Update() { }
    Render() {
        this._Draw();
        this._Update();
    }
}
//# sourceMappingURL=AbstractCanvasElement.js.map
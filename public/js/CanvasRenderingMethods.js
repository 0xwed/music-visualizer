import { clientWidth, clientHeight } from "./Measures.js";
export function ClearCanvas({ ctx, x = 0, y = 0, width = clientWidth, height = clientHeight }) {
    ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(x, y, width, height);
}
export function FillCanvas({ ctx, color = "rgba(0,0,0,0.8)", x = 0, y = 0, width = clientWidth, height = clientHeight }) {
    if (ctx === null || ctx === void 0 ? void 0 : ctx.fillStyle) {
        ctx.fillStyle = color;
    }
    ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(x, y, width, height);
}
export function RenderCanvas(...functions) {
    for (const fn of functions) {
        new Promise((res) => res(fn))
            .catch(rej => {
            throw new Error(rej);
        });
    }
    requestAnimationFrame(() => RenderCanvas(...functions));
}
//# sourceMappingURL=CanvasRenderingMethods.js.map
const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;
const vw = (f = 1) => clientWidth / 100 * f;
const vh = (f = 1) => clientHeight / 100 * f;
const vmin = (f = 1) => vw() > vh() ? vh(f) : vw(f);
const vmax = (f = 1) => vw() < vh() ? vh(f) : vw(f);
export { clientWidth, clientHeight, vw, vh, vmin, vmax };
//# sourceMappingURL=Measures.js.map
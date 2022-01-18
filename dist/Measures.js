"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vmax = exports.vmin = exports.vh = exports.vw = exports.clientHeight = exports.clientWidth = void 0;
const clientWidth = document.documentElement.clientWidth;
exports.clientWidth = clientWidth;
const clientHeight = document.documentElement.clientHeight;
exports.clientHeight = clientHeight;
const vw = (f = 1) => clientWidth / 100 * f;
exports.vw = vw;
const vh = (f = 1) => clientHeight / 100 * f;
exports.vh = vh;
const vmin = (f = 1) => vw() > vh() ? vh(f) : vw(f);
exports.vmin = vmin;
const vmax = (f = 1) => vw() < vh() ? vh(f) : vw(f);
exports.vmax = vmax;
//# sourceMappingURL=Measures.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Measures_1 = require("./Measures");
const Notes_1 = require("./Notes");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let audio;
let audioContext;
let analyser;
let source;
let notesStyleProperties;
let notesCount;
let notes;
function Play() {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    audio.play();
}
function Stop() {
    audio.pause();
}
function ResizeCanvas() {
    canvas.width = Measures_1.clientWidth;
    canvas.height = Measures_1.clientHeight;
}
function ClearCanvas() {
    ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(0, 0, Measures_1.clientWidth, Measures_1.clientHeight);
}
function FillCanvas(opacity = 1) {
    if (ctx === null || ctx === void 0 ? void 0 : ctx.fillStyle) {
        ctx.fillStyle = `rgba( 0, 0, 0, ${opacity} )`;
    }
    ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(0, 0, Measures_1.clientWidth, Measures_1.clientHeight);
}
function DrawCanvas() {
    notes.Play(analyser);
}
function RenderCanvas() {
    requestAnimationFrame(() => {
        FillCanvas();
        DrawCanvas();
        RenderCanvas();
    });
}
function PlayerInit(audioPath = "src/audio.mp3") {
    audio = new Audio(audioPath);
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    ResizeCanvas();
    RenderCanvas();
    const playButton = document.createElement("button");
    const stopButton = document.createElement("button");
    playButton.textContent = "Play";
    stopButton.textContent = "Stop";
    playButton.addEventListener("click", Play);
    stopButton.addEventListener("click", Stop);
    document.body.append(playButton, stopButton, audio, canvas);
}
notesStyleProperties = {
    x: (0, Measures_1.vw)(0),
    y: (0, Measures_1.vh)(100),
    width: (0, Measures_1.vw)(100),
    height: 0,
    gap: (0, Measures_1.vmin)(0.1),
    fillStyle: "white"
};
notesCount = 300;
notes = new Notes_1.Notes({ ctx, notesCount, notesStyleProperties });
window.addEventListener("load", () => PlayerInit());
window.addEventListener("resize", () => ResizeCanvas());
//# sourceMappingURL=MusicVisualizer.js.map
import { clientWidth, clientHeight, vw, vh, vmin } from "./Measures.js";
import { MusicVisualizer } from './MusicVisualizer.js';
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const noteStylesProperties = {
    x: vw(0),
    y: vh(100),
    width: vw(100),
    height: 0,
    gap: vmin(0.1),
    fillStyle: "white"
};
const notesCount = 300;
const musicVisualizer = new MusicVisualizer({
    ctx,
    animationType: "notes",
    audioPath: "../media/audio.mp3",
    particlesCount: notesCount,
    particleStyles: noteStylesProperties,
});
function ResizeCanvas() {
    canvas.width = clientWidth;
    canvas.height = clientHeight;
}
function Play() {
    musicVisualizer.Play();
}
function Stop() {
    musicVisualizer.Stop();
}
function PlayerInit() {
    ResizeCanvas();
    const playButton = document.createElement("button");
    const stopButton = document.createElement("button");
    playButton.textContent = "Play";
    stopButton.textContent = "Stop";
    playButton.addEventListener("click", Play);
    stopButton.addEventListener("click", Stop);
    document.body.append(canvas, playButton, stopButton);
}
window.addEventListener("load", PlayerInit);
window.addEventListener("resize", ResizeCanvas);
//# sourceMappingURL=index.js.map
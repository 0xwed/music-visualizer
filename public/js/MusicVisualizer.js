import { FillCanvas } from "./CanvasRenderingMethods.js";
import { Notes } from './Notes.js';
export class MusicVisualizer {
    constructor({ ctx, audioPath, particleStyles, particlesCount = 100, animationType = "notes" }) {
        this.ctx = ctx;
        this.animationType = animationType;
        const notesArgs = {
            ctx,
            notesCount: particlesCount,
            notesStyleProperties: particleStyles
        };
        this.particles = new Notes(notesArgs);
        this.audio = new Audio(audioPath);
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.source = this.audioContext.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        this.animationRequestID = 0;
        document.documentElement.append(this.audio);
    }
    _PlayAudio() {
        if (this.audioContext.state === "suspended") {
            this.audioContext.resume();
        }
        this.audio.play();
    }
    _StopAudio() {
        this.audio.pause();
    }
    Play() {
        this._PlayAudio();
        this.animationRequestID = requestAnimationFrame(() => this._Draw());
    }
    Stop() {
        this._StopAudio();
        cancelAnimationFrame(this.animationRequestID);
    }
    _Draw() {
        this.particles.Play(this.analyser);
        this.animationRequestID = requestAnimationFrame(() => {
            FillCanvas({ ctx: this.ctx });
            this._Draw();
        });
    }
}
//# sourceMappingURL=MusicVisualizer.js.map
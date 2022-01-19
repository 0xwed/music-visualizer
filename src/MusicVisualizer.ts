import { StylePropertiesOfNotes } from "./AbstractNotes.js"
import { FillCanvas } from "./CanvasRenderingMethods.js";
import { Notes } from './Notes.js';

interface MusicVisualizerConstructorArgs {
    animationType  : "notes",
    ctx            : CanvasRenderingContext2D | null,
    audioPath      : string,
    particleStyles : StylePropertiesOfNotes,
    particlesCount : number,
}

export class MusicVisualizer {
    public    ctx                : CanvasRenderingContext2D | null

    protected animationType      : string
    protected audio              : HTMLAudioElement
    protected audioContext       : AudioContext
    protected analyser           : AnalyserNode
    protected source             : MediaElementAudioSourceNode
    protected particles          : Notes

    private   animationRequestID : number

    constructor ({ ctx, audioPath, particleStyles, particlesCount = 100, animationType = "notes" } : MusicVisualizerConstructorArgs ) {
        this.ctx           = ctx
        this.animationType = animationType

        const notesArgs    = {
            ctx,
            notesCount           : particlesCount,
            notesStyleProperties : particleStyles
        }
        this.particles     = new Notes( notesArgs )

        this.audio         = new Audio( audioPath )
        this.audioContext  = new AudioContext()
        this.analyser      = this.audioContext.createAnalyser()
        this.source        = this.audioContext.createMediaElementSource( this.audio )
    
        this.source.connect( this.analyser )
        this.analyser.connect( this.audioContext.destination )

        this.animationRequestID = 0

        document.documentElement.append( this.audio )
    }

    private _PlayAudio () : void {
        if ( this.audioContext.state === "suspended" ) {
            this.audioContext.resume()
        }

        this.audio.play()
    }

    private _StopAudio () : void {
        this.audio.pause()
    }

    public Play () : void {
        this._PlayAudio()

        this.animationRequestID = requestAnimationFrame(() => this._Draw())
    }
    
    public Stop () : void {
        this._StopAudio()
        cancelAnimationFrame( this.animationRequestID )
    }

    private _Draw () : void {
        this.particles.Play( this.analyser )

        this.animationRequestID = requestAnimationFrame(() => {
            FillCanvas({ ctx: this.ctx })
            this._Draw()
        })
    }
}
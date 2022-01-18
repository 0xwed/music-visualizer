import { clientWidth, clientHeight, vw, vh, vmin } from "./Measures"
import { StylePropertiesOfNotes } from "./AbstractNotes"
import { Notes } from './Notes';

const canvas                                = <HTMLCanvasElement> document.createElement( "canvas" )
const ctx : CanvasRenderingContext2D | null = canvas.getContext( "2d" )

let audio        : HTMLAudioElement
let audioContext : AudioContext
let analyser     : AnalyserNode
let source       : MediaElementAudioSourceNode

let notesStyleProperties : StylePropertiesOfNotes
let notesCount : number
let notes : Notes

function Play () : void {
    if (audioContext.state === "suspended") {
        audioContext.resume()
    }

    audio.play()
}

function Stop () : void {
    audio.pause()
}

function ResizeCanvas () : void {
    canvas.width  = clientWidth
    canvas.height = clientHeight
}

function ClearCanvas () {
    ctx?.fillRect( 0, 0, clientWidth, clientHeight )
}

function FillCanvas ( opacity = 1 ) {
    if( ctx?.fillStyle ) {
        ctx.fillStyle = `rgba( 0, 0, 0, ${opacity} )`
    }
    ctx?.fillRect( 0, 0, clientWidth, clientHeight )
}

function DrawCanvas () {
    notes.Play( analyser )
}

function RenderCanvas () {
    requestAnimationFrame( () => {
        // ClearCanvas ()
        FillCanvas  ()
        DrawCanvas  ()
        RenderCanvas()
    } )
}

function PlayerInit ( audioPath : string = "src/audio.mp3" ) : void {
    audio         = new Audio( audioPath )
    audioContext  = new AudioContext()
    analyser      = audioContext.createAnalyser()
    source        = audioContext.createMediaElementSource(audio)

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    ResizeCanvas()
    RenderCanvas()

    const playButton : HTMLElement = document.createElement( "button" )
    const stopButton : HTMLElement = document.createElement( "button" )

    playButton.textContent = "Play"
    stopButton.textContent = "Stop"

    playButton.addEventListener( "click", Play )
    stopButton.addEventListener( "click", Stop )

    document.body.append( playButton, stopButton, audio, canvas )
}

notesStyleProperties = {
    x         : vw(0),
    y         : vh(100),
    width     : vw(100),
    height    : 0,
    gap       : vmin(0.1),
    fillStyle : "white"
}
notesCount = 300
notes      = new Notes({ ctx, notesCount, notesStyleProperties })

window.addEventListener( "load",   () => PlayerInit() )
window.addEventListener( "resize", () => ResizeCanvas() )
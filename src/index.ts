import { clientWidth, clientHeight, vw, vh, vmin } from "./Measures"
import { MusicVisualizer } from './MusicVisualizer';
import { StylePropertiesOfNotes } from './AbstractNotes';

const canvas                                = <HTMLCanvasElement> document.createElement( "canvas" )
const ctx : CanvasRenderingContext2D | null = canvas.getContext( "2d" )

const noteStylesProperties : StylePropertiesOfNotes = {
    x         : vw(0),
    y         : vh(100),
    width     : vw(100),
    height    : 0,
    gap       : vmin(0.1),
    fillStyle : "white"
}
const notesCount : number = 300

const musicVisualizer : MusicVisualizer = new MusicVisualizer({
    ctx,
    animationType  : "notes",
    audioPath      : "../media/audio.mp3",
    particlesCount : notesCount,
    particleStyles : noteStylesProperties,
})

function ResizeCanvas () : void {
    canvas.width  = clientWidth
    canvas.height = clientHeight
}

function Play () : void {
    musicVisualizer.Play()
}

function Stop () : void {
    musicVisualizer.Stop()
}

function PlayerInit () : void {
    ResizeCanvas()

    const playButton : HTMLElement = document.createElement( "button" )
    const stopButton : HTMLElement = document.createElement( "button" )

    playButton.textContent = "Play"
    stopButton.textContent = "Stop"

    playButton.addEventListener( "click", Play )
    stopButton.addEventListener( "click", Stop )

    document.body.append( canvas, playButton, stopButton )
}

window.addEventListener( "load",   PlayerInit )
window.addEventListener( "resize", ResizeCanvas )
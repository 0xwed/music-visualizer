const canvas                            = <HTMLCanvasElement> document.createElement( "canvas" )
const ctx : CanvasRenderingContext2D    = canvas.getContext( "2d" )

const clientWidth  : number = document.documentElement.clientWidth
const clientHeight : number = document.documentElement.clientHeight

let audio        : HTMLAudioElement
let audioContext : AudioContext
let analyser     : AnalyserNode
let source       : MediaElementAudioSourceNode

let notesStyleProperties : StylePropertiesOfNotes
let notesCount : number
let notes : Notes

/*
    vw - 1% of display width
    vh - 1% of display height
    vmin - 1% of the smallest display side
    vmax - 1% of the largest display side
*/

const vw   = ( f : number = 1 ) : number => clientWidth  / 100 * f
const vh   = ( f : number = 1 ) : number => clientHeight / 100 * f
const vmin = ( f : number = 1 ) : number => vw() > vh() ? vh( f ) : vw( f )
const vmax = ( f : number = 1 ) : number => vw() < vh() ? vh( f ) : vw( f )

interface CanvasElementProperties {
    x            : number
    y            : number
    width       ?: number
    height      ?: number
    lineWidth   ?: number
    fillStyle   ?: string
    strokeStyle ?: string
}

abstract class AbstractCanvasElement {
    public ctx         : CanvasRenderingContext2D
    public x           : number
    public y           : number
    public width       : number
    public height      : number
    public lineWidth   : number
    public fillStyle   : string
    public strokeStyle : string

    constructor ( ctx : CanvasRenderingContext2D, properties : CanvasElementProperties ) {
        this.ctx         = ctx
        this.x           = properties.x
        this.y           = properties.y
        this.width       = properties.width
        this.height      = properties.height
        this.fillStyle   = properties.fillStyle
        this.strokeStyle = properties.strokeStyle
        this.lineWidth   = properties.lineWidth
    }

    protected _Draw ()   : void {
        this.ctx.beginPath()
        this.ctx.fillStyle   = this.fillStyle
        this.ctx.fillRect( this.x, this.y, this.width, this.height )
    }
    protected _Update () : void {}
    public Render ()  : void {
        this._Draw()
        this._Update()
    }
}

class Note extends AbstractCanvasElement {
    public SetPitchOfNote ( height : number ) : void {
        this.height = height
    }
}

interface StylePropertiesOfNotes extends CanvasElementProperties {
    gap : number
}

interface NotesConstructorArgs {
    ctx                  : CanvasRenderingContext2D,
    notesCount           : number,
    notesStyleProperties : StylePropertiesOfNotes
}

abstract class AbstractNotes {
    public    notes          : Note[]
    protected ctx            : CanvasRenderingContext2D
    protected count          : number
    protected x              : number
    protected y              : number
    protected width          : number
    protected height         : number
    protected gap            : number
    protected color          : string
    protected noteProperties : CanvasElementProperties

    constructor ( { ctx, notesCount, notesStyleProperties } : NotesConstructorArgs ) {
        this.ctx            = ctx
        this.count          = notesCount
        this.x              = notesStyleProperties.x
        this.y              = notesStyleProperties.y
        this.width          = notesStyleProperties.width
        this.height         = notesStyleProperties.height
        this.gap            = notesStyleProperties.gap
        this.notes          = []
        this.noteProperties = {
            x         : notesStyleProperties.x,
            y         : notesStyleProperties.y,
            width     : this.getNoteWidth(),
            fillStyle : notesStyleProperties.fillStyle,
        }

        this.createNotes()
    }
    
    public getNoteWidth () : number {
        const noteWidth : number = ( this.width - this.gap * this.count ) / this.count

        return noteWidth
    }

    private changeNotePositionX () : void {
        this.noteProperties.x += this.noteProperties.width + this.gap
    }

    private createNotes () : void {
        for ( let i : number = 0; i < this.count; i++ ) {
            this.notes.push( new Note( this.ctx, this.noteProperties ) )

            this.changeNotePositionX()
        }
    }

    public abstract Play ( analyser : AnalyserNode ) : void
}

class Notes extends AbstractNotes {
    constructor ( { ctx, notesCount, notesStyleProperties } : NotesConstructorArgs ) {
        super({ ctx, notesCount, notesStyleProperties })
    }

    public Play ( analyser : AnalyserNode ) : void {
        const fbcArray : Uint8Array = new Uint8Array( analyser.frequencyBinCount )
        analyser.getByteFrequencyData( fbcArray )
        
        this.notes.forEach( ( note, i ) => {
            const index : number = i + i % 3
            const height         = -( fbcArray[index] / 2 )

            note.SetPitchOfNote( height )
            note.Render()
        })
    }
}

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
    ctx.fillRect( 0, 0, clientWidth, clientHeight )
}

function FillCanvas ( opacity = 1 ) {
    ctx.fillStyle = `rgba( 0, 0, 0, ${opacity} )`
    ctx.fillRect( 0, 0, clientWidth, clientHeight )
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
    gap       : vmin(0.1),
    fillStyle : "white"
}
notesCount = 300
notes      = new Notes({ ctx, notesCount, notesStyleProperties })

window.addEventListener( "load",   () => PlayerInit() )
window.addEventListener( "resize", () => ResizeCanvas() )
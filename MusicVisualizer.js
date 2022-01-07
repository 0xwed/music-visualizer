let audio
let audioContext
let analyser
let source

const canvas = document.createElement( "canvas" )
const ctx    = canvas.getContext( "2d" )

const clientWidth  = document.documentElement.clientWidth
const clientHeight = document.documentElement.clientHeight

const vw   = ( f = 1 ) => clientWidth  / 100 * f
const vh   = ( f = 1 ) => clientHeight / 100 * f
const vmin = ( f = 1 ) => vw() > vh() ? vh( f ) : vw( f )
const vmax = ( f = 1 ) => vw() < vh() ? vh( f ) : vw( f )

class CanvasElement {
    constructor ( ctx, {
        x,
        y,
        width,
        height,
        fillStyle,
        strokeStyle,
        lineWidth,
    } ) {
        this.ctx         = ctx
        this.x           = x
        this.y           = y
        this.width       = width
        this.height      = height
        this.fillStyle   = fillStyle
        this.strokeStyle = strokeStyle
        this.lineWidth   = lineWidth
    }

    _Draw () {
        this.ctx.beginPath()
        this.ctx.fillStyle   = this.fillStyle
        this.ctx.fillRect( this.x, this.y, this.width, this.height )
    }
    _Update () {}

    Render () {
        this._Draw()
        this._Update()
    }
}

class Note extends CanvasElement {
    constructor ( ctx, args ) {
        super( ctx, args )
    }
}

class Notes extends CanvasElement {
    constructor ( ctx, notesCount = 7, args = {
        x      : 0,
        y      : 540,
        width  : 1920,
        gap    : 50,
        color  : "white",
    } ) {
        super( ctx, args )

        this.Notes      = []
        this.noteWidth  = ( args.width - args.gap * notesCount ) / notesCount
        this.noteArgs   = {
            x         : args.x + args.gap / 2,
            y         : args.y,
            fillStyle : args.color,
            width     : this.noteWidth || vmin(),
        }

        while ( notesCount-- > 0 ) {
            this.Notes.push( new Note( ctx, this.noteArgs ) )
            
            this.noteArgs.x += this.noteWidth + args.gap
        }
    }

    _Draw ( analyser ) {
        const fbcArray = new Uint8Array( analyser.frequencyBinCount )
        analyser.getByteFrequencyData( fbcArray )
        
        this.Notes.forEach(( note, i ) => {
            const height = -(fbcArray[i] / 2)

            note.height = height < this.noteHeight ? this.noteHeight : height
            note.Render()
        })
    }

    Render ( analyser ) {
        this._Draw( analyser )
        this._Update()
    }
}

function ResizeCanvas () {
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
    notes.Render( analyser )
}

function RenderCanvas () {
    requestAnimationFrame( () => {
        // ClearCanvas ()
        FillCanvas  ()
        DrawCanvas  ()
        RenderCanvas()
    } )
}

function Play () {
    if (audioContext.state === "suspended") {
        audioContext.resume()
    }

    audio.play()
}

function Stop () {
    audio.pause()
}

function PlayerInit () {
    audio         = new Audio( "audio.mp3" )
    audioContext  = new AudioContext()
    analyser      = audioContext.createAnalyser()
    source        = audioContext.createMediaElementSource(audio)

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    ResizeCanvas()
    RenderCanvas()

    const playButton = document.createElement( "button" )
    const stopButton = document.createElement( "button" )

    playButton.textContent = "Play"
    stopButton.textContent = "Stop"

    playButton.addEventListener( "click", Play )
    stopButton.addEventListener( "click", Stop )

    document.body.append( playButton, stopButton, audio, canvas )
}

const notes = new Notes( ctx, 150, {
    x      : 0,
    y      : clientHeight,
    width  : clientWidth,
    gap    : vmin( 0.5 ),
    color  : "white"
} )

window.addEventListener( "load", PlayerInit )
window.addEventListener( "resize", ResizeCanvas )
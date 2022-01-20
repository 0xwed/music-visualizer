import { Note } from "./Note"
import { CanvasElementProperties } from "./AbstractCanvasElement"

export interface StylePropertiesOfNotes extends CanvasElementProperties {
    gap : number
}

export interface NotesConstructorArgs {
    ctx                  : CanvasRenderingContext2D | null,
    notesCount           : number,
    notesStyleProperties : StylePropertiesOfNotes
}

export abstract class AbstractNotes {
    public    notes          : Note[]
    protected ctx            : CanvasRenderingContext2D | null
    protected count          : number
    protected x              : number
    protected y              : number
    protected width          : number
    protected height         : number
    protected gap            : number
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
            height    : 0,
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
        if( !this.ctx ) {
            throw new Error( "Context is not defined" )
        }

        for ( let i : number = 0; i < this.count; i++ ) {
            this.notes.push( new Note( this.ctx, this.noteProperties ) )

            this.changeNotePositionX()
        }
    }

    public abstract Play ( analyser : AnalyserNode ) : void
}
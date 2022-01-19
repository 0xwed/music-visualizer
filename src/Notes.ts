import { NotesConstructorArgs, AbstractNotes } from "./AbstractNotes.js"

export class Notes extends AbstractNotes {
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
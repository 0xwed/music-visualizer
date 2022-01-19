import { AbstractNotes } from "./AbstractNotes.js";
export class Notes extends AbstractNotes {
    constructor({ ctx, notesCount, notesStyleProperties }) {
        super({ ctx, notesCount, notesStyleProperties });
    }
    Play(analyser) {
        const fbcArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbcArray);
        this.notes.forEach((note, i) => {
            const index = i + i % 3;
            const height = -(fbcArray[index] / 2);
            note.SetPitchOfNote(height);
            note.Render();
        });
    }
}
//# sourceMappingURL=Notes.js.map
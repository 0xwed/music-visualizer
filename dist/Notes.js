"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const AbstractNotes_1 = require("./AbstractNotes");
class Notes extends AbstractNotes_1.AbstractNotes {
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
exports.Notes = Notes;
//# sourceMappingURL=Notes.js.map
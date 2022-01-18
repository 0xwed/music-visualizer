"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractNotes = void 0;
const Note_1 = require("./Note");
class AbstractNotes {
    constructor({ ctx, notesCount, notesStyleProperties }) {
        this.ctx = ctx;
        this.count = notesCount;
        this.x = notesStyleProperties.x;
        this.y = notesStyleProperties.y;
        this.width = notesStyleProperties.width;
        this.height = notesStyleProperties.height;
        this.gap = notesStyleProperties.gap;
        this.notes = [];
        this.noteProperties = {
            x: notesStyleProperties.x,
            y: notesStyleProperties.y,
            width: this.getNoteWidth(),
            height: 0,
            fillStyle: notesStyleProperties.fillStyle,
        };
        this.createNotes();
    }
    getNoteWidth() {
        const noteWidth = (this.width - this.gap * this.count) / this.count;
        return noteWidth;
    }
    changeNotePositionX() {
        this.noteProperties.x += this.noteProperties.width + this.gap;
    }
    createNotes() {
        if (!this.ctx) {
            throw new Error("Context is not defined");
        }
        for (let i = 0; i < this.count; i++) {
            this.notes.push(new Note_1.Note(this.ctx, this.noteProperties));
            this.changeNotePositionX();
        }
    }
}
exports.AbstractNotes = AbstractNotes;
//# sourceMappingURL=AbstractNotes.js.map
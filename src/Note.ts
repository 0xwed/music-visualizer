import { AbstractCanvasElement } from "./AbstractCanvasElement.js"

export class Note extends AbstractCanvasElement {
    public SetPitchOfNote ( height : number ) : void {
        this.height = height
    }
}
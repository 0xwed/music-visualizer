import { AbstractCanvasElement } from "./AbstractCanvasElement"

export class Note extends AbstractCanvasElement {
    public SetPitchOfNote ( height : number ) : void {
        this.height = height
    }
}
export interface CanvasElementProperties {
    x            : number
    y            : number
    width        : number
    height       : number
    lineWidth   ?: number
    fillStyle   ?: string
    strokeStyle ?: string
}

export abstract class AbstractCanvasElement {
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
        this.lineWidth   = properties.lineWidth   ?? 0
        this.fillStyle   = properties.fillStyle   ?? "grey"
        this.strokeStyle = properties.strokeStyle ?? "rgba(0, 0, 0, 0)"
    }

    protected _Draw ()   : void {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.fillStyle
        this.ctx.fillRect( this.x, this.y, this.width, this.height )
    }
    protected _Update () : void {}
    public Render ()  : void {
        this._Draw()
        this._Update()
    }
}
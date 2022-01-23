import { clientWidth, clientHeight } from "./Measures"

interface Args {
    ctx     : CanvasRenderingContext2D | null,
    x      ?: number,
    y      ?: number,
    width  ?: number,
    height ?: number
}

export function ClearCanvas ( { ctx, x = 0, y = 0, width = clientWidth, height = clientHeight } : Args ) {
    ctx?.fillRect( x, y, width, height )
}

interface FillCanvasArgs extends Args {
    color ?: string,
}

export function FillCanvas ( { ctx, color = "rgba(0,0,0,0.8)", x = 0, y = 0, width = clientWidth, height = clientHeight } : FillCanvasArgs ) {
    if( ctx?.fillStyle ) {
        ctx.fillStyle = color
    }
    ctx?.fillRect( x, y, width, height )
}

export function RenderCanvas ( ...functions : VoidFunction[] ) {
    for ( const fn of functions ) {
        new Promise(( res ) => res( fn ))
            .catch( rej => {
                throw new Error( rej )
            } )
    }

    requestAnimationFrame( () => RenderCanvas( ...functions ) )
}
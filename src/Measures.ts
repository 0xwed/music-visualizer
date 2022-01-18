const clientWidth  : number = document.documentElement.clientWidth
const clientHeight : number = document.documentElement.clientHeight

/*
    vw - 1% of display width
    vh - 1% of display height
    vmin - 1% of the smallest display side
    vmax - 1% of the largest display side
*/

const vw   = ( f : number = 1 ) : number => clientWidth  / 100 * f
const vh   = ( f : number = 1 ) : number => clientHeight / 100 * f
const vmin = ( f : number = 1 ) : number => vw() > vh() ? vh( f ) : vw( f )
const vmax = ( f : number = 1 ) : number => vw() < vh() ? vh( f ) : vw( f )

export {
    clientWidth,
    clientHeight,
    vw,
    vh,
    vmin,
    vmax
}
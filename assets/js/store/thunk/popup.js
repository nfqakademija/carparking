import { saveCoordinates, noCoordinates } from '../actions/index';

export const getCoordinates = (first, last) => dispatch => {
    setTimeout(
        () => { 
            const left = `${first.current.offsetLeft}px`;
            const width = `${last.current.offsetLeft+last.current.offsetWidth-first.current.offsetLeft}px`;
            if ( left && width ) {
                dispatch(saveCoordinates(left, width))
            } else {
                dispatch(noCoordinates())
            }
        }, 1000
    )
}
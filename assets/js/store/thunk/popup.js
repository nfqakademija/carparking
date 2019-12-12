import { saveCoordinates, noCoordinates, popupOpenedStart, popupOpenedReset } from '../actions/index';

export const getCoordinates = (first, last) => dispatch => {
    const left = `${first.current.offsetLeft}px`;
    const width = `${last.current.offsetLeft+last.current.offsetWidth-first.current.offsetLeft}px`;
    dispatch(saveCoordinates(left, width))       
}

export const popupOpened = () => dispatch => {
    dispatch(popupOpenedStart()),
    setTimeout(
        () => dispatch(popupOpenedReset()),
        500
    )
}

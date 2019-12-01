import { saveCoordinates, noCoordinates } from '../actions/index';

export const getCoordinates = (first, last) => dispatch => {
    const left = `${first.current.offsetLeft}px`;
    const width = `${last.current.offsetLeft+last.current.offsetWidth-first.current.offsetLeft}px`;
    dispatch(saveCoordinates(left, width))       
}
import * as actionTypes from './actionTypes';

export const fetchSingleUserStart = () => {
    return {
        type: actionTypes.FETCH_SINGLE_USER_START
    }
}

export const fetchSingleUserSuccess = user => {
    return {
        type: actionTypes.FETCH_SINGLE_USER_SUCCESS,
        user
    }
}

export const fetchSingleUserFail = err => {
    return {
        type: actionTypes.FETCH_SINGLE_USER_SUCCESS,
        err
    }
}
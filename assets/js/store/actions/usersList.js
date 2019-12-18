import * as actionTypes from './actionTypes';

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    }
}

export const fetchUsersSuccess = users => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users
    }
}

export const fetchUsersFail = err => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        err
    }
}



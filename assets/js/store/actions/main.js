import * as actionTypes from './actionTypes';

export const login = () => {
    return {
        type: actionTypes.LOGIN
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const getHomeDataStart = () => {
    return {
        type: actionTypes.GET_HOME_DATA_START
    }
}

export const getHomeDataSuccess = (data, user) => {
    return {
        type: actionTypes.GET_HOME_DATA_SUCCESS,
        data,
        user
    }
}

export const getHomeDataFail = (data, user) => {
    return {
        type: actionTypes.GET_HOME_DATA_FAIL,
        data,
        user
    }
}

export const getHomeUsersStart = () => {
    return {
        type: actionTypes.GET_HOME_USERS_START
    }
}

export const getHomeUsersSuccess = (users) => {
    return {
        type: actionTypes.GET_HOME_USERS_SUCCESS,
        users
    }
}


export const saveCoordinates = (left, width) => {
    return {
        type: actionTypes.SAVE_COORDINATES,
        left,
        width
    }
}

export const noCoordinates = () => {
    return {
        type: actionTypes.NO_COORDINATES
    }
}

export const buttonClicked = (date, buttonType) => {
    return {
        type: actionTypes.BUTTON_CLICKED,
        date,
        buttonType
    }
}

export const popupCancel = () => {
    return {
        type: actionTypes.POPUP_CANCEL
    }
}
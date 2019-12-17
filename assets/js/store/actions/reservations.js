import * as actionTypes from './actionTypes';

export const fetchReservationsStart = () => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_START
    }
}

export const fetchReservationsSuccess = parkingLotStatus => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_SUCCESS,
        parkingLotStatus
    }
}

export const fetchReservationsFail = err => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_FAIL,
        err
    }
}

export const popupAcceptStart = () => {
    return {
        type: actionTypes.POPUP_ACCEPT_START
    }
}

export const popupAcceptSuccess = () => {
    return {
        type: actionTypes.POPUP_ACCEPT_SUCCESS
    }
}

export const popupAcceptFail = (err) => {
    return {
        type: actionTypes.POPUP_ACCEPT_FAIL,
        err
    }
}

export const popupCancel = () => {
    return {
        type: actionTypes.POPUP_CANCEL
    }
}

export const popupSuccess = () => {
    return {
        type: actionTypes.POPUP_SUCCESS
    }
}

export const popupStyleReset = () => {
    return {
        type: actionTypes.POPUP_STYLE_RESET
    }
}

export const saveCoordinates = (left, width) => {
    return {
        type: actionTypes.SAVE_COORDINATES,
        left,
        width
    }
}
export const fetchOneDayDataStart = (date) => {
    return {
        type: actionTypes.FETCH_ONE_DAY_DATA_START,
        date
    }
}

export const fetchOneDayDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ONE_DAY_DATA_SUCCESS,
        data
    }
}

export const fetchOneDayDataFail = err => {
    return {
        type: actionTypes.FETCH_ONE_DAY_DATA_FAIL,
        err
    }
}

export const buttonClicked = (date, buttonType, switchUser) => {
    return {
        type: actionTypes.BUTTON_CLICKED,
        date,
        buttonType,
        switchUser
    }
}

export const popupOpenedStart = () => {
    return {
        type: actionTypes.POPUP_OPENED_START
    }
}

export const popupOpenedReset = () => {
    return {
        type: actionTypes.POPUP_OPENED_RESET
    }
}
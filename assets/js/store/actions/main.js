import * as actionTypes from './actionTypes';

export const login = (id) => {
    return {
        type: actionTypes.LOGIN,
        id
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

export const getUsersStart = () => {
    return {
        type: actionTypes.GET_USERS_START
    }
}

export const getUsersSuccess = users => {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        users
    }
}

export const getUsersFail = err => {
    return {
        type: actionTypes.GET_USERS_FAIL,
        err
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

export const buttonClicked = (date, buttonType, switchUser) => {
    return {
        type: actionTypes.BUTTON_CLICKED,
        date,
        buttonType,
        switchUser
    }
}

export const popupCancel = () => {
    return {
        type: actionTypes.POPUP_CANCEL
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

export const openMobileMenu = () => {
    return {
        type: actionTypes.OPEN_MENU
    }
}

export const closeMobileMenu = () => {
    return {
        type: actionTypes.CLOSE_MENU
    }
}

export const setPlateNumber = (numbers) => {
    return {
        type: actionTypes.SET_PLATE_NUMBER,
        data: numbers
    }
}

export const setPlateStatus = (status) => {
    console.log(status)
    return {
        type: actionTypes.SET_PLATE_STATUS,
        data: status
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

export const setNotification = () => {
    return {
        type: actionTypes.SET_NOTIFICATION
    }
}

export const notificationPopupCancel = () => {
    return {
        type: actionTypes.NOTIFICATION_POPUP_CANCEL
    }
}

export const notificationPopupAcceptStart = () => {
    return {
        type: actionTypes.NOTIFICATION_POPUP_ACCEPT_START
    }
}

export const notificationPopupAcceptSuccess = () => {
    return {
        type: actionTypes.NOTIFICATION_POPUP_ACCEPT_SUCCESS
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

export const openModal = () => {
    return {
        type: actionTypes.OPEN_PLATE_MODAL
    }
}

export const closeModal = () => {
    return {
        type: actionTypes.CLOSE_PLATE_MODAL
    }
}

export const setAwaysDates = (data) => {
    return {
        type: actionTypes.GET_AWAYS_DATES,
        data: data
    }
};

export const postAwayStatus = (status) => {
    return {
        type: actionTypes.POST_AWAY_STATUS,
        data: status
    }
}

export const postAwayDefaultStatus = () => {
    return {
        type: actionTypes.POST_AWAY_DEFAULT_STATUS
    }
}

export const postAwayStatusLoading = () => {
    return {
        type: actionTypes.POST_AWAY_STATUS_LOADING
    }
}

export const changeAwayLoadingStatus = (status) => {
    return {
        type: actionTypes.AWAY_HISTORY_LOADING,
        data: status
    }
}

export const getSingleUserStart = () => {
    return {
        type: actionTypes.GET_SINGLE_USER_START
    }
}

export const getSingleUserSuccess = user => {
    return {
        type: actionTypes.GET_SINGLE_USER_SUCCESS,
        user
    }
}

export const getSingleUserFail = err => {
    return {
        type: actionTypes.GET_SINGLE_USER_SUCCESS,
        err
    }
}

export const getReservationsStart = () => {
    return {
        type: actionTypes.GET_RESERVATIONS_START
    }
}

export const getReservationsSuccess = parkingLotStatus => {
    return {
        type: actionTypes.GET_RESERVATIONS_SUCCESS,
        parkingLotStatus
    }
}

export const getReservationsFail = err => {
    return {
        type: actionTypes.GET_RESERVATIONS_FAIL,
        err
    }
}

export const getNotifications = () => {
    return {
        type: actionTypes.GET_NOTIFICATIONS
    }
}
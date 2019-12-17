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






export const noCoordinates = () => {
    return {
        type: actionTypes.NO_COORDINATES
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
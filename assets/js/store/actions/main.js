import * as actionTypes from './actionTypes';

export const login = (id, token) => {
    return {
        type: actionTypes.LOGIN,
        token,
        id
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
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

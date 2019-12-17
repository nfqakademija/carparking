import * as actionTypes from './actionTypes';

export const fetchNotificationsStart = () => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_START
    }
}

export const fetchNotificationsSuccess = notifications => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        notifications
    }
}

export const fetchNotificationsFail = err => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
        err
    }
}
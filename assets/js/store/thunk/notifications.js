import axios from 'axios';
import * as actions from '../actions/index';

const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const token = getCookie('Bearer-token');

const config = {
    headers: {"Authorization": token}
};

// accept and give parking space to guest
export const notificationAccept = notificationId => dispatch => {
    axios.post(`/api/notification-accept/${notificationId}`, config)
        .then(() =>
            dispatch(fetchSignleUserAndNotifications()))
}

// cancel and dont give parking space to guest
export const notificationReject = notificationId => dispatch => {
    const putData = {
        "notificationId": notificationId,
        "rejected": 1
    }
    axios.put(`/api/notifications`, putData, config)
        .then(() =>
            dispatch(fetchSignleUserAndNotifications()))
}

// cancel switch. Take back parking spot from guest
export const notificationCancel = notificationId => dispatch => {
    axios.delete(`/api/notification-cancel/${notificationId}`, config)
        .then(() =>
            dispatch(fetchSignleUserAndNotifications()))
}

export const fetchNotifications = (userId, userRole) => dispatch => {
    dispatch(actions.fetchNotificationsStart())
    axios.get(`/api/notifications/${userId}/${userRole}`, config)
        .then(res => {
            dispatch(actions.fetchNotificationsSuccess(res.data))
        })
        .catch(err => {
            dispatch(actions.fetchNotificationsFail(err))
        })
}


export const fetchSignleUserAndNotifications = () => dispatch => {
    dispatch(actions.fetchSingleUserStart());

    const id = getCookie('userId');

    axios.get(`/api/single-user/`+id, config)
        .then(res => {
            console.log(res);
            dispatch(actions.fetchSingleUserSuccess(res.data))
            dispatch(fetchNotifications(res.data.userId, res.data.role))
        })
        .catch(err => {
            console.log(err);
            dispatch(actions.fetchSingleUserFail(err))
        })
}


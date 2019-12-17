import axios from 'axios';
import * as actions from '../actions/index';

// accept and give parking space to guest
export const notificationAccept = notificationId => dispatch => {
    axios.post(`/api/notification-accept/${notificationId}`)
        .then(() =>
            dispatch(fetchSignleUserAndNotifications()))
}

// cancel and dont give parking space to guest
export const notificationReject = notificationId => dispatch => {
    const putData = {
        "notificationId": notificationId,
        "rejected": 1
    }
    axios.put(`/api/notifications`, putData)
        .then(() =>
            dispatch(fetchSignleUserAndNotifications()))
}

// cancel switch. Take back parking spot from guest
export const notificationCancel = notificationId => dispatch => {
    axios.delete(`/api/notification-cancel/${notificationId}`)
        .then(() =>
            dispatch(fetchSignleUserAndNotifications()))
}

export const fetchNotifications = (userId, userRole) => dispatch => {
    dispatch(actions.fetchNotificationsStart())
    axios.get(`/api/notifications/${userId}/${userRole}`)
        .then(res => {
            dispatch(actions.fetchNotificationsSuccess(res.data))
        })
        .catch(err => {
            dispatch(actions.fetchNotificationsFail(err))
        })
}

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

export const fetchSignleUserAndNotifications = () => dispatch => {
    dispatch(actions.fetchSingleUserStart());

    const token = getCookie('PHPSESSID');

    var config = {
        headers: {"Authorization": token}
    };

    console.log(token);

    console.log(config)


    axios.get(`/api/single-user/13`, config)
        .then(res => {
            console.log("Asd");
            dispatch(actions.fetchSingleUserSuccess(res.data))
            dispatch(fetchNotifications(res.data.userId, res.data.role))
        })
        .catch(err => {
            console.log(err);
            dispatch(actions.fetchSingleUserFail(err))
        })
}


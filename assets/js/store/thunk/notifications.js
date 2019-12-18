import axios from 'axios';
import * as actions from '../actions/index';
import {getCookie} from './getCookie';

const userId = getCookie('userId')

const nameToFirstUpperLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1)
}

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

export const fetchNotifications = userRole => dispatch => {
    dispatch(actions.fetchNotificationsStart())
    axios.get(`/api/notifications/${userId}/${userRole}`)
        .then(res => {
            dispatch(actions.fetchNotificationsSuccess(res.data))
        })
        .catch(err => {
            dispatch(actions.fetchNotificationsFail(err))
        })
}




export const fetchSignleUserAndNotifications = () => dispatch => {
    dispatch(actions.fetchSingleUserStart());
    
    axios.get(`/api/single-user/${userId}`)
        .then(res => {
            const name = nameToFirstUpperLetter(res.data.name)
            const surname = nameToFirstUpperLetter(res.data.surname)
            let user = res.data
            user.name = name
            user.surname = surname
            dispatch(actions.fetchSingleUserSuccess(user))
            dispatch(fetchNotifications(res.data.userId, res.data.role))
        })
        .catch(err => {
            console.log('labas');
            dispatch(actions.fetchSingleUserFail(err))
        })
}


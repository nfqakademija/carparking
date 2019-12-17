import axios from 'axios';
import * as actions from '../actions/index';

// accept and give parking space to guest
export const notificationAccept = notificationId => dispatch => {
    axios.post(`/api/notification-accept/${notificationId}`)
        .then(() => 
            dispatch(fetchNotifications()))
}

// cancel and dont give parking space to guest
export const notificationReject = notificationId => dispatch => {
    const putData = {
        "notificationId": notificationId,
        "rejected": 1
    }
    axios.put(`/api/notifications`,putData)
        .then(() => 
            dispatch(fetchNotifications()))
}

// cancel switch. Take back parking spot from guest
export const notificationCancel = notificationId => dispatch => { 
    axios.delete(`/api/notification-cancel/${notificationId}`)
        .then(() => 
            dispatch(fetchNotifications()))
}

export const fetchNotifications = (userId, userRole) => dispatch => {
    dispatch(actions.fetchNotificationsStart())
    axios.get(`/api/notifications/${userId}/${userRole}`)
        .then( res => {
             dispatch(actions.fetchNotificationsSuccess(res.data))
        })
        .catch(err => {
            dispatch(actions.fetchNotificationsFail(err))
        })
}


export const fetchSignleUserAndNotifications = () => dispatch => {
    dispatch(actions.fetchSingleUserStart()) 
    axios.get(`/api/single-user/2`)
        .then( res => { 
            dispatch(actions.fetchSingleUserSuccess(res.data))
            dispatch(fetchNotifications(res.data.userId))
        })
        .catch( err => { 
            dispatch(actions.fetchSingleUserFail(err))
        })
}


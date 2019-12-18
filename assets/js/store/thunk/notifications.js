import axios from 'axios';
import * as actions from '../actions/index';
import {getCookie} from './getCookie';

// const userId = getCookie('userId')

// const token = getCookie('Bearer-token')


// axios.defaults.headers.common = {'Authorization': getState().main.token}


// accept and give parking space to guest
export const notificationAccept = notificationId => (dispatch, getState) => {

    const config = {
        headers: {"Authorization": getState().main.token}
    };

    axios.post(`/api/notification-accept/${notificationId}`,config)
        .then(() =>
            dispatch(fetchSignleUserAndNotifications()))
}

// cancel and dont give parking space to guest
export const notificationReject = notificationId => (dispatch, getState) => {

    const config = {
        headers: {"Authorization": getState().main.token}
    };

    const putData = {
        "notificationId": notificationId,
        "rejected": 1
    }
    axios.put(`/api/notifications`, putData, config)
        .then(() =>
            dispatch(fetchSignleUserAndNotifications()))
}

// cancel switch. Take back parking spot from guest
export const notificationCancel = notificationId => (dispatch, getState) => {

    const config = {
        headers: {"Authorization": getState().main.token}
     };

    axios.delete(`/api/notification-cancel/${notificationId}`,config)
        .then((res) =>{

            dispatch( fetchSignleUserAndNotifications() )})
}

export const fetchNotifications = (userId,userRole) => (dispatch, getState) => {

    const config = {
        headers: {"Authorization": getState().main.token}
    };

    dispatch(actions.fetchNotificationsStart())
    axios.get(`/api/notifications/${userId}/${userRole}`,config)
        .then(res => {
            dispatch(actions.fetchNotificationsSuccess(res.data))
        })
        .catch(err => {
            dispatch(actions.fetchNotificationsFail(err))
        })
}

export const fetchSignleUserAndNotifications = () => (dispatch,getState) => {

    const config = {
        headers: {"Authorization": getState().main.token}
     };

    dispatch(actions.fetchSingleUserStart());

    axios.get(`/api/single-user/${userId}`,config)
        .then(res => {
            
            dispatch(actions.fetchSingleUserSuccess(res.data))

            dispatch(fetchNotifications(res.data.userId, res.data.role))
        })
        .catch(err => {

            dispatch(actions.fetchSingleUserFail(err))
        })
}


import axios from 'axios';
import * as actions from '../actions/index';
import { getCoordinates } from './popup';
import { fetchNotifications } from './notifications';

export const fetchReservations = () => dispatch => {
    dispatch(actions.fetchReservationsStart());
    axios.get(`/api/reservations`)
        .then( res => {
            dispatch(actions.fetchReservationsSuccess(res.data))
        })
        .catch( err => {
            dispatch(actions.fetchReservationsFail(err))
        })
}

export const popupAcceptClicked = (date, actionType, user) => (dispatch, getState) => {
    if(getState().singleUser.user.licensePlate){ // check if user have active licencePlate

        dispatch(actions.popupAcceptStart());

        if(getState().singleUser.user.role === "user"){
            switch (actionType) {
                case 'danger': dispatch(userCancel(date))
                    break
                case 'success': dispatch(userReserve(date))
                    break 
            }
        } else {
            switch (actionType) {
                case 'danger': dispatch(guestCancel(date))
                    break
                case 'success': dispatch(guestReserve(date))
                    break 
                case 'neutral': dispatch(guestAskForSwitch(date, user))
                    break
            }
        }
    } else {dispatch(actions.openModal())}
}

const userReserve = date => (dispatch, getState) => { // ther is 3 cases, latter i will try to split this function
    const userAways = getState().singleUser.user.userAways
    const getMonthDay = date => new Date(date).getDate()
    const foundAway = userAways.find(away => 
            getMonthDay(away.awayStartDate.date) <= getMonthDay(date) 
        &&  getMonthDay(away.awayEndDate.date) >= getMonthDay(date))
    const startDate = foundAway.awayStartDate.date
    const endDate = foundAway.awayEndDate.date
    const dateObj = new Date(date) 
    const endDateObj = new Date(foundAway.awayEndDate.date)
    const startDateObj = new Date(foundAway.awayStartDate.date)
    
    if(startDate === endDate){ // interval is one day
        const deleteData = { "awayDate": [ {"id": foundAway.id} ] }
        axios.delete('/api/useraway', {data: deleteData})
            .then(() => {
                dispatch(actions.popupAcceptSuccess())
                dispatch(successTimer())
                dispatch(fetchOneDayData(date))
            })
            .catch((err) => {
                dispatch(actions.popupAcceptFail(err))
                dispatch(successTimer())
                dispatch(fetchOneDayData(date))
            })
    } else { // intrerval is more than one day 
        
        if(startDateObj.getDate() === dateObj.getDate()) { //interval starts from given day
            const startDay = new Date(dateObj.setDate(dateObj.getDate()+1)).toISOString().slice(0,-14) //changing format to 'yyyy-mm-dd'
            const endDay = new Date(endDateObj.setDate(endDateObj.getDate()+1)).toISOString().slice(0,-14) //changing format to 'yyyy-mm-dd'
            const putData = {
                        "awayDate": [ { "id": foundAway.id,
                            "awayStartDate": startDay,
                            "awayEndDate": endDay} ]
            } 
            dispatch(putUserAway(putData, date))

        } else if(endDateObj.getDate() === dateObj.getDate()) { // interval ends to given day date
            const startDay = new Date(startDateObj.setDate(startDateObj.getDate()+1)).toISOString().slice(0,-14) //changing format to 'yyyy-mm-dd'
            const endDay = endDateObj.toISOString().slice(0,-14) //changing format to 'yyyy-mm-dd'
            const putData = {
                "awayDate": [ { "id": foundAway.id,
                    "awayStartDate": startDay,
                    "awayEndDate": endDay} ]
            }
            dispatch(putUserAway(putData, date))

        } else { // given date is in a middle of interval
            const newDateObj = new Date(dateObj)
            const firstStartDay = new Date(startDateObj.setDate(startDateObj.getDate()+1)).toISOString().slice(0,-14) //changing format to 'yyyy-mm-dd'
            const firstEndDay = new Date(dateObj.setDate(dateObj.getDate()-1)).toISOString().slice(0,-14) //changing format to 'yyyy-mm-dd'
            const secondStartDay = new Date(newDateObj.setDate(newDateObj.getDate()+1)).toISOString().slice(0,-14) //changing format to 'yyyy-mm-dd'
            const secondEndDay = new Date(endDateObj.setDate(endDateObj.getDate()+1)).toISOString().slice(0,-14) //changing format to 'yyyy-mm-dd'

            const putData = {
                "awayDate": [{ "id": foundAway.id,
                    "awayStartDate": firstStartDay, 
                    "awayEndDate": firstEndDay}]
            }

            const postData = {
                "id": getState().singleUser.user.userId,
                "awayDate": [
                    {"awayStartDate" :secondStartDay,"awayEndDate":secondEndDay}
                ]
            }

            axios.put('/api/useraway',putData) // change away from start to given day
            .then(() => {
                axios.post('/api/useraway',postData) // post other away from given day to old away end day
                    .then(() => {
                        dispatch(actions.popupAcceptSuccess())
                        dispatch(successTimer())
                        dispatch(fetchOneDayData(date))
                    })
                    .catch((err) => {
                        dispatch(actions.popupAcceptFail(err))
                        dispatch(successTimer())
                        dispatch(fetchOneDayData(date))
                    })
            })
            .catch((err) => {
                dispatch(actions.popupAcceptFail(err))
                dispatch(successTimer())
                dispatch(fetchOneDayData(date))
            })   
        }  
    }
}

const userCancel = date => (dispatch, getState) => {
    const postData = {
        "id": getState().singleUser.user.userId,
        "awayDate": [
            {"awayStartDate" :date,"awayEndDate":date}]
        }
    axios.post('/api/useraway',postData)
        .then(() => {
            dispatch(actions.popupAcceptSuccess()) 
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        })
        .catch((err) => {
            dispatch(actions.popupAcceptFail(err))
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        })
}

const guestReserve = date => (dispatch, getState) => {
    const postData = {
        "id": getState().singleUser.user.userId,
        "reservations": [
            {"reservationDate" :date}
        ]
    }
    axios.post('/api/reservations', postData)
        .then( () =>{
                dispatch(actions.popupAcceptSuccess())
                dispatch(successTimer())
                dispatch(fetchOneDayData(date))
        })
        .catch((err) => {
            dispatch(actions.popupAcceptFail(err))
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        }) 
}

const guestCancel = date => (dispatch, getState) => {
    const dateObj = new Date(date)
    const userReservations = getState().singleUser.user.reservations
    const reservation = userReservations.find(reservation => new Date(reservation.reservationDate.date).getDate() === dateObj.getDate())
    const reservationId = reservation.id
    const deleteData = {
        "reservations": [
            {"id": reservationId}
        ]
    }
    axios.delete('/api/reservations',{data: deleteData})
        .then(() => {
            dispatch(actions.popupAcceptSuccess())
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        })
        .catch((err) => {
            dispatch(actions.popupAcceptFail(err))
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        }) 
}

const guestAskForSwitch = (date, user) => (dispatch, getState) => {
     const myId = getState().singleUser.user.userId
     const otherUserId = user.userId //*
     const postData = {
        "guestId": myId,
        "userId": otherUserId,
        "requestDate" : date
    }
    axios.post('/api/notifications',postData)
        .then(res => {
            if(res.data.error) { // if you already asked this person
                dispatch(actions.popupAcceptFail(res.data.error))
            } else {
                dispatch(actions.popupAcceptSuccess())
            }
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
            dispatch(fetchNotifications())
        })
        .catch((err) => {
            dispatch(actions.popupAcceptFail(err))
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        }) 
 }


 const putUserAway = (putData, date) => dispatch => { // helper used couple of times
    axios.put('/api/useraway',putData)
            .then(() => {
                dispatch(actions.popupAcceptSuccess())
                dispatch(successTimer())
                dispatch(fetchOneDayData(date))
            })
            .catch((err) => {
                dispatch(actions.popupAcceptFail(err))
                dispatch(successTimer())
                dispatch(fetchOneDayData(date))
            })
}

const fetchOneDayData = (date) => dispatch => { // helper combination of fetches. Day status after user new reservations fetched
    dispatch(actions.fetchOneDayDataStart(date))
    axios.get(`/api/single-user/10`)
        .then(res => {
            dispatch(actions.fetchSingleUserSuccess(res.data))
            axios.get(`/api/reservations`)
            .then( res => {
                dispatch(actions.fetchOneDayDataSuccess(res.data))
            })
            .catch( err => { 
                dispatch(actions.fetchOneDayDataFail(err)) 
            })
        })
        .catch( err => { 
            dispatch(actions.fetchSingleUserFail(err)) 
        })
}


export const buttonClickedMid = (date, buttonType, first, last) => dispatch => {
    dispatch(getCoordinates(first, last)),
    dispatch(actions.buttonClicked(date, buttonType))
}

export const successTimer = () => dispatch => {
    setTimeout(
        () => { dispatch(actions.popupSuccess()),
                setTimeout(
                    () => dispatch(actions.popupStyleReset()),
                    500
                )},
        2000
    )
}





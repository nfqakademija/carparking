import axios from 'axios';
import * as actions from '../actions/index';
import { getCoordinates } from '../thunk/popup';

export const getReservations = () => dispatch => {
    dispatch(actions.getReservationsStart());
    axios.get(`/api/reservations`)
        .then( res => {
            dispatch(actions.getReservationsSuccess(res.data))
        })
        .catch( err => {
            dispatch(actions.getReservationsFail(err))
        })
}














export const getSingleUser = () => dispatch => {
    dispatch(actions.fetchSingleUserStart()) //*
    axios.get(`/api/single-user/10`) //*
        .then( res => {
            dispatch(actions.fetchSingleUserSuccess(res.data))
        })
        .catch( err => { //*
            dispatch(actions.popupAcceptFail(err))
            dispatch(successTimer())
        })
}

// home data done
export const getUsersData = () => dispatch => {
    dispatch(actions.fetchUsersStart());
    axios.get('/api/users')
        .then(res =>{ 
            dispatch(actions.fetchUsersSuccess(res.data));
        })
}
// users data done

const putUserAway = (putData, date) => dispatch => {
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

const popupAcceptCaseDanger = date => (dispatch, getState) => {
    const postData = {
        "id": getState().user.userId,
        "awayDate": [
            {"awayStartDate" :date,"awayEndDate":date}]
        }
    axios.post('/api/useraway',postData)
        .then(res => {
            if(res.data.error){
                dispatch(actions.popupAcceptFail(res.data.error))
                
            } else {
                dispatch(actions.popupAcceptSuccess()) 
            }
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        })
        .catch((err) => {
            dispatch(actions.popupAcceptFail(err))
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        })
}

const popupAcceptCaseSuccess = date => (dispatch, getState) => { // ther is 3 cases, latter i will try to split this function
    const foundAway = getState().user.userAways.find(away => 
            new Date(away.awayStartDate.date).getDate() <= new Date(date).getDate() 
        &&  new Date(away.awayEndDate.date).getDate() >= new Date(date).getDate())
    if(foundAway.awayStartDate.date === foundAway.awayEndDate.date){ // one day case
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
    } else { //intrerval case
        const dateObj = new Date(date) 
        const endDateObj = new Date(foundAway.awayEndDate.date)
        const startDateObj = new Date(foundAway.awayStartDate.date)
        if(new Date(foundAway.awayStartDate.date).getDate() === new Date(date).getDate()) { //interval starts from this date
            const startDay = new Date(dateObj.setDate(dateObj.getDate()+1)).toISOString().slice(0,-14)
            const endDay = new Date(endDateObj.setDate(endDateObj.getDate()+1)).toISOString().slice(0,-14)
            const putData = {
                        "awayDate": [ { "id": foundAway.id,
                            "awayStartDate": startDay,
                            "awayEndDate": endDay} ]
            } 
            dispatch(putUserAway(putData, date))
        } else if(new Date(foundAway.awayEndDate.date).getDate() === new Date(date).getDate()) { // interval ends to this date
            const startDay = new Date(startDateObj.setDate(startDateObj.getDate()+1)).toISOString().slice(0,-14)
            const endDay = endDateObj.toISOString().slice(0,-14)
            const putData = {
                "awayDate": [ { "id": foundAway.id,
                    "awayStartDate": startDay,
                    "awayEndDate": endDay} ]
            }
            dispatch(putUserAway(putData, date))
        } else { // date is in interval
            const newDateObj = new Date(dateObj)
            const firstStartDay = new Date(startDateObj.setDate(startDateObj.getDate()+1)).toISOString().slice(0,-14)
            const firstEndDay = new Date(dateObj.setDate(dateObj.getDate()-1)).toISOString().slice(0,-14)
            const secondStartDay = new Date(newDateObj.setDate(newDateObj.getDate()+1)).toISOString().slice(0,-14)
            const secondEndDay = new Date(endDateObj.setDate(endDateObj.getDate()+1)).toISOString().slice(0,-14)
            const putData = {
                "awayDate": [{ "id": foundAway.id,
                    "awayStartDate": firstStartDay, 
                    "awayEndDate": firstEndDay}]
            }
            const postData = {
                "id": getState().user.userId,
                "awayDate": [
                    {"awayStartDate" :secondStartDay,"awayEndDate":secondEndDay}
                ]
            }
            axios.put('/api/useraway',putData)
            .then(() => {
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
            })
            .catch((err) => {
                dispatch(actions.popupAcceptFail(err))
                dispatch(successTimer())
                dispatch(fetchOneDayData(date))
            })   
        }  
    }
}

const popupAcceptCaseSuccessGuest = date => (dispatch, getState) => {
    const postData = {
        "id": getState().user.userId,
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

const popupAcceptCaseDangerGuest = date => (dispatch, getState) => {
    const dateObj = new Date(date)
    const reservation = getState().user.reservations.find(reservation => new Date(reservation.reservationDate.date).getDate() === dateObj.getDate())
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
const popupAcceptCaseNeutralGuest = (date, user) => (dispatch, getState) => {
     const myId = getState().user.userId
     const otherUserId = user.userId //*
     const postData = {
        "guestId": myId,
        "userId": otherUserId,
        "requestDate" : date
    }
    axios.post('/api/notifications',postData)
        .then(res => {
            if(res.data.error) {
                dispatch(actions.popupAcceptFail(res.data.error))
            } else {
                dispatch(actions.popupAcceptSuccess())
            }
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
            dispatch(getNotifications())  //** */ add to reload all page
        })
        .catch((err) => {
            dispatch(actions.popupAcceptFail(err))
            dispatch(successTimer())
            dispatch(fetchOneDayData(date))
        }) 
 }


export const popupAcceptClicked = (date, actionType, user) => (dispatch, getState) => {
    if(getState().user.licensePlate){ // if user already have licence plate
        dispatch(actions.popupAcceptStart());
        if(getState().user.role === "user"){
            switch (actionType) {
                case 'danger': dispatch(popupAcceptCaseDanger(date))
                    break
                case 'success': dispatch(popupAcceptCaseSuccess(date))
                    break 
            }
        } else {
            switch (actionType) {
                case 'danger': dispatch(popupAcceptCaseDangerGuest(date))
                    break
                case 'success': dispatch(popupAcceptCaseSuccessGuest(date))
                    break 
                case 'neutral': dispatch(popupAcceptCaseNeutralGuest(date, user))
                    break
            }
        }
    } else {dispatch(actions.openModal())}
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
const fetchOneDayData = (date) => dispatch => {

    dispatch(actions.fetchOneDayDataStart(date))

    axios.get(`/api/single-user/10`) //* find way to do this fetches at the same time
        .then(res => {
            dispatch(actions.fetchSingleUserSuccess(res.data))
            axios.get(`/api/reservations`)
            .then( res => {
                dispatch(actions.fetchOneDayDataSuccess(res.data))
            })
            .catch( err => { dispatch(actions.fetchOneDayDataFail(err)) })
        })
        .catch( err => { dispatch(actions.fetchSingleUserFail(err)) })
}




import axios from 'axios';
import * as actions from '../actions/index';
import { getCoordinates } from '../thunk/popup';


const createDayObj = () => {
    const reservationStatus = [];
    let dayObject = {
        date: null,
        parkingSpaces: 20,
        usedSpaces: 0,
        userReservation: false,
        userParkingSpot : null
    }
    
    for (let i = 0; reservationStatus.length < 6; i++){
        const date = new Date()
        let newDate = new Date(date.setDate(date.getDate()+i))
        if(newDate.getDay()){
            reservationStatus.push({
                ...dayObject,
                date: new Date(newDate)
            })
        } else {
            reservationStatus.push({
                ...dayObject,
                date: new Date(newDate.setDate(date.getDate()+1))
            })
            i++
        } 
    }
    return reservationStatus
}

export const getSingleUser = () => dispatch => {
    dispatch(actions.getSingleUserStart()) //*
    axios.get(`/api/single-user/4`) //*
        .then( res => {
            dispatch(actions.getSingleUserSuccess(res.data))
        })
        .catch( err => {
            console.log(err)
        })
}

export const getReservations = () => dispatch => {
    dispatch(actions.getReservationsStart());
    axios.get(`/api/reservations`)
        .then( res => {
            dispatch(actions.getReservationsSuccess(res.data))
        })
        .catch( err => {
            console.log(err)
        })
}

export const getHomeData = () => (dispatch, getState) => {
    dispatch(getSingleUser());
    dispatch(getReservations())
    // dispatch(actions.getHomeDataStart());
    // dispatch(fetchHomeData(reservationStatus, user))    
}

export const getUsersData = () => dispatch => {
    dispatch(actions.getHomeUsersStart());
    const users = []
    axios.get('/api/users')
        .then(res =>{ 
            const usersData = res.data
            usersData.map( user => {
                users.push(user)
            })
            dispatch(actions.getHomeUsersSuccess(users));
        })
}

export const popupAcceptClicked = (date, user, actionType) => dispatch => {
    dispatch(actions.popupAcceptStart());
    const newDate = new Date(date)
    const startDate = new Date(newDate).toISOString().slice(0,-14);
    switch (actionType) {
        case 'danger':
            const postData = {
                "id": user.id,
                "away_date": [
                    {"away_start_date" :startDate,"away_end_date":startDate}
                ]
            }
            axios.post('/api/useraway',postData)
                .then(() => {
                    dispatch(actions.popupAcceptSuccess())
                    dispatch(successTimer())
                    dispatch(fetchOneDayData(date))
                })
            break
        case 'success':
            const found = user.aways.find(away => new Date(away['away_start_date']).getDate() == newDate.getDate())
            const deleteData = {
                "away_date": [
                    {"id": found.id}
                ]
            }
            if(new Date(found['away_end_date']).getDate()!= date.getDate()){
                axios.delete('/api/useraway', {data:deleteData})
                    .then( () => {
                        const newPostData = {
                            "id": user.id,
                            "away_date": [
                                {"away_start_date" :startDate,"away_end_date":found['away_end_date']}
                            ]
                        }
                        axios.post('/api/useraway', newPostData)
                            .then(()=>{
                                dispatch(actions.popupAcceptSuccess())
                                dispatch(successTimer())
                            })
                    })
            } else {
                axios.delete('/api/useraway', {data:deleteData})
                .then( () => {
                    dispatch(actions.popupAcceptSuccess())
                    dispatch(successTimer())
                })
            }
            break 
        case 'neutral':
                dispatch(actions.popupAcceptSuccess())
                dispatch(successTimer())
    }   
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
const fetchOneDayData = (date) => (dispatch, getState) => {
    const reservationStatus = getState().reservationStatus
    const dayIndex = reservationStatus.findIndex( dayObj => new Date(dayObj.date).getDate() == new Date(date).getDate())
    reservationStatus[dayIndex].userReservation = false
    reservationStatus[dayIndex].userParkingSpot = null

    dispatch(actions.fetchOneDayDataStart(date))

    axios.get(`/api/reservations`)
        .then( res => {
            const reservations = res.data
            let usedSpaces = 0
            reservations.map( reservation => {
                if( new Date(reservation['reservation_date']).getDate() == new Date(reservationStatus[dayIndex].date).getDate()) {
                    usedSpaces ++
                    if(reservation.user){
                        if (reservation.user.id === getState().user.id) {
                            reservationStatus[dayIndex].userReservation = true
                            reservationStatus[dayIndex].userParkingSpot = reservation['park_space'].number
                        }
                    }
                }
            })
            reservationStatus[dayIndex].usedSpaces = usedSpaces
            dispatch(actions.fetchOneDayDataSuccess(reservationStatus))
        })
}

const fetchHomeData = (reservationStatus, user) => (dispatch, getState) => {
    axios.get(`/api/reservations`)
        .then(res => {
            const data = res.data
            data.map(reservation => {
                const found = reservationStatus.find( dayObj => new Date(dayObj.date).getDate() == new Date(reservation['reservation_date']).getDate())
                const index = reservationStatus.findIndex(obj => obj === found);
                if (index !== -1){
                    const newValue = reservationStatus[index].usedSpaces + 1
                    reservationStatus[index].usedSpaces = newValue
                    if (reservation.user) {
                        if (reservation.user.id === getState().user.id) {
                            reservationStatus[index].userReservation = true
                            reservationStatus[index].userParkingSpot = reservation['park_space'].number
                            user.name = reservation.user.name
                            user.lastname = reservation.user.surname
                            user.activeCar = reservation.user['licence_plate']
                            user.aways = reservation.user['user_aways']
                        }
                    }
                }
        })
        dispatch(actions.getHomeDataSuccess(reservationStatus, user))
    }).catch( ()=>{
        const status = getState().registrationData.reservationStatus
        const user = getState().registrationData.user
        dispatch(actions.getHomeDataFail(status, user))
    }) 
}

export const notificationPopupAccept = (date) => (dispatch, getState) => {
    // fake
    dispatch(actions.notificationPopupAcceptStart());
    const newDate = new Date(date);
    console.log(newDate)
    setTimeout(
        () => {
            dispatch(actions.notificationPopupAcceptSuccess())
            dispatch(successTimer())
            dispatch(fetchOneDayData(newDate))
            setTimeout(
                //after success message
                () =>   {getState().user.notifications[0]
                            ? dispatch(actions.setNotification())
                            : null
                        }
            ,3000)
        }
        , 500
    )
}

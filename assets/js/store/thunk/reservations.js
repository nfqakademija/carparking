import axios from 'axios';
import * as actions from '../actions/index';
import { getCoordinates } from '../thunk/popup';

export const getHomeData = (first, last) => (dispatch, getState) => {
    const reservationStatus = [];
    let dayObject = {
        date: null,
        parkingSpaces: 20,
        usedSpaces: 0,
        userReservation: false,
        userParkingSpot : null
    }
    let user = {
        id: 2,
        name: null,
        lastname: null,
        activeCar: null
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
    } // day objects created

    dispatch(actions.getHomeDataStart());
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
                        }
                    }
                }
        })
        dispatch(actions.getHomeDataSuccess(reservationStatus, user))
        dispatch(getCoordinates(first, last))
    }).catch( ()=>{
        const status = getState().registrationData.reservationStatus
        const user = getState().registrationData.user
        dispatch(actions.getHomeDataFail(status, user))
    })      
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

export const popupAcceptClicked = (date, userId) => dispatch => {
    dispatch(actions.popupAcceptStart());
    const newDate = new Date(date)
    const startDate = new Date(newDate).toISOString().slice(0,-14);
    const endDate = new Date(newDate.setDate(new Date(newDate.getDate()+1))).toISOString().slice(0,-14)
    const data = {
        "id": userId,
        "away_date": [
            {"away_start_date" :startDate,"away_end_date":endDate}
        ]
    }
    axios.post('/api/useraway',data)
        .then(res => {
            dispatch(actions.popupAcceptSuccess())
        })
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

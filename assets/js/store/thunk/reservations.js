import axios from 'axios';
import * as actions from '../actions/index';

export const getHomeData = () => (dispatch, getState) => {
    const reservationStatus = [];
    let dayObject = {
        date: null,
        parkingSpaces: 20,
        usedSpaces: 0,
        userReservation: false,
        userParkingSpot : null
    }
    let user = {
        id: 51,
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
    axios.get(`/api/reservation`)
        .then(res => {
            const data = res.data['hydra:member']

            data.map(reservation => {
                const found = reservationStatus.find( dayObj => new Date(dayObj.date).getDate() == new Date(reservation.reservationDate).getDate())
                const index = reservationStatus.findIndex(obj => obj === found); 
                if (index !== -1){
                    const newValue = reservationStatus[index].usedSpaces + 1
                    reservationStatus[index].usedSpaces = newValue
                    if (reservation.user.id === getState().user.id) {
                        reservationStatus[index].userReservation = true
                        reservationStatus[index].userParkingSpot = reservation.user.userParkSpace.number
                        user.name = reservation.user.name
                        user.lastname = reservation.user.surname
                        user.activeCar = reservation.user.licencePlate
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

export const getUsersData = () => dispatch => {
    dispatch(actions.getHomeUsersStart());
    const users = []
    axios.get('/api/users')
        .then(res =>{ 
            const usersData = res.data['hydra:member']
            usersData.map( user => {
                users.push(user)
            })
            dispatch(actions.getHomeUsersSuccess(users));
        })
}

export const popupAcceptClicked = () => dispatch => {
    dispatch(actions.popupAcceptStart());
    setTimeout(
        () => dispatch(actions.popupAcceptSuccess()),
        1000
    )
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

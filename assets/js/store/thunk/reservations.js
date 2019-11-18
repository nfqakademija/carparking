import axios from 'axios';
import * as actions from '../actions/index';

export const getHomeData = () => (dispatch, getState) => {
    const reservationStatus = [];
    let dayObject = {
        date: null,
        parkingSpaces: 15,
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
    } // day objects created

    dispatch(actions.getHomeDataStart());

    axios.get('http://127.0.0.1:8000/api/reservations')
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
                }
            }
        })
        dispatch(actions.getHomeDataSuccess(reservationStatus))
    })    
}

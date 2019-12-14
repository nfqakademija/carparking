import axios from 'axios';
import * as actions from '../actions/index';
import { getCoordinates } from '../thunk/popup';

export const getSingleUser = () => dispatch => {
    dispatch(actions.getSingleUserStart()) //*
    axios.get(`/api/single-user/2`) //*
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

export const getHomeData = () => dispatch => {
    dispatch(getSingleUser());
    dispatch(getReservations()); 
}
// home data done
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

export const popupAcceptCaseDanger = date => (dispatch, getState) => {
    const postData = {
        "id": getState().user.userId,
        "awayDate": [
            {"awayStartDate" :date,"awayEndDate":date}
        ]
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

export const popupAcceptClicked = (date, actionType) => dispatch => {
    dispatch(actions.popupAcceptStart());
    const startDate = new Date(date).toISOString().slice(0,-14);
    console.log(date);
    console.log(actionType);
    switch (actionType) {
        case 'danger': dispatch(popupAcceptCaseDanger(date))
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
const fetchOneDayData = (date) => dispatch => {

    dispatch(actions.fetchOneDayDataStart(date))

    axios.get(`/api/single-user/2`) //* find way to do this fetches at the same time
        .then(res => {
            dispatch(actions.getSingleUserSuccess(res.data))
            axios.get(`/api/reservations`)
            .then( res => {
                dispatch(actions.fetchOneDayDataSuccess(res.data))
            })
            .catch( err => { dispatch(actions.fetchOneDayDataFail(err)) })
        })
        .catch( err => { dispatch(actions.getSingleUserFail(err)) })
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

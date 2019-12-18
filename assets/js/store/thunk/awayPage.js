import axios from 'axios';
import {setAwaysDates, postAwayStatus, postAwayStatusLoading} from '../actions/index';
import {changeAwayLoadingStatus} from "../actions/main";
import { fetchReservations } from './reservations';
import { fetchSingleUser } from './singleUser';

// const userId = getCookie('userId')

// const token = getCookie('Bearer-token')

export const postDatesAway = (startDate, endDate) => (dispatch, getState) => {
    let status;
    const user = getState().singleUser.user.userId;

    const config = {
        headers: {"Authorization": getState().main.token}
     };

    dispatch(postAwayStatusLoading());

    const postData = {
        "id": user,
        "awayDate": [
            {
                "awayStartDate": startDate,
                "awayEndDate": endDate
            }
        ]
    };

    axios.post('/api/useraway', postData, config)
        .then((response) => {


            if (response.data.error === 'duplicate') {
                status = "duplicate";

            } else if (response.data.success === 'success') {
                // dispatch(getDatesAway());
                dispatch(fetchReservations());
                dispatch(fetchSingleUser());
                status = "success";
            }else{

                status = "fail";
            }

            dispatch(postAwayStatus(status));


        }).catch(error => {
        console.log(error)
        status = "fail";

        dispatch(postAwayStatus(status));
    });
}

export const getDatesAway = () => (dispatch, getState) => {

    const config = {
        headers: {"Authorization": getState().main.token}
    };

    const user = getState().singleUser.user.userId;

    dispatch(changeAwayLoadingStatus(true));

    axios.get(`/api/single-user/${userId}`,config)
        .then((response) => {
            if (response.status === 200) {
                dispatch(setAwaysDates(response.data.userAways));
                dispatch(changeAwayLoadingStatus(false));
            }


        }).catch(error => {

            console.log(error);
            dispatch(changeAwayLoadingStatus(false));
        });
}
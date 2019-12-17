import axios from 'axios';
import {setAwaysDates, postAwayStatus, postAwayStatusLoading} from '../actions/index';
import {changeAwayLoadingStatus} from "../actions/main";
import { fetchReservations } from './reservations';
import { fetchSingleUser } from './singleUser';

const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const token = getCookie('Bearer-token');

const config = {
    headers: {"Authorization": token}
};

export const postDatesAway = (startDate, endDate) => (dispatch, getState) => {
    let status;
    const user = getState().singleUser.user.userId;

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

    console.log((postData))

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

    const user = getState().singleUser.user.userId;

    dispatch(changeAwayLoadingStatus(true));

    axios.get('/api/single-user/' + user, config)
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
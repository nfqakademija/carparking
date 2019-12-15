import axios from 'axios';
import {setAwaysDates, postAwayStatus, postAwayStatusLoading} from '../actions/index';
import {changeAwayLoadingStatus} from "../actions/main";

export const postDatesAway = (startDate, endDate) => (dispatch, getState) => {
    let status;
    const user = getState().user.userId;

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

    axios.post('/api/useraway', postData)
        .then((response) => {


            if (response.data.error === 'duplicate') {
                status = "duplicate";

            } else if (response.data.success === 'success') {
                dispatch(getDatesAway());
                status = "success";
            }else{
                status = "fail";
            }

            dispatch(postAwayStatus(status));


        }).catch(error => {

        status = "fail";

        dispatch(postAwayStatus(status));
    });
}

export const getDatesAway = () => (dispatch, getState) => {

    const user = getState().user.userId;

    dispatch(changeAwayLoadingStatus(true));

    axios.get('/api/single-user/' + user)
        .then((response) => {


            if (response.status === 200) {
                let data = response.data.userAways;
                console.log(response.data)

                data.forEach(data =>
                    (
                        data.awayEndDate = data.awayEndDate.date.slice(0, 10),
                            data.awayStartDate = data.awayStartDate.date.slice(0, 10),
                            delete data.id
                    )
                );

                dispatch(setAwaysDates(data));
                dispatch(changeAwayLoadingStatus(false));
            }


        }).catch(error => {

        console.log(error);
        dispatch(changeAwayLoadingStatus(false));
    });
}
import axios from 'axios';
import { postAway, postAwayStatus, postAwayStatusLoading } from '../actions/index';

export const postDatesAway = (startDate, endDate) => (dispatch, getState) => {
    let status;
    const userId = getState().user.userId;

    dispatch(postAwayStatusLoading());

    const postData = {
        "id": userId,
        "awayDate": [
            {"awayStartDate": startDate, "awayEndDate": endDate}
        ]
    };
    console.log(startDate)
    console.log(endDate)
    axios.post('/api/useraway',postData)
        .then((response) => {

            status = "success";
            dispatch(postAway(postData.awayDate));
            dispatch(postAwayStatus(status));

        }).catch(error => {

            status = "fail";

            dispatch(postAwayStatus(status));
    });
}
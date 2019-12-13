import axios from 'axios';
import { postAway, postAwayStatus, postAwayStatusLoading } from '../actions/index';

export const postDatesAway = (startDate, endDate) => (dispatch, getState) => {
    let status;
    const user = getState().user.id;

    dispatch(postAwayStatusLoading());

    const postData = {
        "id": user,
        "away_date": [
            {"away_start_date": startDate, "away_end_date": endDate}
        ]
    };
    axios.post('/api/useraway',postData)
        .then((response) => {

            status = "success";
            dispatch(postAway(postData.away_date));
            dispatch(postAwayStatus(status));

        }).catch(error => {

            status = "fail";

            dispatch(postAwayStatus(status));
    });
}
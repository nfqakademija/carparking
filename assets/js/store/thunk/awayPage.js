import axios from 'axios';
import { postAway } from '../actions/index';

export const postDatesAway = (startDate, endDate) => (dispatch, getState) => {
    const user = getState().user.id;

    const postData = {
        "id": user,
        "away_date": [
            {"away_start_date": startDate,"away_end_date": endDate}
        ]
    };
    axios.post('/api/useraway',postData)
        .then((response) => {
            console.log(response);
            dispatch(postAway(postData.away_date))
        }).catch(error => {
        console.log(error.response)
    });


}
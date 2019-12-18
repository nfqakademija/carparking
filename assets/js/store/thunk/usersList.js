import axios from 'axios';
import * as actions from '../actions/index';

export const fetchUsersData = () => dispatch => {
    dispatch(actions.fetchUsersStart());
    axios.get('/api/users')
        .then(res => { 
            dispatch(actions.fetchUsersSuccess(res.data));
        })
        .catch(err => {
            dispatch(actions.fetchUsersFail(err));
        })
}
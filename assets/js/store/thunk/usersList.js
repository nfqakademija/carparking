import axios from 'axios';
import * as actions from '../actions/index';

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

export const fetchUsersData = () => dispatch => {
    dispatch(actions.fetchUsersStart());
    axios.get('/api/users', config)
        .then(res => { 
            dispatch(actions.fetchUsersSuccess(res.data));
        })
        .catch(err => {
            dispatch(actions.fetchUsersFail(err));
        })
}
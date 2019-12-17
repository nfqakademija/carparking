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

export const fetchSingleUser = () => (dispatch, getState) => {
    dispatch(actions.fetchSingleUserStart())

    const user = getState().singleUser.user.userId;

    axios.get(`/api/single-user/`+user, config) //*
        .then( res => {
            console.log(res.data)
            dispatch(actions.fetchSingleUserSuccess(res.data))
        })
        .catch( err => { 
            dispatch(actions.fetchSingleUserFail(err))
        })
}
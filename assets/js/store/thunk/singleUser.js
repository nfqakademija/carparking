import axios from 'axios';
import * as actions from '../actions/index';
import {getCookie} from './getCookie';

// const userId = getCookie('userId')

// const token = getCookie('Bearer-token')

// axios.defaults.headers.common = {'Authorization': getToken()}

export const fetchSingleUser = () => (dispatch, getState) => {

    const config = {
        headers: {"Authorization": getState().main.token}
     };

    dispatch(actions.fetchSingleUserStart())

    axios.get(`/api/single-user/${getState().main.userId}`,config)
            
        .then( res => {

            dispatch(actions.fetchSingleUserSuccess(res.data))
        })
        .catch( err => { 
            dispatch(actions.fetchSingleUserFail(err))
        })
}
import axios from 'axios';
import * as actions from '../actions/index';
import {getCookie} from './getCookie';

const userId = getCookie('userId')

const token = getCookie('Bearer-token')

axios.defaults.headers.common = {'Authorization': token}

export const fetchSingleUser = () => dispatch => {

    dispatch(actions.fetchSingleUserStart())

    axios.get(`/api/single-user/${userId}`)
            
        .then( res => {

            dispatch(actions.fetchSingleUserSuccess(res.data))
        })
        .catch( err => { 
            dispatch(actions.fetchSingleUserFail(err))
        })
}
import axios from 'axios';
import * as actions from '../actions/index';
import {getCookie} from './getCookie';

const userId = getCookie('userId')

export const fetchSingleUser = () => dispatch => {
    dispatch(actions.fetchSingleUserStart())
    axios.get(`/api/single-user/${userId}`) //*
        .then( res => {
            dispatch(actions.fetchSingleUserSuccess(res.data))
        })
        .catch( err => { 
            dispatch(actions.fetchSingleUserFail(err))
        })
}
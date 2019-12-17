import axios from 'axios';
import * as actions from '../actions/index';
import {getCookie} from './getCookie';

const userId = getCookie('userId')


export const fetchSingleUser = () => dispatch => {
    dispatch(actions.fetchSingleUserStart())
    axios.get(`/api/single-user/${id}`) //*
        .then( res => {
            console.log(res.data)
            dispatch(actions.fetchSingleUserSuccess(res.data))
        })
        .catch( err => { 
            dispatch(actions.fetchSingleUserFail(err))
        })
}
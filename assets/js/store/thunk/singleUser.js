import axios from 'axios';
import * as actions from '../actions/index';

export const fetchSingleUser = () => dispatch => {
    dispatch(actions.fetchSingleUserStart()) 
    axios.get(`/api/single-user/2`) //*
        .then( res => {
            console.log(res.data)
            dispatch(actions.fetchSingleUserSuccess(res.data))
        })
        .catch( err => { 
            dispatch(actions.fetchSingleUserFail(err))
        })
}
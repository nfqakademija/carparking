import axios from 'axios';
import {setPlateNumber} from '../actions/index';

export const getPlateNumber = () => (dispatch, getState) => {

    const user = getState().user.id;

    const plate = 	{
        "licensePlate": [
            {"userId": "41", "licensePlate": "A012456"}
        ]};


    axios.get('/api/single-user/' + user)
        .then((response) => {

            if(response.status === 200) {

            }


        }).catch(error => {

        console.log(error)
    });
}

export const setPlateNumber = () => (dispatch, getState) => {

    const user = getState().user.id;

    const plate = 	{
        "licensePlate": [
            {"userId": "41", "licensePlate": "A012456"}
        ]};


    axios.get('/api/single-user/' + user)
        .then((response) => {

            if (response.data.success) {

            } else {

            }


        }).catch(error => {

        console.log(error)
    });
}
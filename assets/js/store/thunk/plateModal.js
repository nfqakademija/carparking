import axios from 'axios';
import {setPlateNumber} from '../actions/index';

export const getPlateNumber = () => (dispatch, getState) => {

    const user = getState().user.id;


    axios.get('/api/single-user/' + user)
        .then((response) => {

            if(response.status === 200) {
                console.log(response.data.licensePlate);
                dispatch(setPlateNumber(setPlateNumber(response.data.licensePlate)));
            }


        }).catch(error => {

        console.log(error)
    });
}

export const updatePlateNumber = () => (dispatch, getState) => {

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
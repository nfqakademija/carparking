import axios from 'axios';
import {setPlateNumber} from '../actions/index';
import {setPlateStatus} from "../actions/main";

export const getPlateNumber = () => (dispatch, getState) => {

    const user = getState().user.id;


    axios.get('/api/single-user/' + user)
        .then((response) => {

            if (response.status === 200) {
                dispatch(setPlateNumber(setPlateNumber(response.data.licensePlate)));
            }


        }).catch(error => {

        console.log(error)
    });
}

export const updatePlateNumber = (numbers) => (dispatch, getState) => {

    const user = getState().user.id;

    const plate = {
        "licensePlate": [
            {"userId": user, "licensePlate": numbers}
        ]
    };

    console.log(user)

    let status;

    axios.post('/api/licenseplate', plate)
        .then((response) => {

            if (response.status === 200) {

                dispatch(getPlateNumber());
                dispatch(setPlateStatus("success"));

            } else {
                dispatch(setPlateStatus("fail"));
            }

        }).catch(error => {

            console.log(error);

        dispatch(setPlateStatus("fail"));
    });
}
import axios from 'axios';
import {setPlateNumber} from '../actions/index';
import {setPlateStatus} from "../actions/main";

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



export const getPlateNumber = () => (dispatch, getState) => {

    const config = {
        headers: {"Authorization": getState().main.token}
     };

    const user = getState().singleUser.user.userId;

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

    const config = {
        headers: {"Authorization": getState().main.token}
     };

    const user = getState().singleUser.user.userId;

    const plate = {
        "licensePlate": [
            {"userId": user, "licensePlate": numbers}
        ]
    };

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
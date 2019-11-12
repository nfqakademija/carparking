import * as actionTypes from '../actions/actionTypes';
import registrationData from "../../containers/Home/fakeReservationData.json"

const initialState = {
    registrationData: registrationData,
    token: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return { 
                ...state,
                token: true
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null
            }
        default: return state
    }
}

export default reducer;
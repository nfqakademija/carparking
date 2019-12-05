import * as actionTypes from '../actions/actionTypes';
import registrationData from "../../containers/Home/fakeReservationData.json"

const initialState = {
    registrationData: registrationData,
    token: 1,
    loading: false,
    user: {
        id:1,
        name: null,
        lastname: null,
        activeCar: null
    },
    users: [],
    plate: "ABC000",
    reservationStatus: [],
    mobileMenu: false,
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
        case actionTypes.GET_HOME_DATA_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_HOME_DATA_SUCCESS:
            return {
                ...state,
                reservationStatus: action.data,
                user: action.user,
                loading: false
            }
        case actionTypes.GET_HOME_DATA_FAIL:
            return {
                ...state,
                reservationStatus: action.data,
                user: action.user,
                loading: false
            }
        case actionTypes.GET_HOME_USERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_HOME_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
                loading: false
            }
        case actionTypes.OPEN_MENU:
            return {
                ...state,
                mobileMenu: true
            }
        case actionTypes.CLOSE_MENU:
            return {
                ...state,
                mobileMenu: false
            }
        case actionTypes.UPDATE_PLATE:
            return {
                ...state,
                plate: action.numbers
            }
        default: return state
    }
}

export default reducer;
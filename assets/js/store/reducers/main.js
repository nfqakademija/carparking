import * as actionTypes from '../actions/actionTypes';
import registrationData from "../../containers/Home/fakeReservationData.json"

const initialState = {
    registrationData: registrationData,
    token: 1,
    loading: false,
    user: {
        id:2,
        name: null,
        lastname: null,
        activeCar: null
    },
    users: [],
    reservationStatus: [],
    popup: {
        width: 'calc(100%+30px)',
        left: '0px'
    }
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
        case actionTypes.SAVE_COORDINATES:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    width: action.width,
                    left: action.left
                }
            }
        case actionTypes.NO_COORDINATES:
            return {
                ...state,
                popup: {
                    ...state.popup
                }
            }
        case actionTypes.BUTTON_CLICKED:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    show: true,
                    type: action.buttonType,
                    date: action.date,
                    userId: action.userId
                }
            }
        case actionTypes.POPUP_CANCEL:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    show: false
                }
            }
        case actionTypes.POPUP_ACCEPT_START:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    loading: true
                }
            }
        case actionTypes.POPUP_ACCEPT_SUCCESS:
            console.log(state)
            return {
                ...state,
                popup: {
                    ...state.popup,
                    loading: false,
                    style : {
                        backgroundColor: '#71c271',
                        height: '150px'
                        }
                }
            }
        case actionTypes.POPUP_SUCCESS:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    show: false
                }
            }
        case actionTypes.POPUP_STYLE_RESET:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    style: null
                }
            }
        default: return state
    }
}

export default reducer;
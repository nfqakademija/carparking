import * as actionTypes from '../actions/actionTypes';
import registrationData from "../../containers/Home/fakeReservationData.json"

const initialState = {
    registrationData: registrationData,
    token: 1,
    plate: "ABC000",
    mobileMenu: false,
    plateModal: false,
    plateModalStatus: "none",
    postAwayStatus: null,
    postAwayLoading: false,
    awayHistoryLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return { 
                ...state,
                token: true,
                user: {
                    ...state.user,
                    id: Number(action.id)
                }
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null
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
        case actionTypes.SET_PLATE_NUMBER:
            return {
                ...state,
                plate: action.data.data
            }
        case actionTypes.OPEN_PLATE_MODAL:
            return {
                ...state,
                plateModal: true
            }
        case actionTypes.SET_PLATE_STATUS:
            return{
                ...state,
                plateModalStatus: action.data
            }
        case actionTypes.CLOSE_PLATE_MODAL:
            return {
                ...state,
                plateModal: false
            }
        case actionTypes.POST_AWAY_STATUS:
            return {
                ...state,
                postAwayStatus: action.data,
                postAwayLoading: false
            }
        case actionTypes.AWAY_HISTORY_LOADING:
            return {
                ...state,
                awayHistoryLoading: action.data
            }
        case actionTypes.POST_AWAY_DEFAULT_STATUS:
            return {
                ...state,
                postAwayStatus: null
            }
        case actionTypes.POST_AWAY_STATUS_LOADING:
            return {
                ...state,
                postAwayLoading: true
            }
        
        default: return state
    }
}

export default reducer;
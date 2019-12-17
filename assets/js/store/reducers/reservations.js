import * as actionTypes from '../actions/actionTypes';

const initialState = {
    popup: {
        width:"calc(100%+30px)",
        left:"0px"
    },
    weekStaus:[],
    loading: true,
    loadingOneDay: true,
    err: null,
    popupShake: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RESERVATIONS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_RESERVATIONS_SUCCESS:
            return {
                ...state,
                weekStatus: action.parkingLotStatus,
                loading: false
            }
        case actionTypes.FETCH_RESERVATIONS_FAIL:
            return {
                ...state,
                err: action.err,
                loading: false
            }
        case actionTypes.POPUP_ACCEPT_START:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    loading: true
                },
                loadingOneDay: true
            }
        case actionTypes.POPUP_ACCEPT_SUCCESS:
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
        case actionTypes.POPUP_ACCEPT_FAIL:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    err: action.err,
                    loading: false,
                    style : {
                        backgroundColor: '#E87C86',
                        height: '150px'
                    }
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
        case actionTypes.SAVE_COORDINATES:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    width: action.width,
                    left: action.left
                }
            }
        case actionTypes.FETCH_ONE_DAY_DATA_START:
            return {
                ...state,
                loadingOneDay: action.date
            }
        case actionTypes.FETCH_ONE_DAY_DATA_SUCCESS:
            return {
                ...state,
                weekStatus: action.data,
                loadingOneDay: false
            }
        case actionTypes.FETCH_ONE_DAY_DATA_FAIL:
            return {
                ...state,  
                err: action.err,
                loadingOneDay: false
            }
        case actionTypes.BUTTON_CLICKED:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    show: true,
                    type: action.buttonType,
                    date: action.date,
                    switchUser: action.switchUser
                }
            }
        case actionTypes.POPUP_OPENED_START:
            return {
                ...state,
                popupShake: true
            }
        case actionTypes.POPUP_OPENED_RESET:
            return {
                ...state,
                popupShake: false
            }
        default: return state
    }
}

export default reducer;
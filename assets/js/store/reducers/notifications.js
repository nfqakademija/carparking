import * as actionTypes from '../actions/actionTypes';

const initialState = {
    notifications: [],
    loading: true,
    err: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_NOTIFICATIONS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.notifications,
                loading: false
                }   
        case actionTypes.FETCH_NOTIFICATIONS_FAIL:
            return {
                ...state,
                loading: false,
                err: action.err
            }
        default: return state
    }
}

export default reducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    loading: true,
    err: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
                loading: false
            }
        case actionTypes.FETCH_USERS_FAIL:
            return {
                ...state,
                err: action.err,
                loading: false
            }
        default: return state
    }
}

export default reducer;

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: {
        userId: null,
        name: null,
        surname: null,
        role: null,
        licencePlate: null,
        reservations: [],
        userAways: []
    },
    loading: true,
    err: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SINGLE_USER_START:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_SINGLE_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false
            }
        case actionTypes.FETCH_SINGLE_USER_FAIL:
            return {
                ...state,
                err: action.err,
                loading: false
            }
        case actionTypes.GET_AWAYS_DATES:
            return {
                ...state,
                user: {
                    ...state.user,
                    userAways: action.data
                }
            }
        default: return state
    }
}

export default reducer;
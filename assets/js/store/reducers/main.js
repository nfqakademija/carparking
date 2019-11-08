import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return { 
                ...state,
                token: true
            }
        default: return state
    }
}

export default reducer;
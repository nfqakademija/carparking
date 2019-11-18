import * as actionTypes from './actionTypes';

export const login = () => {
    return {
        type: actionTypes.LOGIN
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const getHomeDataStart = () => {
    return {
        type: actionTypes.GET_HOME_DATA_START
    }
}

export const getHomeDataSuccess = (data, user) => {
    return {
        type: actionTypes.GET_HOME_DATA_SUCCESS,
        data,
        user
    }
}

export const getHomeDataFail = (data, user) => {
    return {
        type: actionTypes.GET_HOME_DATA_FAIL,
        data,
        user
    }
}

export const getHomeUsersStart = () => {
    return {
        type: actionTypes.GET_HOME_USERS_START
    }
}

export const getHomeUsersSuccess = (users) => {
    return {
        type: actionTypes.GET_HOME_USERS_SUCCESS,
        users
    }
}
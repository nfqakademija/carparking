import * as actionTypes from '../actions/actionTypes';
import registrationData from "../../containers/Home/fakeReservationData.json"

const initialState = {
    registrationData: registrationData,
    token: 1,
    loading: {
        loadingSingleUser: true,
        loadingReservations: true
    },
    user: {
        id: 4,
        name: null,
        lastname: null,
        activeCar: null,
        aways: [],
        notifications: [
            {
                name: 'Elvis',
                surname: 'Raynor',
                date: '2019-12-13'
            },
            {
                name: 'Calista',
                surname: 'Sipes',
                date: '2019-12-14'
            }
        ]
    },
    users: [],
    plate: "ABC000",
    popup: {
        width: 'calc(100%+30px)',
        left: '0px'
    },
    notificationPopup: {
        width: 'calc(100%+30px)',
        left: '0px'
    },
    loadingOneDay: false,
    mobileMenu: false,
    popupShake: false,
    plateModal: false,
    postAwayStatus: null,
    postAwayLoading: false
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
                },
                notificationPopup: {
                    ...state.notificationPopup,
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
                    switchUser: action.switchUser
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
        case actionTypes.POPUP_SUCCESS:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    show: false
                },
                notificationPopup: {
                    ...state.notificationPopup,
                    show: false
                }
            }
        case actionTypes.POPUP_STYLE_RESET:
            return {
                ...state,
                popup: {
                    ...state.popup,
                    style: null
                },
                notificationPopup: {
                    ...state.notificationPopup,
                    style: null
                }
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
                weekStatus: {
                    ...state.weekStatus,
                    err: action.err
                },
                loadingOneDay: false
            }
        case actionTypes.SET_NOTIFICATION:
            return {
                ...state,
                notificationPopup: {
                    ...state.notificationPopup,
                    show: true,
                    date: state.user.notifications[0].date,
                    name: state.user.notifications[0].name,
                    surname: state.user.notifications[0].surname
                }
            }
        case actionTypes.NOTIFICATION_POPUP_CANCEL:
            return {
                ...state,
                notificationPopup: {
                    ...state.notificationPopup,
                    show: false
                },
                user: {
                    ...state.user,
                    notifications: state.user.notifications.slice(1)
                }
            }
        case actionTypes.NOTIFICATION_POPUP_ACCEPT_START:
                return {
                    ...state,
                    notificationPopup: {
                        ...state.notificationPopup,
                        loading: true
                    },
                    loadingOneDay: true
                }
        case actionTypes.NOTIFICATION_POPUP_ACCEPT_SUCCESS:
            return {
                ...state,
                notificationPopup: {
                    ...state.notificationPopup,
                    loading: false,
                    style : {
                        backgroundColor: '#71c271',
                        height: '150px'
                    }
                },
                user: {
                    ...state.user,
                    notifications: state.user.notifications.slice(1)
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
        case actionTypes.OPEN_PLATE_MODAL:
            return {
                ...state,
                plateModal: true
            }
        case actionTypes.CLOSE_PLATE_MODAL:
            return {
                ...state,
                plateModal: false
            }
        case actionTypes.POST_AWAY_DATES:
            return {
                ...state,
                user: {
                    ...state.user,
                    userAways: [...state.user.userAways, ...action.data]
                }
            }
        case actionTypes.POST_AWAY_STATUS:
            return {
                ...state,
                postAwayStatus: action.data,
                postAwayLoading: false
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
        case actionTypes.GET_SINGLE_USER_START:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSingleUser: true
                }
            }
        case actionTypes.GET_SINGLE_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: {
                    ...state.loading,
                    loadingSingleUser: false
                }
            }
        case actionTypes.GET_SINGLE_USER_FAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    err: action.err
                },
                loading: {
                    ...state.loading,
                    loadingSingleUser: false
                }
            }
        case actionTypes.GET_RESERVATIONS_START:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingReservations: true
                }
            }
        case actionTypes.GET_RESERVATIONS_SUCCESS:
            return {
                ...state,
                weekStatus: action.parkingLotStatus,
                loading: {
                    ...state.loading,
                    loadingReservations: false
                }
            }
        case actionTypes.GET_RESERVATIONS_FAIL:
            return {
                ...state,
                weekStatus: {
                    ...state.parkingLotStatus,
                    err: action.err
                },
                loading: {
                    ...state.loading,
                    loadingReservations: false
                }
            }
        default: return state
    }
}

export default reducer;
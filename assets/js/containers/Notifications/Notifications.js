import React, { Component } from 'react';
import { connect } from "react-redux";

import { getUsersData, popupAcceptClicked, getSingleUser, getReservations  } from '../../store/thunk/reservations';
import { getCoordinates, popupOpened } from '../../store/thunk/popup';
import { buttonClicked, popupCancel, getNotifications } from '../../store/actions/index';

import UserNotifications from '../../components/NotificationsComponents/UserNotifications';
import GuestNotifications from '../../components/NotificationsComponents/GuestNotifications';
import UsersTable from '../../components/UsersTable/UsersTable';
import PopUp from '../../components/UI/PopUp/PopUp';


import './Notifications.scss';
class Notifications extends Component {

    constructor(props){
        super(props);
        this.userTableRef = React.createRef();
    }

    componentDidMount() {
        this.props.onGetUsersData()
        this.props.onGetSingleUser()
        this.props.onGetReservations()
        this.props.onGetNotifications()
        
    }

    render (){
        
        return (
            <>
                <div style={{display:"flex", flexDirection:'column',  height:'100%', overflow:'scroll'}}>
                    {this.props.loading || this.props.usersList.length === 0
                        ? 'loading ...'
                        : <div className='Notifications_container'>
                            <div className='Notifications_table shadow'>
                                <div className='Notifications_header bg-dark text-white rounded-top'>
                                    <div >Notifications</div>
                                </div>
                                {(this.props.notifications || []).map(notification => (
                                        this.props.user.role === 'user'
                                        ? <UserNotifications key={notification.id} notification={notification} usersList={this.props.usersList}/>
                                        : <GuestNotifications key={notification.id} notification={notification} usersList={this.props.usersList}/>
                                    ))
                                }
                                
                                
                            </div>
                        </div>
                    } 
                </div>  
            </>
        )
    }  
}

const mapStateToProps = state => {
    return {
        usersList: state.users,
        loading: state.loading.loadingUsers,
        reservationStatus: state.weekStatus,
        mainUser: state.user,
        popup: state.popup,
        user: state.user,
        popupShake: state.popupShake,
        popupShow: state.popup.show,
        notificationPopupShow: state.notificationPopup.show,
        notifications: state.notifications
    }
}


const mapDispatchToProps= dispatch => ({
    onGetUsersData: () => dispatch(getUsersData()),
    onGetSingleUser: () => dispatch(getSingleUser()),
    onGetReservations: () => dispatch(getReservations()),
    onButtonClick: (date, buttonType, ref, switchUser) => {dispatch(getCoordinates(ref ,ref)),dispatch(buttonClicked(date, buttonType, switchUser))},
    onPopupAccept: (date, actionType) => dispatch(popupAcceptClicked(date, actionType)),
    onPopupCancel: () => dispatch(popupCancel()),
    onPopupOpened: () => dispatch(popupOpened()),
    onGetNotifications: () => dispatch(getNotifications())
})


export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
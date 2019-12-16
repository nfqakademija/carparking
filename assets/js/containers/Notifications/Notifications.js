import React, { Component } from 'react';
import { connect } from "react-redux";

import { getUsersData } from '../../store/thunk/reservations';
import { fetchNotifications } from '../../store/thunk/notifications';

import UserNotifications from '../../components/NotificationsComponents/UserNotifications';
import GuestNotifications from '../../components/NotificationsComponents/GuestNotifications';

import './Notifications.scss';

class Notifications extends Component {

    componentDidMount() {
        this.props.onFetchNotifications(props.user.userId, props.user.role) 
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
                                {this.props.notifications && this.props.notifications.find( notification => !Number(notification.accepted) && !notification.rejected)
                                ? this.props.notifications.map(notification => (
                                            this.props.user.role === 'user'
                                                ? <UserNotifications key={notification.id} notification={notification} usersList={this.props.usersList}/>
                                                : <GuestNotifications key={notification.id} notification={notification} usersList={this.props.usersList}/>
                                        ))
                                :<div className='Notifications_body'>
                                <div style={{textAlign:'center', fontSize:'1.5em', margin:'2em'}}>
                                    You have not received any notifications
                                </div>
                            </div>} 
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
        user: state.user.user,
        popupShake: state.popupShake,
        popupShow: state.popup.show,
        notificationPopupShow: state.notificationPopup.show,
        notifications: state.notifications.notifications
    }
}


const mapDispatchToProps= dispatch => ({
    onGetUsersData: () => dispatch(getUsersData()),
    onFetchNotifications: (userId, userRole) => dispatch(fetchNotifications(userId, userRole))
})


export default connect(mapStateToProps,mapDispatchToProps)(Notifications);

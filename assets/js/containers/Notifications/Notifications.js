import React, { Component } from 'react';
import { connect } from "react-redux";

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
        usersList: state.usersList.users,
        loading: state.main.loading.loadingUsers,
        reservationStatus: state.main.weekStatus,
        mainUser: state.singleUser.user,
        popup: state.main.popup,
        user: state.singleUser.user,
        popupShake: state.main.popupShake,
        popupShow: state.main.popup.show,
        notificationPopupShow: state.main.notificationPopup.show,
        notifications: state.notifications.notifications
    }
}

const mapDispatchToProps= dispatch => ({
    onFetchNotifications: (userId, userRole) => dispatch(fetchNotifications(userId, userRole))
})

export default connect(mapStateToProps,mapDispatchToProps)(Notifications);

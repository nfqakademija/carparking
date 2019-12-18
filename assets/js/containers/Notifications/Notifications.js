import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchNotifications } from '../../store/thunk/notifications';

import UserNotifications from '../../components/NotificationsComponents/UserNotifications';
import GuestNotifications from '../../components/NotificationsComponents/GuestNotifications';

import './Notifications.scss';

class Notifications extends Component {

    componentDidMount() {
        this.props.onFetchNotifications(this.props.user.userId, this.props.user.role) 
    }

    render (){
        
        return (
            <>
                <div style={{display:"flex", flexDirection:'column',  height:'100%', overflow:'hidden'}}>
                    {this.props.usersList === [] && !this.props.notificationsLoading
                        ? 'loading ...'
                        : <div className='Notifications_container'>
                            <div className='Notifications_table shadow'>
                                <div className='Notifications_header bg-dark text-white rounded-top'>
                                    <div >Notifications</div>
                                </div>
                                {this.props.notifications && this.props.notifications.find( notification => !notification.rejected)
                                ? this.props.notifications.map(notification => ( 
                                            this.props.user.role === 'user'
                                                ? <UserNotifications key={notification.id} notification={notification} usersList={this.props.usersList}/>
                                                : <GuestNotifications key={notification.id} notification={notification} usersList={this.props.usersList}/>
                                        ))
                                : <div className='Notifications_body'>
                                    <div style={{textAlign:'center', fontSize:'1.5em', margin:'2em'}}>
                                        You have not received any notifications
                                    </div>
                                  </div>
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
        usersList: state.usersList.users,
        reservationStatus: state.reservation.weekStatus,
        mainUser: state.singleUser.user,
        popup: state.reservation.popup,
        user: state.singleUser.user,
        popupShake: state.reservation.popupShake,
        popupShow: state.reservation.popup.show,
        notifications: state.notifications.notifications,
        notificationsLoading: state.notifications.loading
    }
}

const mapDispatchToProps= dispatch => ({
    onFetchNotifications: (userId, userRole) => dispatch(fetchNotifications(userId, userRole))
})

export default connect(mapStateToProps,mapDispatchToProps)(Notifications);

import React, { Component } from 'react';
import { connect } from "react-redux";

import { getUsersData, getReservations, getNotifications  } from '../../store/thunk/reservations';

import UserNotifications from '../../components/NotificationsComponents/UserNotifications';
import GuestNotifications from '../../components/NotificationsComponents/GuestNotifications';

import './Notifications.scss';
class Notifications extends Component {

    constructor(props){
        super(props);
        this.userTableRef = React.createRef();
    }

    componentDidMount() {
        // this.props.onGetUsersData()
        // this.props.onGetReservations()
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
        user: state.user,
        popupShake: state.popupShake,
        popupShow: state.popup.show,
        notificationPopupShow: state.notificationPopup.show,
        notifications: state.notifications
    }
}


const mapDispatchToProps= dispatch => ({
    onGetUsersData: () => dispatch(getUsersData()),
    onGetReservations: () => dispatch(getReservations()),
    onGetNotifications: () => dispatch(getNotifications())
})


export default connect(mapStateToProps,mapDispatchToProps)(Notifications);

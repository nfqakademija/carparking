import React from 'react';
import { connect } from "react-redux";

import { notificationCancel, notificationAccept, notificationReject } from '../../store/thunk/notifications';

import Button from '../UI/Button/Button';

import '../../containers/Notifications/Notifications.scss';

const userNotification = (props) => {

    const guest = props.usersList.find(user => user.userId === Number(props.notification.guestId))
    let buttons
    let text
    let borderColor = {}
    if(Number(props.notification.accepted)) {

        buttons = <div className='Notifications_notificationContainerButtons'>
                    <Button classname="Button_danger" text='Cancel' onclick={() => props.onNotificationButtonCancel(props.notification.id)}></Button>
                  </div>
        text = 'Grab your spot for '
        borderColor = {borderColor:'#95D195'}
    } else {
        buttons = <div className='Notifications_notificationContainerButtons'>
                    <Button classname="Button_success" text='Accept'  onclick={() => props.onNotificationButtonAccept(props.notification.id)}></Button>
                    <Button classname="Button_danger" text='Cancel'  onclick={() => props.onNotificationButtonReject(props.notification.id)}></Button>
                  </div>
        text = 'Asks for spot for '
    }

    return(
        !props.notification.rejected && !props.notification.acceptedAndCanceled
            ? <div className='Notifications_body'>
                <div className='Notifications_notificationContainer shadow' style={borderColor}>
                    <div className='Notifications_notificationContainerText'>
                            <div style={{fontWeight:'900'}}>{guest.name.toUpperCase()} {guest.surname.toUpperCase()}</div>
                            <div>{text}<strong>{props.notification.date}</strong></div>
                    </div>
                    {buttons}  
                </div>
              </div>
            : null   
    )
}

const mapDispatchToProps = dispatch => ({
    onNotificationButtonCancel: (id) => dispatch(notificationCancel(id)),
    onNotificationButtonAccept: (id) => dispatch(notificationAccept(id)),
    onNotificationButtonReject: (id) => dispatch(notificationReject(id))
})


export default connect(null, mapDispatchToProps)(userNotification);
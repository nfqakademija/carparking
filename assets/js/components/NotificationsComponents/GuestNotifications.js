import React from 'react';


import '../../containers/Notifications/Notifications.scss';

const guestNotification = (props) => {

    const user = props.usersList.find(user => user.userId === Number(props.notification.userId))
    let text
    let borderColor = {}

    console.log(props.notification)
    if(Number(props.notification.accepted)) {
        if(props.notification.acceptedAndCanceled) {
            text = 'Take spot from you for '
            borderColor = {borderColor:'#E87C86'}
        } else {
            text = 'Gave you a spot for '
            borderColor = {borderColor:'#95D195'}
        }  
    } else {
        text = 'Waiting for a response for '
    }

    return(
        !props.notification.rejected
            ? <div className='Notifications_body'>
                <div className='Notifications_notificationContainer shadow' style={borderColor}>
                    <div style={{margin:'1em auto',marginLeft:'2em', textAlign:'start'}}>
                        <div style={{fontWeight:'900'}}>{user.name.toUpperCase()} {user.surname.toUpperCase()}</div>
                        <div>{text}<strong>{props.notification.date}</strong></div>
                    </div> 
                </div>
              </div>
            : null
        
    
)
}
export default guestNotification;
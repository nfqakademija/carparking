import React from 'react';

import Button from '../UI/Button/Button';

import '../../containers/Notifications/Notifications.scss';

const userNotification = (props) => {

    const guest = props.usersList.find(user => user.userId === Number(props.notification.guestId))
    let buttons
    let text
    let borderColor = {}

    if(props.notification.accepted) {
        buttons = <div style={{display:'flex',marginRight:'2em'}}>
                    <Button classname="Button_danger" text='Cancel' buttonStyle={{ marginRight:'0.5em'}} onclick={props.popupCancel}></Button>
                  </div>
        text = 'Grab your spot for '
        borderColor = {borderColor:'#95D195'}
    } else {
        buttons = <div style={{display:'flex',marginRight:'2em'}}>
                    <Button classname="Button_success" text='Accept' buttonStyle={{ marginRight:'0.5em'}} onclick={props.popupAccept}></Button>
                    <Button classname="Button_danger" text='Cancel' buttonStyle={{ marginRight:'0.5em'}} onclick={props.popupCancel}></Button>
                  </div>
        text = 'Asks for spot for '
    }

    return(
        !props.notification.rejected && !props.notification.acceptedAndCanceled
            ? <div className='Notifications_body'>
                <div className='Notifications_notificationContainer shadow' style={borderColor}>
                    <div style={{margin:'auto',marginLeft:'2em', textAlign:'start'}}>
                            <div style={{fontWeight:'900'}}>{guest.name.toUpperCase()} {guest.surname.toUpperCase()}</div>
                            <div>{text}<strong>{props.notification.date}</strong></div>
                        </div>
                        {buttons}  
                </div>
              </div>
            : null
        
    
)
}
export default userNotification;
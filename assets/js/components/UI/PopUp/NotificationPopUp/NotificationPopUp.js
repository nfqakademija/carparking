import React from 'react';

import Button from '../../Button/Button';

import '../../../../../css/components/UI/PopUp/PopUp.scss';

const notificationPopUp = (props) => {
    let popupType = {
        position:'absolute',
        left: props.popup.left,
        width: props.popup.width,
        transform: props.translate ?'translateY(0)': 'translateY(-300px)',
        backgroundColor:"#343a40",
        marginLeft: props.isUser ?'15px' :'15px'
    }
    console.log(props.translate)
    
    const date = new Date(props.popup.date)
    const dateString = 
                        <> 
                            <span>{`${date.toLocaleDateString('en-EN', {weekday:'long'}).toUpperCase()} `}</span>
                            <span>{`${date.toLocaleDateString('en-EN', {month:'short'}).toUpperCase()} ${date.getDate()}`}</span> 
                        </>
    let statusText = <span style={{textTransform:'uppercase', fontSize:'1.25rem'}}> Are you sure you want to reserve a parking spot for {dateString}</span>
    
    return (
        <>
            {props.popup.loading
            ?   <div className='PopUp_container' style={popupType} >
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            :   <div className='PopUp_container' style={popupType} >
                        {statusText}
                        <div style={{display:'flex', justifyContent:'space-around', width:'80%', margin:'auto'}}>
                            <Button classname="Button_success" text='Accept' buttonStyle={{fontSize:'1rem', width:'35%'}} onclick={props.popupAccept}></Button>
                            <Button classname="Button_danger" text='Cancel' buttonStyle={{fontSize:'1rem', width:'35%'}} onclick={props.popupCancel}></Button>
                        </div>    
                    </div>
            }     
        </>
    )
}

export default notificationPopUp;
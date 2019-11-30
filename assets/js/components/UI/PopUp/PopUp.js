import React from 'react';

import Button from '../Button/Button';

import '../../../../css/components/UI/PopUp/PopUp.scss';

const popUp = (props) => {
    let popupType = {
        position:'absolute',
        left: props.left,
        width: props.width,
        transform: props.translate ?'translateY(0)': 'translateY(-300px)',
        backgroundColor:"#343a40"
    }

    let statusText = null  
            
    if(props.type){
        const date = new Date(props.type.date)
        const dateString = `${date.toLocaleDateString('en-EN', {weekday:'short'}).toUpperCase()}
                            ${date.toLocaleDateString('en-EN', {month:'short'}).toUpperCase()}
                            ${date.getDate()}`
        switch (props.type.type){
            case 'success':
                statusText = <span style={{textTransform:'uppercase', fontSize:'1.25rem'}}> Are you sure you want to reserve a parking spot for {dateString}</span>
                break
            case 'danger':
                statusText = <span style={{textTransform:'uppercase', fontSize:'1.25rem'}}> Are you sure you want to cancel your parking spot for {dateString}</span>
                break
            case 'neutral':
                statusText = <span style={{textTransform:'uppercase', fontSize:'1.25rem'}}> Are you sure you want to ask Lukas to swap parking spaces for {dateString}</span>
                break
        }
    }

    if(props.uniqueStyle){
        popupType = {
            ...popupType,
            backgroundColor: props.uniqueStyle.backgroundColor,
            height: props.uniqueStyle.height
        }
    }
    
    return (
        <>
            {props.loading
            ?   <div className='PopUp_container' style={popupType} >
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            :   props.uniqueStyle
                ?   <div className='PopUp_container' style={popupType} >
                        <span>Success!!</span> 
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

export default popUp;
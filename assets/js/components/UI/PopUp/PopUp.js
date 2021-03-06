import React from 'react';

import Button from '../Button/Button';

import '../../../../css/components/UI/PopUp/PopUp.scss';

const popUp = (props) => {
    let popupType = {
        position:'absolute',
        left: props.left,
        width: props.width,
        transform: props.translate ?'translateY(0)': 'translateY(-300px)',
        backgroundColor:"#343a40",
        marginLeft: '15px'
    }

    let statusText = null 
    let successText = null 
    const failText = <div style={{textTransform:'uppercase', fontSize:'1.25rem'}}> Oops something went wrong! Try again later</div>
            
    if(props.type){
        const date = new Date(props.type.date)
        const dateString = <> 
                            <span>{`${date.toLocaleDateString('en-EN', {weekday:'long'}).toUpperCase()} `}</span>
                            <span>{`${date.toLocaleDateString('en-EN', {month:'short'}).toUpperCase()} ${date.getDate()}`}</span> 
                            </>
        switch (props.type.type){
            case 'success':
                statusText = <span style={{textTransform:'uppercase', fontSize:'1.25rem'}}> 
                                Are you sure you want to reserve a parking spot for {dateString}
                             </span>
                successText = <div style={{textTransform:'uppercase', fontSize:'1.25rem'}}> 
                                Successfully reserved parking space for {dateString} !
                              </div>
                break
            case 'danger':
                statusText = <span style={{textTransform:'uppercase', fontSize:'1.25rem'}}> 
                                Are you sure you want to cancel your parking spot for {dateString}
                            </span>
                successText = <div style={{textTransform:'uppercase', fontSize:'1.25rem'}}> 
                                Successfully canceled your parking reservation for {dateString} !
                            </div>
                break
            case 'neutral':
                statusText = <span style={{textTransform:'uppercase', fontSize:'1.25rem'}}> 
                                Are you sure you want to ask {props.user ?props.user.name:null} to swap parking spaces for {dateString}
                            </span>
                successText = <div style={{textTransform:'uppercase', fontSize:'1.25rem'}}> {props.user ?props.user.name:null} 
                                successfully received a request to swap parking spaces for {dateString} !
                              </div>
                break
        }
    }

    if(props.uniqueStyle){
        popupType = {
            ...popupType,
            backgroundColor: props.uniqueStyle.backgroundColor,
            height: props.uniqueStyle.height,
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }

    if(props.shake && props.type && props.type.show){
        popupType = {
            ...popupType,
            animation: 'shake 0.5s ease-out both'
        }
    }

    let popup = <div className='PopUp_container' style={popupType} >
                    {statusText}
                    <div className='PopUp_buttonsContainer'>
                        <Button classname="Button_success" text='Accept' buttonStyle={{fontSize:'1rem', width:'35%'}} onclick={props.popupAccept}></Button>
                        <Button classname="Button_danger" text='Cancel' buttonStyle={{fontSize:'1rem', width:'35%'}} onclick={props.popupCancel}></Button>
                    </div>    
                </div>


    if(props.uniqueStyle){
        if(props.type.err === "duplicate") {

            popup = <div className='PopUp_container' style={popupType} >
                        <div style={{textTransform:'uppercase', fontSize:'1.25rem'}}> 
                            You already asked {props.user ?props.user.name:null} to swap parking spaces!
                        </div>
                    </div>
        } else if (props.type.err) {

            popup = <div className='PopUp_container' style={popupType} >
                        {failText}
                    </div>

        } else {

            popup = <div className='PopUp_container' style={popupType} >
                        {successText}
                    </div>
    }
}

    return (
        <>
            {props.loading 
            ?   <div className='PopUp_container shadow' style={popupType} > 
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            : popup}     
        </>
    )
}

export default popUp;
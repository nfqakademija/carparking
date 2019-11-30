import React from 'react';

import '../../../../css/components/UI/PopUp/PopUp.scss';

const popUp = (props) => {
    let popupType = {
        position:'relative',
        left: props.left,
        width: props.width,
        transform: props.translate ?'translateY(0)': 'translateY(-200px)',
        height: props.translate? 'auto': '0'
    }

    popupType = {
        ...popupType,
        backgroundColor:"#343a40"
    }

    let statusText = <span></span>
            
    if(props.type){
        const date = new Date(props.type.date)
        const dateString = `${date.toLocaleDateString('en-EN', {weekday:'short'}).toUpperCase()}
                            ${date.toLocaleDateString('en-EN', {month:'short'}).toUpperCase()}
                            ${date.getDate()}`
        switch (props.type.type){
            case 'success':
                statusText = <span style={{textTransform:'uppercase'}}> Are you sure you want to reserve a parking spot for {dateString}</span>
                break
            case 'danger':
                statusText = <span style={{textTransform:'uppercase'}}> Are you sure you want to cancel your parking spot for {dateString}</span>
                break
            case 'neutral':
                statusText = <span style={{textTransform:'uppercase'}}> Are you sure you want to ask Lukas to swap parking spaces for  {dateString}</span>
                break
        }
    }
    
    return (
        <>
            <div className='PopUp_container' style={popupType} >
                {statusText}
                <div>
                    <button>1</button>
                    <button>2</button> 
                </div>    
            </div>
                    
        </>
    )
}

export default popUp;
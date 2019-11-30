import React from 'react';

import '../../../../css/components/UI/PopUp/PopUp.scss';

const popUp = (props) => {
    let popupType = {
        position:'relative',
        left: props.left,
        width: props.width,
        transform: props.translate ?'translateY(0)': 'translateY(-200px)',
        height: props.translate? '10%': '0'
    }

    popupType = {
        ...popupType,
        backgroundColor:"#343a40"
    }

    let statusText = <span></span>
            

    if(props.type){
        switch (props.type.type){
            case 'success':
                statusText = <span> Are you sure you want to reserve a parking spot for {props.date}</span>
                break
            case 'danger':
                statusText = <span> Are you sure you want to cancel your parking spot for {props.date}</span>
                break
            case 'neutral':
                statusText = <span> Are you sure you want to ask Lukas to swap parking spaces for  {props.date}</span>
                break
        }
    }
    
    return (
        <>
            <div className='PopUp_container' style={popupType} >
                {statusText}
                <button>1</button>
                <button>2</button>     
            </div>
                    
        </>
    )
}

export default popUp;
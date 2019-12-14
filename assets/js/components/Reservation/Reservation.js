import React from 'react';

import Button from '../UI/Button/Button';
import StatusSvg from './StatusSvg/StatusSvg';

import '../../../css/components/Reservation/Reservation.scss';

const reservation = React.forwardRef((props, ref) => {
    const date = new Date(props.date)
    return (
        <div className='Reservation_container' 
            style={{height:props.height}}
            ref={ref}>
            <div className='Reservation_header'>
                <span>{`${date.toLocaleDateString('en-EN', {weekday:'long'}).toUpperCase()} `}</span>
                <span>{`${date.toLocaleDateString('en-EN', {month:'short'}).toUpperCase()} ${date.getDate()}`}</span>
            </div>
            <div className='Reservation_body'>
                {props.loading && new Date(props.loading).getDate() === date.getDate()
                    ? null
                    : <>
                        <a  data-toggle='tooltip' style={{minHeight:'60%', marginTop:'1em'}}
                            // svg tooltip text depending on current status
                            title={props.buttonOptions.buttonClass === 'danger'
                                    ? `You already have spot for this day`
                                    : props.buttonOptions.buttonClass === 'neutral'
                                        ? `You can always ask a colleague to let you in their parking space`
                                        : `You can reserve a parking space for this day`}> 
                            <StatusSvg
                                graphStatus={props.graphStatus}
                                lotSize={props.lotSize}
                                usedSpots={props.usedSpots} />
                        </a>
                        {props.userParkingSpot
                            ? <div className='Reservation_userSpotText'>
                                {props.userParkingSpot} <br/> 
                                <div style={{fontSize:'0.375em', marginTop:'-0.5em', color:'#8d8d8d'}}>Your spot</div></div>
                            : null}
                        {props.popupShake
                            ? <a title='You must first accept or reject notification message'>
                                <Button 
                                    text={props.buttonOptions.buttonText} 
                                    classname={`Button_${props.buttonOptions.buttonClass}`}
                                    buttonStyle={{width:'50%', marginBottom:'1em'}}
                                    onclick={props.popupShake}/>
                              </a>
                            : <Button 
                                    text={props.buttonOptions.buttonText} 
                                    classname={`Button_${props.buttonOptions.buttonClass}`}
                                    buttonStyle={{width:'50%', marginBottom:'1em'}}
                                    onclick={props.buttonOptions.buttonClass==='neutral'
                                                        ? ()=>props.history.push('/users')
                                                        : props.onButtonClick}/>

                        }
                        
                    </>
                    }    
            </div>
        </div>
    )
})

export default reservation;
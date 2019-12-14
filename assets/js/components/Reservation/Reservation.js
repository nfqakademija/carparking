import React from 'react';
import Button from '../UI/Button/Button';

import '../../../css/components/Reservation/Reservation.scss';

const reservation = React.forwardRef((props, ref) => {
    const date = new Date(props.date)
    return (
        <div className='Reservation_container shadow bg-white'
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
                            title={props.userParkingSpot
                                    ? `You already have spot for this day`
                                    : props.usedSpaces >= props.parkingSpaces 
                                        ? `You can always ask a colleague to let you in their parking space`
                                        :`You can reserve a parking space for this day`}>
                            <svg className='Reservation_svg'> 
                                <circle className='Reservation_circleBase' 
                                    cx="50%" cy="55%" r="30%"
                                    strokeDasharray={`110% 110%`}/>
                                <circle className='Reservation_circleStatus' 
                                    cx="50%" cy="55%" r="30%"
                                    strokeDasharray={`${props.graphStatus.status} 184.2%`}
                                    style={props.graphStatus.isVisible} />
                                <text className='Reservation_text' style={{fontSize:'2em'}}
                                    x="50%" y="45%">
                                        {`${(props.usedSpaces/props.parkingSpaces)*100}%`}                      
                                </text>
                                <text className='Reservation_text'
                                    x="35%" y="77.5%">
                                        {`${(props.parkingSpaces)}`}                      
                                </text>
                                <text className='Reservation_text' style={{fontSize:'0.75em', fill:'#8d8d8d'}}
                                    x="35%" y="85%">
                                        {`Overall`}                      
                                </text>
                                <line x1="50%" y1="15%" x2="50%" y2="32.5%" className='Reservation_line'></line>
                                <text className='Reservation_text'
                                    x="65%" y="77.5%">
                                        {props.usedSpaces}                   
                                </text>
                                <text className='Reservation_text' style={{fontSize:'0.75em', fill:'#8d8d8d'}}
                                    x="65%" y="85%">
                                        {`Used`}                      
                                </text>
                            </svg>
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
                                    classname={`shadow Button_${props.buttonOptions.buttonClass}`}
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
import React from 'react';

import Button from '../UI/Button/Button';

import '../../../css/components/Reservation/Reservation.scss';

const reservation = (props) => {
    const date = new Date(props.date)
    return (
        <div className='Reservation_container'>
            <div className='Reservation_header'>
                {`${date.toLocaleDateString('en-EN', {weekday:'short'}).toUpperCase()}
                  ${date.toLocaleDateString('en-EN', {month:'short'}).toUpperCase()}
                  ${date.getDate()}`}
                  {/* needs some clean up */}
            </div>
            <div className='Reservation_body'>
                    <svg className='Reservation_svg'>
                        <circle className='Reservation_circleGreen' 
                            cx="50%" cy="50%" r="30%"/>
                        <circle className='Reservation_circleRed' 
                            cx="50%" cy="50%" r="30%"
                            strokeDasharray={`${props.graphStatus.status} 188.4%`}
                            style={props.graphStatus.isVisible} />
                        <text className='Reservation_text' 
                            x="50%" y="50%"
                            style={{fill:props.graphStatus.fill}}>
                                { props.userParkingSpot
                                    ? props.userParkingSpot
                                    : `${props.usedSpaces}/${props.parkingSpaces}`}
                        </text>
                    </svg>
                    <Button 
                        text={props.buttonOptions.buttonText} 
                        classname={`Button_${props.buttonOptions.buttonClass}`}
                        buttonStyle={{width:'50%'}}/>
            </div>
        </div>
    )
}

export default reservation;
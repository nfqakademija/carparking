import React from 'react';

import '../../../../css/components/Reservation/Reservation.scss';

const statusSvg = props => (
    <svg className='Reservation_svg'> 
        <circle className='Reservation_circleBase' 
                cx="50%" cy="55%" r="30%"
                strokeDasharray={`110% 110%`}/>
        <circle className='Reservation_circleStatus' 
                cx="50%" cy="55%" r="30%"
                strokeDasharray={`${props.graphStatus.status} 184.2%`}
                style={props.graphStatus.isVisible} />
        <text   className='Reservation_text' 
                style={{fontSize:'2em'}}
                x="50%" y="45%">
                    {`${(props.usedSpots/props.lotSize)*100}%`}                      
        </text>
        <text   className='Reservation_text'
                x="35%" y="77.5%">
                    {props.lotSize}                      
        </text>
        <text   className='Reservation_text' 
                style={{fontSize:'0.75em', fill:'#8d8d8d'}}
                x="35%" y="85%">
                    Overall                     
        </text>
        <line   className='Reservation_line'
                x1="50%" y1="15%" x2="50%" y2="32.5%">
        </line>
        <text   className='Reservation_text'
                x="65%" y="77.5%">
                    {props.usedSpots}                   
        </text>
        <text   className='Reservation_text' 
                style={{fontSize:'0.75em', fill:'#8d8d8d'}}
                x="65%" y="85%">
                    Used                     
        </text>
    </svg>
)

export default statusSvg;
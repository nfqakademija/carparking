import React from 'react';

import '../../../css/components/Reservation/Reservation.scss';

const reservation = (props) => {
    return (
        <div className='Reservation_container'>
            <div className='Reservation_header'>
                MONDAY NOV 11
                {/* {props.date} */}
            </div>
            <div className='Reservation_body'>
                    <svg className='Reservation_svg'>
                        <circle className='Reservation_circleGreen' cx="50%" cy="50%" r="30%"/>
                        <circle className='Reservation_circleRed' cx="50%" cy="50%" r="30%"
                            strokeDasharray="60% 188.4%" />
                        <text className='Reservation_text' x="50%" y="50%">A34</text>
                    </svg>
                    <span>Button should be here</span>
            </div>
        </div>
    )
}

export default reservation;
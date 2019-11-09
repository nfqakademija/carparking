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
                    <svg className='Reservation_svg' viewBox='0 0 100% 100%'>
                        <circle className='Reservation_circleGreen' cx="50%" cy="50%" r="30%"/>
                        <circle className='Reservation_circleRed' cx="50%" cy="50%" r="30%"
                            stroke-dasharray="94.2% 188.4%" />
                    </svg>
            </div>
        </div>
    )
}

export default reservation;
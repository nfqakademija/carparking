import React from 'react';

import '../../../../css/components/UsersTable/UsersTable.scss';


const userHeader = (props) => {

    const dateString = date => (
        date.toLocaleDateString('en-EN', {weekday:'long'})
    )

    const iconHandler = (date,reservation) => {
        if(date.getDay()){ // check if not sunday
            if(reservation){
                return ( // have spot case
                    <a data-toggle='tooltip' 
                        key={date.getDay()}
                        title={`You already have a parking spot for ${dateString(date)}`}>
                            <i key={date} className="fas fa-parking UserTable_greenIcon" ></i>
                    </a>
                )
            } else {
                return ( // dont have spot case
                    <a data-toggle='tooltip' 
                        key={date}
                        title={`You can regain your parking space for ${dateString(date)} on the reserve page`}>
                            <i key={date} className="fas fa-parking UserTable_redIcon"></i> 
                    </a>
                )
            }
        }
    }

    return(
        <div className='UserTable_userContainerMain'>
            <div>
                {`${props.mainUser.name} 
                ${props.mainUser.surname}`}
            </div>
            <div> 
                {props.reservationStatus.map( dayObj => {
                    const date = new Date(dayObj.date)
                    const reservation = props.mainUser.reservations.find(reservation => reservation.date === dayObj.date)
                                                        
                    return (
                        iconHandler(date,reservation)
                    )
                })}
            </div>
        </div>
)}

export default userHeader;
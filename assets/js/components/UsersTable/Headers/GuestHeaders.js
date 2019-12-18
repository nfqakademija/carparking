import React from 'react';


const guestHeader = props => {

    const getMonthDay = date => (
        new Date(date).getDate()
     )

    const dateString = date => (
        date.toLocaleDateString('en-EN', {weekday:'long'})
    )

    const iconHandler = (date,reservation) => {
        if(date.getDay()){ // check if not sunday

            if(reservation){ // check if guest have reservation approved or not

               if(reservation.parkSpace){

                    return (
                        <a data-toggle='tooltip' // reservation approved case
                            key={date}
                            title={`You already have a parking spot for ${dateString(date)}`}>
                                <i key={date} className="fas fa-parking UserTable_greenIcon" ></i>
                        </a>)
               } else {

                    return (
                        <a data-toggle='tooltip' // reservation not approved case
                            key={date}
                            title={`You can ask for parking space for ${dateString(date)} by clicking on the icon in this column `}>
                                <i key={date} className="fas fa-parking UserTable_redIcon"></i> 
                        </a>)

               }
            } else {

                return (
                    <a data-toggle='tooltip' // dont have reservation case
                        key={date}
                        title={`You must request for registration for ${dateString(date)} on the reserve page first`}>
                            <i key={date} className="fas fa-parking UserTable_greyIcon"></i> 
                    </a>)
            }
        }
    }

    return (
    <div className='UserTable_userContainerMain'>
                    <div>{ `${props.mainUser.name.charAt(0).toUpperCase() + props.mainUser.name.substring(1)} 
                            ${props.mainUser.surname.charAt(0).toUpperCase() + props.mainUser.surname.substring(1)}`}
                    </div>
                    <div> 
                        {props.reservationStatus.map( dayObj => {
                            const date = new Date(dayObj.date)
                            const reservation = props.mainUser.reservations.find(reservation => getMonthDay(reservation.reservationDate.date) === getMonthDay(dayObj.date))
                            return (
                                iconHandler(date,reservation) 
                            )
                        })}
                    </div>
                </div>
)}

export default guestHeader; 
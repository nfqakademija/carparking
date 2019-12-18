import React from 'react';


const guestHeader = props => {

    const iconHandler = (dayObj, user) => {
        const date = new Date(dayObj.date)

        if(new Date(dayObj.date).getDay()){

            if(user.reservations.find( reservation => reservation[0] === dayObj.date)){

                if (props.mainUser.reservations.find( reservation => new Date(reservation.reservationDate.date).getDate() === date.getDate() && reservation.parkSpace)) {
                    // main guest have spot
                    return <i key={dayObj.date} className="fas fa-parking UserTable_greenIcon"></i>
                } else {

                    if(props.mainUser.reservations.find( reservation => new Date(reservation.reservationDate.date).getDate() === date.getDate())){

                        return ( // main guest waiting for park pace
                            <a data-toggle='tooltip' 
                                key={dayObj.date}
                                onClick={()=>props.onclick(dayObj, user)}
                                title={`You can ask 
                                        ${user.name.charAt(0).toUpperCase() + user.name.substring(1)} 
                                        for parking space for ${date.toLocaleDateString('en-EN', {weekday:'long'})}`}>
                                    <i key={dayObj.date}  className="fas fa-parking UserTable_greenClickableIcon"></i>
                            </a>
                        )
                    } else {

                        return (
                            <a data-toggle='tooltip' // main guest dont have registration
                                key={dayObj.date}
                                title={`You must request for registration for ${date.toLocaleDateString('en-EN', {weekday:'long'})} on the reserve page first`}>
                                    <i key={dayObj.date} className="fas fa-parking UserTable_greenIcon"></i>
                            </a>
                        )
                    }
                }

            } else {
                // list user dont have spot
                return <i key={dayObj.date} className="fas fa-parking UserTable_greyIcon"></i>

            } 
        }
    }

    return (
        props.usersList.map( user =>(
            props.mainUser.name !== user.name || props.mainUser.surname !== user.surname
                
                ? <div className='UserTable_userContainer' key={user.id}>
                    <div>{ `${user.name.charAt(0).toUpperCase() + user.name.substring(1)} 
                            ${user.surname.charAt(0).toUpperCase() + user.surname.substring(1)}`}</div>
                    <div>
                        {props.reservationStatus.map( dayObj => {
                            return ( 
                                iconHandler(dayObj, user)     
                        )})}
                    </div>
                </div>
                
                : null    
        ))
)}

export default guestHeader;
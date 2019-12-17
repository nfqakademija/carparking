import React from 'react';


const userBody = props => {

    const iconHandler = (dayObj, user) => {
        if(new Date(dayObj.date).getDay()){

            if(user.reservations.find( reservation => reservation[0] === dayObj.date)){

                return <i key={dayObj.date} className="fas fa-parking UserTable_greenIcon"></i>

            } else {

                return <i key={dayObj.date} className="fas fa-parking UserTable_greyIcon"></i>

            } 
        }
    }

    return (
        props.usersList.map( user =>(

            props.mainUser.userId !== user.userId
                
                ? <div className='UserTable_userContainer' key={user.id}>
                    <div>{`${user.name} ${user.surname}`}</div>
                    <div>
                        {props.reservationStatus.map( dayObj =>( 
                                iconHandler(dayObj,user)
                        ))}
                    </div>
                </div>
                
                : null    
        ))
)}

export default userBody;
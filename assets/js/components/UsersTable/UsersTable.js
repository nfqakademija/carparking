import React from 'react';

import '../../../css/components/UsersTable/UsersTable.scss';

const usersTable = React.forwardRef((props, ref) => (
        <div className='UsersTable_container shadow' ref={ref}>
            <div className='UsersTable_body'>
                <div className='UserTable_tableHead bg-dark text-white rounded-top'>
                    <div className='itemUsers'>User</div>
                    <div className='itemReservation'>Reservation status</div>
                    <div className='itemDays'>
                        {props.reservationStatus.map( dayObj =>(
                            // this string is for getting weekday symbol
                            new Date(dayObj.date).getDay() !== 0 //skip sunday (skip sunday function needed)
                            ?<span key={dayObj.date}>
                                {new Intl.DateTimeFormat('en-EN', {weekday: 'narrow'}).format(new Date(dayObj.date))} 
                            </span>
                            :null
                        ))}
                    </div>
                </div>
                <div className='UserTable_userContainerMain'>
                    <div>{`${props.mainUser.name} ${props.mainUser.surname}`}</div>
                    <div> 
                        {props.reservationStatus.map( dayObj => {
                            const date = new Date(dayObj.date)
                            const reservation = props.mainUser.reservations.find(reservation => reservation.date === dayObj.date)
                            const guestReservation = props.mainUser.reservations.find(reservation => new Date(reservation.reservationDate.date).getDate() === new Date(dayObj.date).getDate())
                            return(
                                date.getDay() === 0 // check if sunday
                                
                                ? null    
                                
                                : props.mainUser.role === "user" // check if user
                                    
                                    ? reservation // check if user have spot
                                        
                                        ?  <a data-toggle='tooltip' // have spot case
                                                key={date}
                                                title={`You already have a parking spot for ${date.toLocaleDateString('en-EN', {weekday:'long'})}`}>
                                                    <i key={date} className="fas fa-parking UserTable_greenIcon" ></i>
                                            </a>
                                        
                                        : <a data-toggle='tooltip' // dont have spot case
                                            key={date}
                                            title={`You can regain your parking space for ${date.toLocaleDateString('en-EN', {weekday:'long'})} on the reserve page`}>
                                                <i key={date} className="fas fa-parking UserTable_redIcon"></i> 
                                        </a>
                                    
                                    : guestReservation//check if guest have reservation
                                        
                                        ? guestReservation.parkSpace //check if guest reservation approved
                                            
                                            ? <a data-toggle='tooltip' // reservation approved case
                                                key={date}
                                                title={`You already have a parking spot for ${date.toLocaleDateString('en-EN', {weekday:'long'})}`}>
                                                    <i key={date} className="fas fa-parking UserTable_greenIcon" ></i>
                                            </a>
                                            
                                            : <a data-toggle='tooltip' // reservation not approved case
                                                key={date}
                                                title={`You can ask for parking space for ${date.toLocaleDateString('en-EN', {weekday:'long'})} by clicking on the icon in this column `}>
                                                    <i key={date} className="fas fa-parking UserTable_redIcon"></i> 
                                            </a>
                                        
                                        : <a data-toggle='tooltip' // dont have seservation case
                                            key={date}
                                            title={`You must request for registration for ${date.toLocaleDateString('en-EN', {weekday:'long'})} on the reserve page first`}>
                                            <i key={date} className="fas fa-parking UserTable_greyIcon"></i> 
                                        </a>
                        )})}
                    </div>
                </div>
                <div>
                {props.usersList.map( user =>(
                        props.mainUser.name !== user.name || props.mainUser.surname !== user.surname
                            
                            ? <div className='UserTable_userContainer' key={user.id}>
                                <div>{`${user.name} ${user.surname}`}</div>
                                <div>
                                    {props.reservationStatus.map( dayObj => {
                                        const date = new Date(dayObj.date)
                                        return ( // every icon has spot in grid and this code checking if user has reservation in this grid space
                                        date.getDay() === 0 //skip sunday
                                            
                                            ? null
                                            
                                            : user.reservations.length > 0 // check if have any reservations 
                                                
                                                ? user.reservations.find( reservation => reservation[0] === dayObj.date) // check if list user have reservation for this day
                                                    
                                                    ? props.mainUser.role === 'user'  //check main user role
                                                        
                                                        ? <i key={dayObj.date} className="fas fa-parking UserTable_greenIcon"></i> // main user case no clickable icons
                                                        
                                                        : props.mainUser.reservations.find( reservation => new Date(reservation.reservationDate.date).getDate() === date.getDate() && reservation.parkSpace)
                                                            
                                                            ? <i key={dayObj.date} className="fas fa-parking UserTable_greenIcon"></i> // main guest already have spot no clickable icons
                                                            
                                                            : props.mainUser.reservations.find( reservation => new Date(reservation.reservationDate.date).getDate() === date.getDate())
                                                                
                                                                ? <a data-toggle='tooltip' // main guest have reservation but not approved
                                                                    key={dayObj.date}
                                                                    onClick={()=>props.onclick(dayObj, user)}
                                                                    title={`You can ask ${user.name} for parking space for ${date.toLocaleDateString('en-EN', {weekday:'long'})}`}>
                                                                        <i key={dayObj.date}  className="fas fa-parking UserTable_greenClickableIcon"></i>
                                                                </a>
                                                                : <a data-toggle='tooltip' // main guest have reservation but not approved
                                                                    key={dayObj.date}
                                                                    title={`You must request for registration for ${date.toLocaleDateString('en-EN', {weekday:'long'})} on the reserve page first`}>
                                                                        <i key={dayObj.date} className="fas fa-parking UserTable_greenIcon"></i>
                                                                </a>
                                                            
                                                    
                                                    : <i key={dayObj.date} className="fas fa-parking UserTable_greyIcon"></i>
                                                
                                                : <i key={dayObj.date} className="fas fa-parking UserTable_greyIcon"></i>
                                    )})}
                                </div>
                            </div>
                            
                            : null    
                    ))}
                    </div>
            </div>
        </div>      
    )
    )

export default usersTable;

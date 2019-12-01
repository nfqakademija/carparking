import React from 'react';

import '../../../css/components/UsersTable/UsersTable.scss';

const usersTable = (props) => (
        <div className='UsersTable_container'> 
            <div className='UsersTable_header'>
                USERS
            </div>
            <div className='UsersTable_body'>
                <div className='UserTable_tableHead'>
                    <div className='itemUsers'>User</div>
                    <div className='itemReservation'>Reservation status</div>
                    <div className='itemDays'>
                        {props.reservationStatus.map( dayObj =>(
                            // this string is for getting weekday symbol
                            <span key={dayObj.date}>
                                {new Intl.DateTimeFormat('en-EN', {weekday: 'narrow'}).format(new Date(dayObj.date))} 
                            </span>
                        ))}
                    </div>
                </div>
                <div className='UserTable_userContainerMain'>
                    <div>{`${props.mainUser.name} ${props.mainUser.lastname}`}</div>
                    <div>
                        {props.reservationStatus.map( dayObj => (
                            dayObj.userReservation
                                ? <i key={dayObj.date} className="fas fa-parking" style={{color:'#95D195', fontSize: '1.5em'}}></i>
                                : <i key={dayObj.date} className="fas fa-parking UserTable_redIcon"></i> 
                        ))}
                    </div>
                </div>
                {props.usersList.map( user => (
                    props.mainUser.name !== user.name || props.mainUser.lastname !== user.surname
                        ? <div className='UserTable_userContainer' key={user.id}>
                            <div>{`${user.name} ${user.surname}`}</div>
                            {console.log(user.reservations)}
                            <div>
                                {props.reservationStatus.map( dayObj => (
                                    // every icon has spot in grid and this code checking if user has reservation in this grid space
                                    user.reservations !== []
                                    ? user.reservations.find( reservation => new Date (reservation['reservation_date']).getDate() === new Date(dayObj.date).getDate() )
                                        ? <i key={dayObj.date} className="fas fa-parking UserTable_greenIcon"></i>
                                        : <i key={dayObj.date} className="fas fa-parking UserTable_redIcon"></i>
                                    : <i key={dayObj.date} className="fas fa-parking UserTable_redIcon"></i>
                                ))}
                            </div>
                        </div>
                        : null    
                ))}
            </div>
        </div>      
    )

export default usersTable;

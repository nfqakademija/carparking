import React from 'react';

import UserHeader from './Headers/UserHeader';
import GuestHeader from './Headers/GuestHeader';
import UserBody from './Body/UserBody';
import GuestBody from './Body/GusetBody';

import '../../../css/components/UsersTable/UsersTable.scss';

const usersTable = React.forwardRef((props, ref) => ( // after data structure refactoring this becomes unreadable. We need to separate user case from guest case
        <div className='UsersTable_container shadow' ref={ref}>

            <div className='UserTable_tableHead bg-dark text-white rounded-top'>

                    <div className='itemUsers'>User</div>
                    <div className='itemReservation'>Reservation status</div>
                    <div className='itemDays'>
                        {props.reservationStatus.map( dayObj =>(
                            // this string is for getting weekday symbol
                            new Date(dayObj.date).getDay() !== 0 //skip sunday (skip sunday function needed)
                            ? <span key={dayObj.date}>
                                {new Intl.DateTimeFormat('en-EN', {weekday: 'narrow'}).format(new Date(dayObj.date))} 
                              </span>

                            : null
                        ))}
                    </div>
            </div>

            <div className='UsersTable_body' >

                {props.mainUser.role === 'user'
                    ? <UserHeader 
                        mainUser={props.mainUser}
                        reservationStatus={props.reservationStatus}/>

                    : <GuestHeader
                        mainUser={props.mainUser}
                        reservationStatus={props.reservationStatus}/>
                }
            
                <div>
                    {props.mainUser.role === 'user'
                        ? <UserBody
                            mainUser={props.mainUser}
                            usersList={props.usersList}
                            reservationStatus={props.reservationStatus}/>

                        : <GuestBody
                            mainUser={props.mainUser}
                            usersList={props.usersList}
                            reservationStatus={props.reservationStatus}/>}
                </div>
            </div>
        </div>      
    )
    )

export default usersTable;

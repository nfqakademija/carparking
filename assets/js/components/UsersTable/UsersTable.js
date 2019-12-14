import React from 'react';

import '../../../css/components/UsersTable/UsersTable.scss';

const usersTable = React.forwardRef((props, ref) => (
        <div className='UsersTable_container' ref={ref}> 
        {console.log(props)}
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
                            new Date(dayObj.date).getDay() !== 0 //skip sunday
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
                            return(
                            dayObj.userReservation
                                ?<a data-toggle='tooltip'
                                    key={date}
                                    title={`You already have a parking spot for ${date.toLocaleDateString('en-EN', {weekday:'long'})}`}>
                                        <i key={date} className="fas fa-parking UserTable_greenIcon" ></i>
                                 </a>
                                :<a data-toggle='tooltip'
                                    key={date}
                                    title={`You can ask for parking space for ${date.toLocaleDateString('en-EN', {weekday:'long'})} by clicking on the icon in this column `}>
                                        <i key={date} className="fas fa-parking UserTable_redIcon"></i> 
                                 </a>
                        )})}
                    </div>
                </div>
                {props.usersList.map( user => (
                    props.mainUser.name !== user.name || props.mainUser.lastname !== user.surname
                        ? <div className='UserTable_userContainer' key={user.id}>
                            <div>{`${user.name} ${user.surname}`}</div>
                            <div>
                                {props.reservationStatus.map( dayObj => (
                                    // every icon has spot in grid and this code checking if user has reservation in this grid space
                                    user.reservations !== []
                                    ? user.reservations.find( reservation => new Date (reservation['reservation_date']).getDate() === new Date(dayObj.date).getDate() )
                                        ? dayObj.userReservation
                                            ?<i key={dayObj.date} className="fas fa-parking UserTable_greenIcon"></i>
                                            :props.popupShake
                                                ? <a data-toggle='tooltip'
                                                        key={dayObj.date}
                                                        title='You must first accept or reject notification message'>
                                                            <i key={dayObj.date} onClick={props.popupShake} className="fas fa-parking UserTable_greenClickableIcon"></i>
                                                  </a>
                                                : <a data-toggle='tooltip'
                                                    key={dayObj.date}
                                                    title={`You can ask ${user.name} for parking space for ${dayObj.date.toLocaleDateString('en-EN', {weekday:'long'})}`}>
                                                        <i key={dayObj.date} onClick={()=>props.onclick(dayObj, user)} className="fas fa-parking UserTable_greenClickableIcon"></i>
                                                  </a>
                                        : <i key={dayObj.date} className="fas fa-parking UserTable_greyIcon"></i>
                                    : <i key={dayObj.date} className="fas fa-parking UserTable_greyIcon"></i>
                                ))}
                            </div>
                        </div>
                        : null    
                ))}
            </div>
        </div>      
    )
    )

export default usersTable;

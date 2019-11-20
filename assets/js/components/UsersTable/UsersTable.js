import React from 'react';
import { connect } from "react-redux";

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
                            // ugly string to get weekday symbol.
                            <span key={dayObj.date}>
                                {new Intl.DateTimeFormat('en-EN', {weekday: 'narrow'}).format(dayObj.date)} 
                            </span>
                        ))}
                    </div>
                </div>
                <div className='UserTable_userContainerMain'>
                    <div>{`${props.userName} ${props.userLastname}`}</div>
                    <div>
                        {props.reservationStatus.map( dayObj => (
                            dayObj.userReservation
                                ? <i key={dayObj.date} className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                                : <i key={dayObj.date} className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i> 
                        ))}
                    </div>
                </div>
                {props.usersList.map( user => {
                    {console.log(user)}
                    if(props.userName !== user.name && props.userLastname !== user.surname){
                        return (
                        <div className='UserTable_userContainer' key={user.id}>
                            <div>{`${user.name} ${user.surname}`}</div>
                            <div>
                                <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                                <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                                <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                                <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                                <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                                <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                            </div>
                        </div>
                        )
                    }
                })}
            </div>
        </div>
           
    )


const mapStateToProps = state => {
    return {
        userName: state.user.name,
        userLastname: state.user.lastname,
        reservationStatus: state.reservationStatus
    }
}

export default connect(mapStateToProps)(usersTable);

// {/* <div>
//                         <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em", margin:"0 0.5em"}}></i>
//                         <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em", margin:"0 0.5em"}}></i>
//                         <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em", margin:"0 0.5em"}}></i>
//                     </div> */}
import React from 'react';
import { connect } from "react-redux";

import '../../../css/components/UsersTable/UsersTable.scss';

const usersTable = (props) => {
    return (
        <div className='UsersTable_container'> 
            <div className='UsersTable_header'>
                USERS
            </div>
            <div className='UsersTable_body'>
                <div className='UserTable_tableHead'>
                    <div className='itemUsers'>User</div>
                    <div className='itemReservation'>Reservation status</div>
                    <div className='itemDays'>
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                    </div>
                </div>
                <div className='UserTable_userContainerMain'>
                    <div>{`${props.userName} ${props.userLastname}`}</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>
                <div className='UserTable_userContainer'>
                    <div>Lukas Laurinavicius</div>
                    <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em"}}></i>
                    </div>
                </div>

            </div>
        </div>
           
    )
}

const mapStateToProps = state => {
    return {
        userName: state.user.name,
        userLastname: state.user.lastname
    }
}

export default connect(mapStateToProps)(usersTable);

{/* <div>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em", margin:"0 0.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#95D195", fontSize:"1.5em", margin:"0 0.5em"}}></i>
                        <i className="fas fa-parking" style={{color:"#E68F8C", fontSize:"1.5em", margin:"0 0.5em"}}></i>
                    </div> */}
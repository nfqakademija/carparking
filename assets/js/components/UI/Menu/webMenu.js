import React from 'react';
import {NavLink} from "react-router-dom";
import {openModal} from "../../../store/actions/main";
import {connect} from "react-redux";



const webMeniu = (props) => {
    const notificationHandler = () => {
        if(props.notifications.find( notification => !Number(notification.accepted) && !notification.rejected)){
            return <i className="fas fa-dot-circle" style={{fontSize:'0.25em', color:'#E87C86'}}> </i>
        } else {
            return <i className="fas fa-bell" style={{fontSize:'0.25em', color:'#E87C86', opacity:'0'}}> </i>
        }
    }

    return (
    <div className="d-none bg-white d-md-block col-0 col-md-4 col-lg-3 p-0 shadow h-100">
        <div className="d-none d-md-block col-0 col-md-4 col-lg-3 position-fixed p-0 mt-2">
            <div className="text-left webMeniu">
                <div className="position-relative mt-1 py-2 linkParent">
                <span className="ml-4 position-absolute">
                    <i className="fa fa-check-square-o"></i></span>
                    <div style={{marginLeft: "5rem"}}>
                        {props.popupOpened
                                ?<a title='You must first accept or reject notification message' className="link" onClick={props.popupOpened}  style={{cursor: "pointer"}}>Reserve</a>
                                :<NavLink to='/app/home' activeClassName='webMenu_activeClass' className="link" onClick={props.onclick}>Reserve</NavLink>}
                    </div>
                </div>
                <hr className="m-0" />
                <div className="position-relative py-2 linkParent">
                    <span className="ml-4 position-absolute">
                        <i className="fas fa-bell"></i>
                        {props.userRole === 'user'
                            ? props.notifications
                                    ? <i className="fas fa-dot-circle" 
                                        style={{
                                            fontSize:'0.25em', 
                                            color:'#E87C86',
                                            opacity:!!props.notifications.find( notification => !Number(notification.accepted) && !notification.rejected)?'1':'0'
                                        }}></i>
                                    
                                    //!!props.notifications.find( notification => !Number(notification.accepted) && !notification.rejected)

                                        // ? console.log('circle',!!props.notifications.find( notification => !Number(notification.accepted) && !notification.rejected))
                                        // <i className="fas fa-dot-circle" style={{fontSize:'0.25em', color:'#E87C86'}}></i>
                                        // : console.log('bell bad',!!props.notifications.find( notification => !Number(notification.accepted) && !notification.rejected))
                                        // <i className="fas fa-bell" style={{fontSize:'0.25em', color:'#E87C86', opacity:'0'}}></i>
                                    : <i className="fas fa-bell" style={{fontSize:'0.25em', color:'#E87C86', opacity:'0'}}></i>
                            : null}
                    </span>
                    <div style={{marginLeft: "5rem"}}>
                        {props.popupOpened
                            ?<a title='You must first accept or reject notification message' className="link" onClick={props.popupOpened}  style={{cursor: "pointer"}}>Notifications</a>
                            :<NavLink to="/app/notifications" className="link" activeClassName='webMenu_activeClass' onClick={props.onclick}>Notifications</NavLink>}
                    </div>
                </div>
                <hr className="m-0" />
                <div className="position-relative py-2 linkParent">
                    <span className="ml-4 position-absolute"><i className="fa fa-users"> </i></span>
                    <div style={{marginLeft: "5rem"}}>
                        {props.popupOpened
                            ?<a title='You must first accept or reject notification message' className="link" onClick={props.popupOpened}  style={{cursor: "pointer"}}>Watch Users</a>
                            :<NavLink to="/app/users" className="link" activeClassName='webMenu_activeClass' onClick={props.onclick}>Watch Users</NavLink>}
                    </div>
                </div>
                <hr className="m-0" />
                {props.userRole === 'user'
                    ? <div className="position-relative py-2 linkParent">
                        <span className="ml-4 position-absolute"><i className="fas fa-suitcase-rolling"> </i></span>
                        <div style={{marginLeft: "5rem"}}>
                            {props.popupOpened
                                ?<a title='You must first accept or reject notification message' className="link" onClick={props.popupOpened}  style={{cursor: "pointer"}}>Set Away</a>
                                :<NavLink to="/app/away" className="link" activeClassName='webMenu_activeClass' onClick={props.onclick}>Set Away</NavLink>}
                        </div>
                    </div>
                    : null}
                
                <hr className="m-0" />
                <div className="position-relative py-2 linkParent">
                    <span className="ml-4 position-absolute"><i className="fas fa-car-side"> </i></span>
                    <div style={{marginLeft: "5rem"}}>
                        <p onClick={ props.openModal } className="link" style={{cursor: "pointer"}}>Car Plate</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)};

const mapDispatchToProps= dispatch => ({
    openModal: () => dispatch(openModal()),
});

const mapStateToProps = state => ({
    userRole: state.singleUser.user.role,
    notifications: state.notifications.notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(webMeniu);


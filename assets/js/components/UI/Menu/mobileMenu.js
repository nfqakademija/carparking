import React from 'react';
import {NavLink} from "react-router-dom";
import {closeMobileMenu, openModal} from "../../../store/actions/main";
import {connect} from "react-redux";

const mobileMenu = (props) => (
    <div>

        <div className="container-fluid w-100 p-0 p-2 bg-dark">
            <div className="d-flex justify-content-between">
                <div></div>
                <div className="align-self-center">
                    <p className="m-0 pl-0 h4 align-self-center text-white">
                        <b>Menu</b>
                    </p>
                </div>
                <div>
                    <a
                        className="mb-0 h2 text-white"
                        onClick={props.closeMobileMenu}
                        style={{cursor: "pointer"}}> 
                        {/* change this with icon */}
                        × 
                    </a>
                </div>
            </div>
        </div>

        <div className="text-left h4">

            <div className="position-relative py-3">
                <span className="ml-4 position-absolute"><i className="fa fa-user-circle "> </i></span>
                <span style={{ marginLeft: "60px"}}>
                    {props.userName ? props.userName : "Vardenis"} {props.userLastname ? props.userLastname : "Pavardenis"}
                </span>
            </div>

            <hr className="m-0" />

            <div className="position-relative mt-1 py-2 linkParent">
                <span className="ml-4 position-absolute">
                    <i className="fa fa-check-square-o"> </i></span>
                <div style={{ marginLeft: "60px"}}>
                    <NavLink to='/app/home' className="link" onClick={ props.closeMobileMenu }>Reserve</NavLink>
                </div>
            </div>

            <div className="position-relative py-2 linkParent">
                <span className="ml-4 position-absolute"><i className="fas fa-bell"></i></span>
                <div style={{ marginLeft: "60px"}}>
                    <NavLink to="/app/notifications" className="link" onClick={props.closeMobileMenu}>Notifications</NavLink>
                </div>
            </div>

            <div className="position-relative py-2 linkParent">
                <span className="ml-4 position-absolute"><i className="fa fa-users"> </i></span>
                <div style={{ marginLeft: "60px"}}>
                    <NavLink to="/app/users" className="link" onClick={props.closeMobileMenu}>Watch Users</NavLink>
                </div>
            </div>

            {props.userRole === 'user'
                ? <div className="position-relative py-2 linkParent">
                    <span className="ml-4 position-absolute"><i className="fas fa-suitcase-rolling"> </i></span>
                    <div style={{ marginLeft: "60px"}}>
                        <NavLink to="/app/away" className="link" onClick={props.closeMobileMenu}>Set Away</NavLink>
                    </div>
                  </div>
                : null}
        
            <div className="position-relative py-2 linkParent">
                <span className="ml-4 position-absolute"><i className="fas fa-car-side"> </i></span>
                <div style={{ marginLeft: "60px"}}>
                    <p onClick={ props.openModal } className="link" style={{cursor: "pointer"}}>Car Plate</p>
                </div>
            </div>

        </div>

    </div>
);

const mapDispatchToProps = dispatch => ({
    closeMobileMenu: () => dispatch(closeMobileMenu()),
    openModal: () => dispatch(openModal())
});

const mapStateToProps = state => ({
    userRole: state.singleUser.user.role
})

export default connect(mapStateToProps, mapDispatchToProps)(mobileMenu);
import React from 'react';
import {NavLink} from "react-router-dom";
import {closeMobileMenu} from "../../../store/actions/main";
import {connect} from "react-redux";

const mobileMenu = (props) => (
    <div>

        <div className="container-fluid w-100 p-0 p-2 bg-dark">
            <div className="d-flex justify-content-between">
                <div></div>
                <div className="align-self-center">
                    <p className="m-0 pl-0 h4 align-self-center text-white" style={{fontSize:'2.5rem'}}>
                        <b>Menu</b>
                    </p>
                </div>
                <div>
                    <a
                        className="mb-0 h2 text-white"
                        onClick={props.onCloseMobileMenu}
                        style={{cursor: "pointer", fontSize:'2.5rem', fontWeight:'900', marginRight:'1rem'}}>
                        <i className="fas fa-times"></i>
                    </a>
                </div>
            </div>
        </div>

        <div className="text-left h4">

            <div className="position-relative py-3">
                <span className="ml-4 position-absolute"><i className="fa fa-user-circle "></i></span>
                <span style={{ marginLeft: "5rem"}}>
                    {props.userName ? props.userName : "Vardenis"} {props.userLastname ? props.userLastname : "Pavardenis"}
                </span>
            </div>

            <hr className="m-0" />

            <div className="position-relative mt-1 py-2 linkParent" style={{fontSize:'2rem'}}>
                <span className="ml-4 position-absolute">
                    <i className="fa fa-check-square-o"></i></span>
                <div style={{ marginLeft: "5rem"}}>
                    <NavLink to='/home' className="link" onClick={props.onCloseMobileMenu}>Reserve</NavLink>
                </div>
            </div>

            <div className="position-relative py-2 linkParent" style={{fontSize:'2rem'}}>
                <span className="ml-4 position-absolute"><i className="fa fa-users"></i></span>
                <div style={{ marginLeft: "5rem"}}>
                    <NavLink to="/users" className="link" onClick={props.onCloseMobileMenu}>Watch Users</NavLink>
                </div>
            </div>

        </div>

    </div>
);

const mapDispatchToProps = dispatch => ({
    onCloseMobileMenu: () => dispatch(closeMobileMenu())
});

export default connect(null, mapDispatchToProps)(mobileMenu);
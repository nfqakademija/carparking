import React from 'react';
import {NavLink} from "react-router-dom";
import {closeMobileMenu} from "../../../store/actions/main";
import {connect} from "react-redux";

const mobileMenu = (props) => (
    <div>

        <div className="container-fluid w-100 p-0 p-2 bg_orange">
            <div className="d-flex justify-content-between">
                <div className="align-self-center">
                    <p className="m-0 pl-0 h4 align-self-center">
                        <b>Menu</b>
                    </p>
                </div>
                <div>
                    <a
                        className="mb-0 h2"
                        onClick={props.closeMobileMenu}
                        style={{ cursor: "pointer" }}>
                        ×
                    </a>
                </div>
            </div>

            <div className="text-left mt-4 h2">
                <li><i className="fa fa-user-circle"></i> {props.userName} {props.userLastname ? props.userLastname : "Pavardenis"}</li>
            </div>
        </div>

        <ul className="text-left w3-ul">
            <li>
                <i className="fa fa-check-square-o"></i>
                <NavLink className=" text-dark h2" to='/home' onClick={props.onclick}>Reserve</NavLink>
            </li>

            <li>
                <i className="fa fa-users mr-2"></i>
                <NavLink className=" text-dark h2" to="/users" onClick={props.onclick}>Watch Users</NavLink>
            </li>
        </ul>

    </div>
);

const mapDispatchToProps= dispatch => ({
    closeMobileMenu: () => dispatch(closeMobileMenu())
});

export default connect(null, mapDispatchToProps)(mobileMenu);
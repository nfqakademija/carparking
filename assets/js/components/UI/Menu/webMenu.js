import React from 'react';
import {NavLink} from "react-router-dom";


const webMeniu = (props) => (
            <div className="d-none bg_lightGrey d-md-block col-0 col-md-4 col-lg-3 p-0 box-shadow h-100">
                <div className="d-none d-md-block col-0 col-md-4 col-lg-3 position-fixed p-0 mt-2">
                    <div className="py-2">
                        <p className=" m-0 h3">
                            <b>Menu</b>
                        </p>
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
            </div>
)

export default webMeniu;


import React from 'react';
import {NavLink} from "react-router-dom";


const webMeniu = (props) => (
    <div className="d-none bg-light d-md-block col-0 col-md-4 col-lg-3 p-0 shadow h-100">
        <div className="d-none d-md-block col-0 col-md-4 col-lg-3 position-fixed p-0">
            <div className="text-left webMeniu">
                <div className="position-relative py-2 linkParent">
                <span className="ml-4 position-absolute ">
                    <i className="fa fa-check-square-o"></i></span>
                    <div style={{marginLeft: "5rem"}}>
                        <NavLink to='/home' activeClassName='webMenu_activeClass' className="link" onClick={props.onclick}>Reserve</NavLink>
                    </div>
                </div>
                <hr className="m-0" />
                <div className="position-relative py-2 linkParent">
                    <span className="ml-4 position-absolute"><i className="fa fa-users"></i></span>
                    <div style={{marginLeft: "5rem"}}>
                        <NavLink to="/users" className="link" activeClassName='webMenu_activeClass' onClick={props.onclick}>Watch Users</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default webMeniu;


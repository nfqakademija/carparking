import React from 'react';
import {NavLink} from "react-router-dom";

const menu = () => (
    <div className="hide-text">
        <hr className="m-0"/>
        <div className="m-0 p-2 text-left h6">
            <NavLink className=" text-dark h2" to='/home'>Reserve</NavLink>
        </div>
        <hr className="m-0"/>
        <div className="m-0 p-2 text-left h6">
            <NavLink className=" text-dark h2" to="/users">Watch Users</NavLink>
        </div>
        <hr className="m-0"/>
        {/* <div className="m-0 p-2 text-left h6">
            <NavLink className="text-dark" href="#users">a</NavLink>
        </div>
        <hr className="m-0"/> */}
    </div>
)

export default menu;
import React from 'react';
import { NavLink } from "react-router-dom";

const layout = () => (
    <header>
        <nav>
            <NavLink to='/home' exact> Home </NavLink>
            <NavLink to='/users'> Users </NavLink>
            <NavLink to='/logout'> Logout </NavLink>
        </nav>
    </header>
)

export default layout;
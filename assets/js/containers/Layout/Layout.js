import React from 'react';
import { Link } from "react-router-dom";

const layout = (props) => (
    <>
    <header>
        <nav>
            <Link to='/home' > Home </Link>
            <Link to='/users'> Users </Link>
            <Link to='/logout'> Logout </Link>
        </nav>
    </header>
    <main>
        {props.children}
    </main>
    </>
)

export default layout;
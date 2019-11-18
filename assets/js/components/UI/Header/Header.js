import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import Menu from '../Menu/Menu';

const header = (props) => (
        <div className="container-fluid box-shadow" >
            <div className="row">
                <div className="col-12 navheight">
                    <div className="fixed-top">
                        <nav className="navbar bg-dark px-2 m-0 navheight">
                            <div className="w-100">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="h1 textLightGrey headerText" style={{marginLeft:'2rem'}}>
                                            NFQ parking
                                        </span>
                                    </div>
                                    <div className="align-self-center d-flex">
                                        <div className="d-none d-md-block align-self-center">
                                            <i className="textLightGrey h4 align-middle m-0">
                                                {`${props.userName} ${props.userLastname}`}
                                            </i>
                                        </div>
                                        <div>
                                            <Link to='/logout' style={{color:"#f8f3f0"}}>
                                                <i className="icono-power textLightGrey mx-4"> 
                                                </i>
                                            </Link>
                                            
                                        </div>
                                        <div onClick={props.openMenu}>
                                            <i
                                                className="icono-hamburger h3 text-white d-md-none"
                                            > </i>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidenav p-0 m-0 bg_lightGrey h1" id="mySidenav" >
                                    <div className="container-fluid w-100 p-0 p-2">
                                        <div className="d-flex justify-content-between">
                                            <div className="align-self-center">
                                                <p className="m-0 pl-0 h4 align-self-center">
                                                    <b>Menu</b>
                                                </p>
                                            </div>
                                            <div>
                                                <a
                                                    className="mb-0 h2"
                                                    onClick={props.closeMenu}>
                                                        ×
                                                </a>
                                            </div>
                                        </div>

                                        <div className="text-left mt-4">
                                            <b>{`${props.userName} ${props.userLastname}`}</b>
                                        </div>
                                    </div>
                                    <Menu onclick={props.closeMenu}/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
)

const mapStateToProps = state => {
    return {
        userName: state.user.name,
        userLastname: state.user.lastname
    }
}

export default connect(mapStateToProps)(header);
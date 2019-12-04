import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import Menu from '../Menu/mobileMenu';
import {getHomeData} from "../../../store/thunk/reservations";
import {openMobileMenu, closeMobileMenu} from "../../../store/actions/main";


const header = (props) => (
        <div className="container-fluid shadow" >
            <div className="row">
                <div className="col-12 navheight">
                    <div className="fixed-top">
                        <nav className="navbar bg-dark px-2 m-0 navheight">
                            <div className="w-100">
                                <div className="d-flex justify-content-between">
                                    <div>

                                        <span className="textLightGrey headerText" style={{marginLeft:'2rem'}}>
                                            <i className="mr-4 fas fa-car headerText" style={{color: "orange"}}> </i>
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
                                                <i className="fas fa-sign-out-alt h3 textLightGrey mx-4">
                                                </i>
                                            </Link>

                                        </div>
                                        <div onClick={props.openMobileMenu} style={{ cursor: "pointer" }}>
                                            <i
                                                className="fa fa-bars h3 text-white d-md-none mr-2"
                                            > </i>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidenav p-0 m-0 bg-light h1 text-nowrap" style={props.mobileMenu ? {width: "100%"} : {width: "0%"}} >
                                    <Menu />
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
);

const mapStateToProps = state => {
    return {
        userName: state.user.name,
        userLastname: state.user.lastname,
        mobileMenu: state.mobileMenu
    }
};

const mapDispatchToProps= dispatch => ({
    openMobileMenu: () => dispatch(openMobileMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(header);
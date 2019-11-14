import React from 'react';
import {Link} from "react-router-dom";


import Background from '../../components/UI/Background/Background';

const meniu =
    <div className="hide-text">
        <hr class="m-0"/>
        <div className="m-0 p-2 text-left h6">
            <a className=" text-dark" href="#services">My Profile</a>
        </div>
        <hr class="m-0"/>
        <div className="m-0 p-2 text-left h6">
            <a className=" text-dark" href="#contact">Reserve</a>
        </div>
        <hr class="m-0"/>
        <div className="m-0 p-2 text-left h6">
            <a className="text-dark" href="#contact">Watch Users</a>
        </div>
        <hr class="m-0"/>
    </div>;

const openMeniu = () => {
    document.getElementById("mySidenav").style.width = "100%";
};

const closeMeniu = () => {
    document.getElementById("mySidenav").style.width = "0%";
};

const layout = (props) => (
    <>
        <Background/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 navheight">
                    <div className="fixed-top">
                        <nav className="navbar navbar-dark bg-dark px-2 m-0 navheight">
                            <div className="w-100">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <a className="h1 textLightGrey"
                                        >NFQ parking</a
                                        >
                                    </div>
                                    <div className="align-self-center d-flex">
                                        <div className="d-none d-md-block align-self-center">
                                            <i className="textLightGrey h4 align-middle m-0">Jonas Jonaitis</i>
                                        </div>
                                        <div>
                                            <i
                                                className="icono-power textLightGrey mx-4"
                                            > </i>
                                        </div>
                                        <div onClick={openMeniu}>
                                            <i
                                                className="icono-hamburger h3 text-white d-md-none"
                                            > </i>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidenav p-0 m-0 bg_lightGrey" id="mySidenav">
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
                                                    onClick={closeMeniu}
                                                >×</a
                                                >
                                            </div>
                                        </div>

                                        <div className="text-left mt-4">
                                            <b>Jonas Jonaitis</b>
                                        </div>
                                    </div>
                                    {meniu}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid mainheight">
            <div className="row h-100">
                <div className="bg_lightGrey d-none d-md-block col-0 col-md-4 col-lg-3 p-0 ">

                    <div className="d-none d-md-block col-0 col-md-4 col-lg-3 position-fixed p-0 mt-2">
                        <div className="py-2">
                            <p className=" m-0 h3">
                                <b>Menu</b>
                            </p>
                        </div>
                        {meniu}
                    </div>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                    <div className="container-fluid">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </>
)

export default layout;
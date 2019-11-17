import React from 'react';
import {Link} from "react-router-dom";


import Background from '../../components/UI/Background/Background';
import Header from '../../components/UI/Header/Header';
import Menu from '../../components/UI/Menu/Menu';


const openMenu = () => {
    document.getElementById("mySidenav").style.width = "100%";
};

const closeMenu = () => {
    document.getElementById("mySidenav").style.width = "0%";
};

const layout = (props) => (
    <>
        <Background/>
        <Header
            openMenu={props.openMenu}
            closeMenu={props.closeMenu}/>

        <div className="container-fluid mainheight">
            <div className="row h-100">
                <div className="d-none bg_lightGrey d-md-block col-0 col-md-4 col-lg-3 p-0 " style={{boxShadow: '5px 10px 10px 0px grey'}}>

                    <div className="d-none d-md-block col-0 col-md-4 col-lg-3 position-fixed p-0 mt-2">
                        <div className="py-2">
                            <p className=" m-0 h3">
                                <b>Menu</b>
                            </p>
                        </div>
                        <Menu/>
                    </div>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                    <div className="container-fluid h-100">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </>
)

export default layout;
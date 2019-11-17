import React, { Component } from 'react';
import {Link} from "react-router-dom";


import Background from '../../components/UI/Background/Background';
import Header from '../../components/UI/Header/Header';
import Nav from '../../components/UI/Nav/Nav';

class Layout extends Component {

    openMenuHandler () {
        document.getElementById("mySidenav").style.width = "100%";
    }

    closeManuHandler () {
        document.getElementById("mySidenav").style.width = "0%";
    }
    // in this case it is working, but usualy we are not using ids in react. Like React.fowardRef and then use ref instead
    render (){
        return(
            <>
                <Background/>
                <Header
                    openMenu={this.openMenuHandler}
                    closeMenu={this.closeMenuHandler}/>
        
                <div className="container-fluid mainheight">
                    <div className="row h-100">
                        <Nav/>
                        <div className="col-12 col-md-8 col-lg-9">
                            <div className="container-fluid h-100">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Layout;
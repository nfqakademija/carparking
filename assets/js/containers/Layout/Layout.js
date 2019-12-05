import React, { Component } from 'react';

import Background from '../../components/UI/Background/Background';
import Header from '../../components/UI/Header/Header';
<<<<<<< HEAD
import Nav from '../../components/UI/Nav/Nav';
import PopUp from '../../components/UI/PopUp/PopUp';
=======
import Menu from '../../components/UI/Menu/webMenu';
>>>>>>> 61e3bebc804cd01846c78080a48fe0fcbe40bda2

class Layout extends Component {

    render (){
        return(
            <>
                <Background/>
                <Header
                    openMenu={this.openMenuHandler}
                    closeMenu={this.closeMenuHandler}/>
        
                <div className="container-fluid mainheight">
                    <div className="row h-100">
                        <Menu />
                        <div className="col-12 col-md-8 col-lg-9 h-100">
                            {/* <PopUp/> */}
                            <div className="h-100">    
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
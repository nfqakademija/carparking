import React, { Component } from 'react';

import Background from '../../components/UI/Background/Background';
import Header from '../../components/UI/Header/Header';
import Menu from '../../components/UI/Menu/webMenu';

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
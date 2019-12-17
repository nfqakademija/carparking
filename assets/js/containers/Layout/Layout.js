import React, { Component } from 'react';
import { connect } from "react-redux";

import { popupOpened } from '../../store/thunk/popup';

import BackgroundHome from '../../components/UI/Background/BackgroundHome/BackgroundHome';
import Header from '../../components/UI/Header/Header';
import Menu from '../../components/UI/Menu/webMenu';
import Modal from "../../components/UI/Modal/Modal";


class Layout extends Component {

    render (){
        return(
            <>
                <BackgroundHome/>
                <Header
                    openMenu={this.openMenuHandler}
                    closeMenu={this.closeMenuHandler}/>

                <Modal />

                <div className="container-fluid mainheight">
                    <div className="row h-100">
                        <Menu user={this.props.user} popupOpened={this.props.popup.show  ?this.props.onPopupOpened :false}/>
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

const mapStateToProps = state => {
    return {
        popup: state.reservation.popup
    }
}

const mapDispatchToProps= dispatch => ({
    onPopupOpened: () => dispatch(popupOpened())
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

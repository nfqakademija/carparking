import React, { Component } from 'react';
import { connect } from "react-redux";

import { getUsersData, popupAcceptClicked } from '../../store/thunk/reservations';
import { getCoordinates, popupOpened } from '../../store/thunk/popup';
import { buttonClicked, popupCancel, getNotifications } from '../../store/actions/index';

import UsersTable from '../../components/UsersTable/UsersTable';
import PopUp from '../../components/UI/PopUp/PopUp';
import Button from '../../components/UI/Button/Button';

import './Notifications.scss';
class Notifications extends Component {

    constructor(props){
        super(props);
        this.userTableRef = React.createRef();
    }

    componentDidMount() {
        this.props.onGetUsersData()
    }

    render (){
        
        return (
            <>
                <div style={{display:"flex", flexDirection:'column',  height:'100%', overflow:'scroll'}}>
                    {this.props.loading || this.props.usersList.length === 0
                        ? 'loading ...'
                        : <div className='Notifications_container'>
                            <div className='Notifications_table shadow'>
                                <div className='Notifications_header bg-dark text-white rounded-top'>
                                    <div >Notifications</div>
                                </div>
                                <div className='Notifications_body'>
                                    <div className='Notifications_notificationContainer' >
                                            <div style={{margin:'auto',marginLeft:'2em'}}>
                                                <div style={{fontWeight:'900'}}>VARDENIS PAVARDENIS</div>
                                                <div>Asks for spot on <strong>2019-12-20</strong></div>
                                            </div>
                                            <div style={{display:'flex',marginRight:'2em'}}>
                                                <Button classname="Button_success" text='Accept' buttonStyle={{ marginRight:'0.5em'}} onclick={this.props.popupAccept}></Button>
                                                <Button classname="Button_danger" text='Cancel' buttonStyle={{ marginRight:'0.5em'}} onclick={this.props.popupCancel}></Button>
                                            </div>   
                                    </div>
                                </div>
                                <div className='Notifications_body'>
                                    <div className='Notifications_notificationContainer' style={{borderColor:'#95D195'}}>
                                            <div style={{margin:'auto',marginLeft:'2em'}}>
                                                <div style={{fontWeight:'900'}}>VARDENIS PAVARDENIS</div>
                                                <div>Asks for spot on <strong>2019-12-20</strong></div>
                                            </div>
                                            <div style={{display:'flex',marginRight:'2em'}}>
                                                <Button classname="Button_danger" text='Cancel' buttonStyle={{ marginRight:'0.5em'}} onclick={this.props.popupCancel}></Button>
                                            </div>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    } 
                </div>  
            </>
        )
    }  
}

const mapStateToProps = state => {
    return {
        usersList: state.users,
        loading: state.loading.loadingUsers,
        reservationStatus: state.weekStatus,
        mainUser: state.user,
        popup: state.popup,
        user: state.user,
        popupShake: state.popupShake,
        popupShow: state.popup.show,
        notificationPopupShow: state.notificationPopup.show
    }
}


const mapDispatchToProps= dispatch => ({
    onGetUsersData: () => dispatch(getUsersData()),
    onButtonClick: (date, buttonType, ref, switchUser) => {dispatch(getCoordinates(ref ,ref)),dispatch(buttonClicked(date, buttonType, switchUser))},
    onPopupAccept: (date, actionType) => dispatch(popupAcceptClicked(date, actionType)),
    onPopupCancel: () => dispatch(popupCancel()),
    onPopupOpened: () => dispatch(popupOpened()),
    onGetNotifications: () => dispatch(getNotifications())
})


export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
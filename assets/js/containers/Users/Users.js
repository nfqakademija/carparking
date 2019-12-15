import React, { Component } from 'react';
import { connect } from "react-redux";

import { getUsersData, popupAcceptClicked } from '../../store/thunk/reservations';
import { getCoordinates, popupOpened } from '../../store/thunk/popup';
import { buttonClicked, popupCancel } from '../../store/actions/index';

import UsersTable from '../../components/UsersTable/UsersTable';
import PopUp from '../../components/UI/PopUp/PopUp';

import '../../../css/containers/Users/Users.scss';
class Users extends Component {

    constructor(props){
        super(props);
        this.userTableRef = React.createRef();
    }

    componentDidMount() {
        this.props.onGetUsersData()
    }

    popupHandler (popup) {
        return <PopUp 
                    left={popup.left} 
                    width={popup.width} 
                    translate={popup.show} 
                    type={popup} 
                    popupCancel={this.props.onPopupCancel} 
                    popupAccept={()=>this.props.onPopupAccept(popup.date, 'neutral')}
                    loading={popup.loading}
                    uniqueStyle={popup.style}
                    successTimer={this.props.onSuccessTimer}
                    user={popup.switchUser}
                    isUser={true}
                    shake={this.props.popupShake}
                />
    }

    userListContainerStyleHandler () {
        return {transform: !this.props.popup.show ?'translateY(0)': 'translateY(200px)'}
    }

    render (){
        
        return (
            <>
                <div style={{display:"flex", flexDirection:'column',  height:'100%', overflow:'scroll'}}>
                    {this.popupHandler(this.props.popup)}
                    {this.props.loading || this.props.usersList.length === 0
                        ? 'loading ...'
                        : <div className='Users_usersTableContainer' style={this.userListContainerStyleHandler()}>
                            <UsersTable 
                                ref={this.userTableRef}
                                usersList={this.props.usersList}
                                reservationStatus={this.props.reservationStatus}
                                mainUser={this.props.mainUser}
                                onclick={(dayObj, switchUser) => this.props.onButtonClick(dayObj.date, 'neutral', this.userTableRef, switchUser)}
                                popupShake={this.props.popupShow || this.props.notificationPopupShow ?this.props.onPopupOpened :false}/>
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
    onPopupOpened: () => dispatch(popupOpened())
})


export default connect(mapStateToProps,mapDispatchToProps)(Users);
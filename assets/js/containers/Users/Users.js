import React, { Component } from 'react';
import { connect } from "react-redux";

import { popupAcceptClicked } from '../../store/thunk/reservations';
import { fetchUsersData } from '../../store/thunk/usersList';
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
        // this.props.onFetchUsersData()
    }

    popupHandler (popup) {
        return <PopUp 
                    left={popup.left} 
                    width={popup.width} 
                    translate={popup.show} 
                    type={popup} 
                    popupCancel={this.props.onPopupCancel} 
                    popupAccept={()=>this.props.onPopupAccept(popup.date, 'neutral', popup.switchUser)}
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
                    {console.log(!this.props.loadingSingleUser && !this.props.loading)}
                    {!this.props.loadingUsersList && !this.props.loadingSingleUser
                        ? <div className='Users_usersTableContainer' style={this.userListContainerStyleHandler()}>
                            <UsersTable 
                                ref={this.userTableRef}
                                usersList={this.props.usersList}
                                reservationStatus={this.props.reservationStatus || []}
                                mainUser={this.props.mainUser}
                                onclick={(dayObj, switchUser) => this.props.onButtonClick(dayObj.date, 'neutral', this.userTableRef, switchUser)}
                                popupShake={this.props.popupShow || this.props.notificationPopupShow ?this.props.onPopupOpened :false}/>
                         </div>
                        : console.log('loading ...')
                    } 
                </div>  
            </>
        )
    }  
}

const mapStateToProps = state => {
    return {
        usersList: state.usersList.users,
        loadingUsersList: state.usersList.loading,
        loadingSingleUser: state.singleUser.loading,
        reservationStatus: state.reservation.weekStatus,
        mainUser: state.singleUser.user,
        popup: state.reservation.popup,
        user: state.singleUser.user,
        popupShake: state.reservation.popupShake,
        popupShow: state.reservation.popup.show
    }
}


const mapDispatchToProps= dispatch => ({
    onFetchUsersData: () => dispatch(fetchUsersData()),
    onButtonClick: (date, buttonType, ref, switchUser) => {dispatch(getCoordinates(ref ,ref)),dispatch(buttonClicked(date, buttonType, switchUser))},
    onPopupAccept: (date, actionType, switchUser) => dispatch(popupAcceptClicked(date, actionType, switchUser)),
    onPopupCancel: () => dispatch(popupCancel()),
    onPopupOpened: () => dispatch(popupOpened())
})


export default connect(mapStateToProps,mapDispatchToProps)(Users);
import React, { Component } from 'react';

import axios from 'axios';

import { connect } from "react-redux";

import { getHomeData, popupAcceptClicked, successTimer, buttonClickedMid, notificationPopupAccept, getSingleUser} from '../../store/thunk/reservations';
import { getCoordinates, popupOpened } from '../../store/thunk/popup';
import { popupCancel, setNotification, notificationPopupCancel } from '../../store/actions/index';

import Reservation from '../../components/Reservation/Reservation';
import PopUp from '../../components/UI/PopUp/PopUp';
import NotificationsPopUp from '../../components/UI/PopUp/NotificationPopUp/NotificationPopUp';

import '../../../css/containers/Home/Home.scss';

class Home extends Component {
    constructor(props){
        super(props);
        this.reservationRefFirst = React.createRef();
        this.reservationRefLast = React.createRef();  
    }

    componentDidMount(){
        this.props.onGetHomeData();
        // if (this.props.user.notifications[1]) {
        //     setTimeout(
        //         () => {this.props.onGetCoordinates(this.reservationRefFirst, this.reservationRefLast); this.props.onSetNotification()}, 1000
        //     )
        // }
        
        // axios.get('/api/make-reservation').then(res => console.log(res))
        // axios.post('/api/useraway',this.data).then(res => console.log(res)).catch(err => console.log(err))
        //axios.get(`/api/reservations`).then(res => console.log(res))
        axios.get(`/api/users`).then(res => console.log(res))
        // axios.get(`/api/single-user/21`).then(res => console.log(res))
        
    }

    buttonClickHandler(date, buttonType, first, last) {
        this.props.onButtonClick(date, buttonType, first, last)
    }

    getReservationByDateHandler(date) {
        return this.props.user.reservations.find(reservation => {
            if(this.props.user.role === 'user'){
                return new Date(reservation.date).getDate() === new Date(date).getDate()
            } else {
                return new Date(reservation.reservationDate.date).getDate() === new Date(date).getDate()
            }
        })
    }

    reservationButtonHandler(date) {
        const reservation = this.getReservationByDateHandler(date)
        if(reservation) {
            if(this.props.user.role === 'user') {
                return ({ // user have reservation case
                    buttonClass: 'danger',
                    buttonText: 'cancel'
                    })
            } else {
                if(reservation.parkSpace){
                    return ({ // guest have reservation case
                        buttonClass: 'danger',
                        buttonText: 'cancel'
                        })
                } else {
                    return ({ // guest have not approved reservation
                        buttonClass: 'neutral',
                        buttonText: 'ask'
                        })
                }
            }
        } else {
            return ({ // dont have reservation case (any user)
                buttonClass: 'success',
                buttonText: 'reserve'
                })
        }
    }

    parkingSpotHandler (date) {
        const reservation = this.getReservationByDateHandler(date)
        return  reservation 
                ? reservation.parkSpace 
                    ? reservation.parkSpace.number
                    : reservation.userSpot 
                : null
    }

    graphHandler(day) {
        const lotSize = day.usedSpots + day.availableSpots
        if (day.usedSpots === 0){
            return ( {
                isVisible:{visibility:'hidden'},
                status: '0%'
                } )
        } else if (day.availableSpots <= 0) {
            return ({
                status: '110%',
                fill: "#F1B55C"
                })
        } else {
            return ({
                status:`${((day.usedSpots/lotSize)*110)}%`
                })
        } 
    }

    popupHandler (popup) {
            return <PopUp 
                        left={popup.left} 
                        width={popup.width} 
                        translate={popup.show} 
                        type={popup} 
                        popupCancel={this.props.onPopupCancel} 
                        popupAccept={()=>this.props.onPopupAccept(popup.date, popup.type)}
                        loading={popup.loading}
                        uniqueStyle={popup.style}
                        successTimer={this.props.onSuccessTimer}
                        shake={this.props.popupShake}
                    />
        
    }

    notificationPopupChainHandler () {
        setTimeout(
            () =>   {this.props.user.notifications[0] 
                        ? this.props.onSetNotification()
                        : null
                    }
        ,1000)
    }

    notificationPopupHandler (popup) {
            return <NotificationsPopUp
                        translate={popup.show}
                        popup={popup}
                        shake={this.props.popupShake}
                        popupCancel={() => {this.props.onNotificationPopupCancel(); this.notificationPopupChainHandler()}}
                        popupAccept={() => this.props.onNotificationPopupAccept(popup.date)}
                        successTimer={this.props.onSuccessTimer}/> 
    }

    reservationContainerStyleHandler () {
        return {transform: this.props.popup.show || this.props.notificationPopup.show ?'translateY(200px)': 'translateY(0)'}
    }
    
    render (){
        return (
        <>
            {this.props.loading.loadingSingleUser || this.props.loading.loadingReservations
            ? null
            : <div style={{display:"flex", flexDirection:'column',  height:'100%', overflow:'scroll'}}>
                {this.notificationPopupHandler(this.props.notificationPopup)}
                {this.popupHandler(this.props.popup)}
                <div className='Home_reservationContainer' style={this.reservationContainerStyleHandler()} >
                    {this.props.weekStatus.map( (day,index) => ( 
                        new Date(day.date).getDay() // skip sunday
                            ? <Reservation 
                                key={day.date}
                                ref={!index && !new Date(day.date).getDay() || index === 1 && new Date(day.date).getDay() // give index to first elenemt, but also checks if first element sunday or not.
                                        ? this.reservationRefFirst
                                        : index === 6
                                            ? this.reservationRefLast
                                            : null} // need fn for this
                                date={day.date}
                                lotSize={day.usedSpots+day.availableSpots} // *
                                usedSpots={day.usedSpots >20 ?20 :day.usedSpots} // used spots could be bigger than lot size
                                availableSpots={day.availableSpots > 0 ?day.availableSpots :0} // available spots could be negative
                                buttonOptions={this.reservationButtonHandler(day.date)}
                                graphStatus={this.graphHandler(day)}
                                onButtonClick={()=>this.buttonClickHandler(day.date, this.reservationButtonHandler(day.date).buttonClass, this.reservationRefFirst, this.reservationRefLast)}
                                userParkingSpot={this.parkingSpotHandler(day.date)}
                                history={this.props.history}
                                loading={this.props.loadingOneDay}
                                popupShake={this.props.popup.show || this.props.notificationPopup.show ?this.props.onPopupOpened :false}/>
                            : null))}
                </div>
             </div>
        }
        </>     
        )
    }
}

const mapStateToProps = state => {
    return {
        weekStatus: state.weekStatus,
        loading: state.loading,
        popup: state.popup,
        user: state.user,
        loadingOneDay: state.loadingOneDay,
        notificationPopup: state.notificationPopup,
        popupShake: state.popupShake
    }
}

const mapDispatchToProps= dispatch => ({
    onGetHomeData: (first, last) => dispatch(getHomeData(first, last)),
    onButtonClick: (date, buttonType, first, last) => dispatch(buttonClickedMid(date, buttonType, first, last)),
    onPopupCancel: () => dispatch(popupCancel()),
    onPopupAccept: (date, actionType) => dispatch(popupAcceptClicked(date, actionType)),
    onSuccessTimer: () => dispatch(successTimer()),
    onSetNotification: () => dispatch(setNotification()),
    onNotificationPopupCancel: () => dispatch(notificationPopupCancel()),
    onNotificationPopupAccept: (date) => dispatch(notificationPopupAccept(date)),
    onGetCoordinates: (first, last) => dispatch(getCoordinates(first, last)),
    onPopupOpened: () => dispatch(popupOpened())
})

export default connect( mapStateToProps, mapDispatchToProps )(Home);
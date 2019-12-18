import React, { Component } from 'react';
import { connect } from "react-redux";

import { popupAcceptClicked, successTimer, buttonClickedMid, fetchReservations } from '../../store/thunk/reservations';
import { fetchUsersData } from '../../store/thunk/usersList';
import { onFetchNotifications } from '../../store/thunk/notifications';
import { getCoordinates, popupOpened } from '../../store/thunk/popup';
import { popupCancel } from '../../store/actions/index';

import Reservation from '../../components/Reservation/Reservation';
import PopUp from '../../components/UI/PopUp/PopUp';

import '../../../css/containers/Home/Home.scss';

class Home extends Component {
    constructor(props){
        super(props);
        this.reservationRefFirst = React.createRef();
        this.reservationRefLast = React.createRef();  
    }

    componentDidMount() {
        this.props.onFetchNotifications()
        this.props.onFetchUsersData()
        this.props.onFetchReservations()
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
        if(reservation) {
            if (reservation.parkSpace) {
                return reservation.parkSpace.number
            } else {
                return reservation.userSpot 
            }
        }
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
            return <PopUp // all options passed here, no state dispatches or methods in this component
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

    reservationContainerStyleHandler () {
        return { transform: this.props.popup.show 
                                ?'translateY(200px)'
                                :'translateY(0)' }
    }

    buttonClickHandler(date, buttonType, first, last) {
        this.props.onButtonClick(date, buttonType, first, last)
    }

    refIndexHandler(index, day) {
        if(!index && new Date(day.date).getDay() || index === 1 && !new Date(day.date).getDay()){ // if not sunday and first element or if sunday and second element
            return this.reservationRefFirst
        } else if (index === 6 && new Date(day.date).getDay() || index === 5 && new Date(day.date).getDay() === 6) { // if last but not sunday or one before last if last is sunday
            return this.reservationRefLast
        }
    }
    
    render (){
        return (
        <>
            {this.props.loadingSingleUser || this.props.loading
            ? null
            : <div style={{display:"flex", flexDirection:'column',  height:'100%', overflow:'hidden'}}>
                {this.popupHandler(this.props.popup)}
                <div className='Home_reservationContainer' style={this.reservationContainerStyleHandler()} >
                    {this.props.weekStatus.map( (day,index) => ( 
                        new Date(day.date).getDay() // skip sunday
                            ? <Reservation //pass everything here. There is no methods or dispatches in component.
                                key={day.date}
                                ref={this.refIndexHandler(index, day)} //coordinates
                                date={day.date}
                                lotSize={day.usedSpots+day.availableSpots}
                                usedSpots={day.usedSpots > 20 ?20 :day.usedSpots} // used spots could be bigger than lot size
                                availableSpots={day.availableSpots > 0 ?day.availableSpots :0} // available spots could be negative
                                buttonOptions={this.reservationButtonHandler(day.date)}
                                graphStatus={this.graphHandler(day)}
                                onButtonClick={()=>this.buttonClickHandler(day.date, this.reservationButtonHandler(day.date).buttonClass, this.reservationRefFirst, this.reservationRefLast)}
                                userParkingSpot={this.parkingSpotHandler(day.date)}
                                history={this.props.history}
                                loading={this.props.loadingOneDay}
                                popupShake={this.props.popup.show ?this.props.onPopupOpened :null}/>
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
        weekStatus: state.reservation.weekStatus,
        loading: state.reservation.loading,
        loadingSingleUser: state.singleUser.loading,
        popup: state.reservation.popup,
        user: state.singleUser.user,
        loadingOneDay: state.reservation.loadingOneDay,
        popupShake: state.reservation.popupShake
    }
}

const mapDispatchToProps= dispatch => ({
    onButtonClick: (date, buttonType, first, last) => dispatch(buttonClickedMid(date, buttonType, first, last)),
    onPopupCancel: () => dispatch(popupCancel()),
    onPopupAccept: (date, actionType) => dispatch(popupAcceptClicked(date, actionType)),
    onSuccessTimer: () => dispatch(successTimer()),
    onGetCoordinates: (first, last) => dispatch(getCoordinates(first, last)),
    onPopupOpened: () => dispatch(popupOpened()),
    onSetDefaultHeader: () => dispatch(setDefaultHeader()),
    onFetchUsersData: () => dispatch(fetchUsersData()),
    onFetchReservations: () => dispatch(fetchReservations()),
    onFetchNotifications: () => dispatch(fetchSignleUserAndNotifications())
})

export default connect( mapStateToProps, mapDispatchToProps )(Home);
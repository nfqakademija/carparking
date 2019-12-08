import React, { Component } from 'react';

import axios from 'axios';

import { connect } from "react-redux";

import { getHomeData, popupAcceptClicked, successTimer, buttonClickedMid } from '../../store/thunk/reservations';

import { popupCancel } from '../../store/actions/index';

import Reservation from '../../components/Reservation/Reservation';
import PopUp from '../../components/UI/PopUp/PopUp';

import '../../../css/containers/Home/Home.scss';

class Home extends Component {
    constructor(props){
        super(props);
        this.reservationRefFirst = React.createRef();
        this.reservationRefLast = React.createRef();
        // this.data = {
        //     "id": 1,
        //     "away_date": [
        //         {"away_start_date" :"2019-12-01","away_end_date":"2019-12-01"},
        //         {"away_start_date" :"2019-12-02","away_end_date":"2019-12-05"}
        //     ]
        // }
        this.width = window.innerWidth
        
    }

    componentDidMount(){
        this.props.onGetHomeData();
        // axios.get('/api/make-reservation').then(res => console.log(res))
        // axios.post('/api/useraway',this.data).then(res => console.log(res)).catch(err => console.log(err))
        // axios.get(`/api/reservations`).then(res => console.log(res))
        axios.get(`/api/users`).then(res => console.log(res))
    }

    buttonClickHandler(date, buttonType, first, last) {
        this.props.onButtonClick(date, buttonType, first, last)
    }

    reservationButtonHandler(day) {
        if(!day.userReservation) {
            if(day.parkingSpaces > day.usedSpaces){
                return ({ 
                    buttonClass: 'success',
                    buttonText: 'reserve'
                    })
            } else {
                return ({
                    buttonClass: 'neutral',
                    buttonText: 'ask'
                    })
            }
        } else {
            return ({
                buttonClass: 'danger',
                buttonText: 'cancel'
                })
        }
    };

    graphHandler(day) {
        if (day.usedSpaces === 0){
            return ( {
                isVisible:{visibility:'hidden'},
                status: '0%'
                } )
        } else if (day.usedSpaces === day.parkingSpaces) {
            return ({
                status: '110%',
                fill: "#F1B55C"
                })
        } else {
            return ({
                status:`${((day.usedSpaces/day.parkingSpaces)*110)}%`
                })
        } 
    }

    popupHandler (popup) {
            return <PopUp 
                        left={popup.left} 
                        width={popup.width} 
                        translate={this.props.popup.show} 
                        type={this.props.popup} 
                        popupCancel={this.props.onPopupCancel} 
                        popupAccept={()=>this.props.onPopupAccept(this.props.popup.date, this.props.user, this.props.popup.type)}
                        loading={popup.loading}
                        uniqueStyle={popup.style}
                        successTimer={this.props.onSuccessTimer}
                    />
        
    }

    reservationContainerStyleHandler () {
        return {transform: !this.props.popup.show ?'translateY(0)': 'translateY(200px)'}
    }
    
    render (){
        
        return (
        <>
            {this.props.loading
            ? 'loading...'
            : <div style={{display:"flex", flexDirection:'column',  height:'100%', overflow:'scroll'}}>
                {this.popupHandler(this.props.popup)}
                <div className='Home_reservationContainer' style={this.reservationContainerStyleHandler()} >
                    {this.props.registrationData.map( (day,index) => {
                        return (
                        <Reservation
                            ref={!index 
                                    ? this.reservationRefFirst
                                    : index === 5 
                                        ? this.reservationRefLast
                                        : null}
                            index={index}
                            key={day.date}
                            date={day.date}
                            buttonOptions={this.reservationButtonHandler(day)}
                            parkingSpaces={day.parkingSpaces}
                            usedSpaces={day.usedSpaces}
                            userParkingSpot={day.userParkingSpot}
                            graphStatus={this.graphHandler(day)}
                            onButtonClick={()=>this.buttonClickHandler(day.date, this.reservationButtonHandler(day).buttonClass, this.reservationRefFirst, this.reservationRefLast)}
                            history={this.props.history}
                            loading={this.props.loadingOneDay}/>
                    )})}
                </div>
             </div>
        }
        </>     
        )
    }
}

const mapStateToProps = state => {
    return {
        registrationData: state.reservationStatus,
        loading: state.loading,
        popup: state.popup,
        user: state.user,
        loadingOneDay: state.loadingOneDay
    }
}

const mapDispatchToProps= dispatch => ({
    onGetHomeData: (first, last) => dispatch(getHomeData(first, last)),
    onButtonClick: (date, buttonType, first, last) => dispatch(buttonClickedMid(date, buttonType, first, last)),
    onPopupCancel: () => dispatch(popupCancel()),
    onPopupAccept: (date, user, actionType) => dispatch(popupAcceptClicked(date, user, actionType)),
    onSuccessTimer: () => dispatch(successTimer())
})

export default connect( mapStateToProps, mapDispatchToProps )(Home);
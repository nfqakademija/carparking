import React, { Component } from 'react';

import { connect } from "react-redux";

import { getHomeData } from '../../store/thunk/reservations';
import { getCoordinates } from '../../store/thunk/popup';

import { saveCoordinates } from '../../store/actions/index';

import Reservation from '../../components/Reservation/Reservation';
import PopUp from '../../components/UI/PopUp/PopUp';

class Home extends Component {
    constructor(props){
        super(props);
        this.reservationRefFirst = React.createRef();
        this.reservationRefLast = React.createRef();
    }

    componentDidMount(){
        this.props.onGetHomeData();
        this.props.onSaveCoordinates(this.reservationRefFirst, this.reservationRefLast)
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
                status: 0
                } )
        } else if (day.usedSpaces === day.parkingSpaces) {
            return ({
                status: '188.4%',
                fill: "#F1B55C"
                })
        } else if (day.usedSpaces === 1){
            return ({
                status: 0
                })
        } else {
            return ({
                status:`${((day.usedSpaces/day.parkingSpaces)*188.4)-4.4}%`
                })
        } 
    }

    popupHandler (popup) {
        if (!popup.loading) {
            return <PopUp left={popup.left} width={popup.width} translate={true}/>
        } else {
            return <PopUp left={popup.left}/>
        }
    }
    
    render (){
        
        return (
        <>
            {this.props.loading
            ? 'loading...'
            : <div style={{display:"flex", flexDirection:'column',  height:'100%'}}>
            {this.popupHandler(this.props.popup)}
            <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', alignContent:'flex-start', overflow:'scroll', scrollbarWidth: 'none', flexGrow: "1"}}>
                {this.props.registrationData.map( (day,index) => {
                    return (
                    <Reservation
                        ref={!index 
                                ? this.reservationRefFirst
                                : index === 5 
                                    ? this.reservationRefLast
                                    : null
                            }
                        index={index}
                        key={day.date}
                        date={day.date}
                        buttonOptions={this.reservationButtonHandler(day)}
                        parkingSpaces={day.parkingSpaces}
                        usedSpaces={day.usedSpaces}
                        userParkingSpot={day.userParkingSpot}
                        graphStatus={this.graphHandler(day)}/>
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
        popup: state.popup
    }
}

const mapDispatchToProps= dispatch => ({
    onGetHomeData: () => dispatch(getHomeData()),
    onSaveCoordinates: (first, last) => dispatch(getCoordinates(first, last))
})

export default connect( mapStateToProps, mapDispatchToProps )(Home);
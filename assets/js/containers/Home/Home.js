import React, { Component } from 'react';
import { connect } from "react-redux";

import Reservation from '../../components/Reservation/Reservation';

class Home extends Component {

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


    render (){

        return (
            <div style={{marginLeft:'14em', display:'flex', justifyContent:'space-around', flexWrap:'wrap', height:'100%', alignContent:'flex-start'}}>
                {this.props.registrationData.reservationStatus.map( day => (
                    <Reservation
                        key={day.date}
                        date={day.date}
                        buttonOptions={this.reservationButtonHandler(day)}
                        parkingSpaces={day.parkingSpaces}
                        usedSpaces={day.usedSpaces}
                        userParkingSpot={day.userParkingSpot}
                        graphStatus={this.graphHandler(day)}/>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        registrationData: state.registrationData
    }
}

export default connect( mapStateToProps )(Home);
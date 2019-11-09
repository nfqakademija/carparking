import React, { Component } from 'react';

import Reservation from '../../components/Reservation/Reservation';

class Home extends Component {
    render (){
        return (
            <div style={{marginLeft:'14em', display:'flex', justifyContent:'space-around', flexWrap:'wrap', height:'100%', alignContent:'flex-start'}}>
                <Reservation/>
                <Reservation/>
                <Reservation/>
                <Reservation/>
                <Reservation/>
                <Reservation/>
            </div>
        )
    }
}

export default Home;
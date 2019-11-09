import React from 'react';
import { Link } from "react-router-dom";

import Background from '../../components/UI/Background/Background';

const layout = (props) => (
    <>
        <Background/>
        <header>
            {/* there should be header (in our case without any links) */}
            <div style={{backgroundColor:'#f1a177', height:'4em', color:'white', fontWeight:'900', fontSize:'1.5em', boxShadow:' 0px 0px 10px 0px grey'}}>
                
                    <span style={{float:'left', marginLeft: '3em', marginTop:'1em'}}>NFQ parking</span>
                    <span style={{float:'right', marginRight: '3em', marginTop:'1em'}}>Vardenis Pavardenis</span>
            </div>
        </header>
        <main style={{height:'100%'}}>
            {/* this should be main part with navbar and content (content part need props children inside!!) */}
            <nav style={{width:"14em", backgroundColor:"#fadfd1", height:"95vh", position:'absolute', zIndex:'2', boxShadow:' 0px 10px 10px 0px grey'}}>
                <p style={{marginTop:"0", paddingTop:"1em", textAlign:"center", fontSize:'1.3em', color:"#99A0A6"}}>MENU</p>
                <hr/>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Link to='/home' > Home </Link>
                    <Link to='/users'> Users </Link>
                    <Link to='/logout'> Logout </Link>
                </div>   
            </nav>
            {props.children}
        </main>
    </>
)

export default layout;
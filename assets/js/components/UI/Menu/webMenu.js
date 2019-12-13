import React from 'react';
import {NavLink} from "react-router-dom";
import {openModal} from "../../../store/actions/main";
import {connect} from "react-redux";


const webMeniu = (props) => (
    <div className="d-none bg-white d-md-block col-0 col-md-4 col-lg-3 p-0 shadow h-100">
        <div className="d-none d-md-block col-0 col-md-4 col-lg-3 position-fixed p-0 mt-2">
            <div className="text-left webMeniu">
                <div className="position-relative mt-1 py-2 linkParent">
                <span className="ml-4 position-absolute">
                    <i className="fa fa-check-square-o"></i></span>
                    <div style={{marginLeft: "5rem"}}>
                        {props.popupOpened
                                ?<a title='You must first accept or reject notification message' className="link" onClick={props.popupOpened}>Reserve</a>
                                :<NavLink to='/home' activeClassName='webMenu_activeClass' className="link" onClick={props.onclick}>Reserve</NavLink>}
                    </div>
                </div>
                <hr className="m-0" />
                <div className="position-relative py-2 linkParent">
                    <span className="ml-4 position-absolute"><i className="fa fa-users"> </i></span>
                    <div style={{marginLeft: "5rem"}}>
                        {props.popupOpened
                            ?<a title='You must first accept or reject notification message' className="link" onClick={props.popupOpened}>Watch Users</a>
                            :<NavLink to="/users" className="link" activeClassName='webMenu_activeClass' onClick={props.onclick}>Watch Users</NavLink>}
                    </div>
                </div>
                <hr className="m-0" />
                <div className="position-relative py-2 linkParent">
                    <span className="ml-4 position-absolute"><i className="fas fa-suitcase-rolling"> </i></span>
                    <div style={{marginLeft: "5rem"}}>
                        {props.popupOpened
                            ?<a title='You must first accept or reject notification message' className="link" onClick={props.popupOpened}>Set Away</a>
                            :<NavLink to="/away" className="link" activeClassName='webMenu_activeClass' onClick={props.onclick}>Set Away</NavLink>}
                    </div>
                </div>
                <hr className="m-0" />
                <div className="position-relative py-2 linkParent">
                    <span className="ml-4 position-absolute"><i className="fas fa-car-side"> </i></span>
                    <div style={{marginLeft: "5rem"}}>
                        <p onClick={ props.openModal } className="link" style={{cursor: "pointer"}}>Car Plate</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const mapDispatchToProps= dispatch => ({
    openModal: () => dispatch(openModal()),
});

export default connect(null, mapDispatchToProps)(webMeniu);


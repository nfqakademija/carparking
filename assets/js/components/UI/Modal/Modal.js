import React from 'react';
import PlateModal from "./PlateModal";
import {connect} from "react-redux";
import {closeModal, updatePlate} from "../../../store/actions/main";

const Modal = (props) => {
    return (
        <div className={props.opocity ? "modal-window fullOpicity" : "modal-window noneOpicity"}>
            <p className="modal-close" onClick={props.closeModal}>Close</p>
            {props.opocity ? <PlateModal/> : null}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        opocity: state.main.plateModal
    }
}

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
import React from 'react';
import {updatePlate} from "../../../store/actions/main";
import {connect} from "react-redux";

const checkNumber = (numbers) => {
    const gerNumbers = numbers;

    if(gerNumbers.length > 0 && gerNumbers.length < 7 && /^\w*(?=\w*\d)(?=\w*[A-Za-z])\w*$/.test(gerNumbers))
    {
        props.updatePlate(gerNumbers)
    }else {
        document.getElementById("info").innerHTML = "Negalimas numeris";
        document.getElementById("plate").style.borderColor = "red";
    }

}

const plateModal = (props) => (


    <div id="car-plate" className="modal-window">
        <a href="#" title="Close" className="modal-close p-4">Close</a>

        <div className="w-100">

            <div id="info" className=" mb-2 h4"></div>

            <input
                type="text"
                name="licenseplate"
                className="licenseplate modileWidth"
                maxLength="6"
                id="plate"
                placeholder={props.plate}
            />
            <br/>
            <button className="btn btn-warning btn-lg mt-3 shadow" href="#" onClick={() => checkNumber(document.getElementById("plate").value)}>
               <b className="text-white">Update</b>
            </button>
        </div>
    </div>
)

const mapStateToProps = state => {
    return {
        plate: state.plate
    }
}

const mapDispatchToProps = dispatch => ({
    updatePlate: (number) => dispatch(updatePlate(number))
});

export default connect(mapStateToProps, mapDispatchToProps)(plateModal);
import React from 'react';
import {updatePlate} from "../../store/actions/main";
import {connect} from "react-redux";


const plate = (props) => (
    <div className="container w-100 bg-light mt-2 rounded shadow p-0">
        <div className="bg-dark py-2 rounded-top">
            <p className="text-light h4 m-0">Car Plate</p>
        </div>


            <div className="w-100 px-2 py-4">
                <input
                    type="text"
                    name="licenseplate"
                    className="licenseplate w-100"
                    maxLength="6"
                    id="plate"
                    placeholder={props.plate}
                />
            </div>

        <button className="btn btn-warning btn-lg mb-3 shadow" onClick={() => {props.updatePlate(document.getElementById("plate").value)}}><b className="text-white">Update</b></button>

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

export default connect(mapStateToProps, mapDispatchToProps)(plate);
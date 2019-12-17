import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPlateNumber, updatePlateNumber} from '../../../store/thunk/plateModal';
import {setPlateStatus} from "../../../store/actions/main";


class PlateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plateNumber: "",
            message: "",
            messageExist: false
        };

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkNumber = this.checkNumber.bind(this);
    }

    componentDidMount() {
        this.setState({plateNumber: "", message: "", messageExist: false});
        this.props.getPlateNumber();
        this.props.setPlateStatus("none");

    }

    myChangeHandler(event) {
        this.setState({plateNumber: event.target.value});
    }

    onSubmit() {
        this.props.setPlateStatus("none");
        if (this.checkNumber(this.state.plateNumber)) {
            this.props.updatePlate(this.state.plateNumber);
        } else {
            this.setState({messageExist: true});
        }
    }

    checkNumber(numbers) {

        // Front Validation, 7>length > 0, Only just Lotynic letters, Must have 1 digital and 1 letter at least, Must be different
        return numbers.length > 0 && numbers.length < 7 && /^\w*(?=\w*\d)(?=\w*[A-Za-z])\w*$/.test(numbers) && this.state.plateNumber !== this.props.plate;

    };

    render() {

        return (

            <div className="w-100 modalInsade">

                {
                    //if plate number is empty
                    this.props.plate !== null && this.props.plate.length > 0 ?
                        //if feedback exist
                        this.props.plateStatus !== 'none' ?
                            // check if post success
                            this.props.plateStatus === 'success' ?
                                <div className="mb-2 modileWidth mx-auto fade-in">
                                    <div id="info"
                                         className="mb-2 h4 p-2 bg-success text-white rounded transition_color">
                                        Successfully completed!
                                    </div>
                                </div>
                                :
                                // check if post fail
                                this.props.plateStatus === 'fail' ?
                                    <div className="mb-2 modileWidth mx-auto">
                                        <div id="info"
                                             className="mb-2 h4 p-2 bg-danger text-white rounded transition_color">
                                            Sorry, operation failed please contact the call center.
                                        </div>
                                    </div>
                                    : null
                            :
                            // check if message exist in front validation
                            this.state.messageExist ?
                                <div className="mb-2 modileWidth mx-auto fade-in">
                                    <div id="info"
                                         className="mb-2 h4 p-2 text-white bg-warning rounded transition_color">
                                        Sorry, plate number format isn't valid! Please check again.
                                    </div>
                                </div>
                                : null
                        :
                        <div className="mb-2 modileWidth mx-auto fade-in">
                            <div id="info" className="mb-2 h4 p-2 text-black bg-white rounded transition_color">
                                Please enter your car plate number!
                            </div>
                        </div>
                }

                <input
                    type="text"
                    name="licenseplate"
                    className={
                        //status color
                        this.props.plateStatus !== 'none' ?
                            this.props.plateStatus === 'success' ?
                                "licenseplate modileWidth success"
                                :
                                this.props.plateStatus === 'licenseplate modileWidth fail' ?
                                    "licenseplate modileWidth fail"
                                    : "licenseplate modileWidth"
                            :
                            this.state.messageExist ?
                                "licenseplate modileWidth warning"
                                : "licenseplate modileWidth"
                    }
                    maxLength="6"
                    id="plate"
                    placeholder={this.props.plate}
                    onKeyUp={this.myChangeHandler}
                />
                <br/>
                <button className="btn btn-outline-warning btn-lg mt-3 shadow">
                    <b className="text-white" onClick={this.onSubmit}>Update</b>
                </button>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        plate: state.main.plate,
        plateStatus: state.main.plateModalStatus,
    }
}

const mapDispatchToProps = dispatch => ({
    setPlateStatus: (status) => dispatch(setPlateStatus(status)),
    getPlateNumber: () => dispatch(getPlateNumber()),
    updatePlate: (data) => dispatch(updatePlateNumber(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlateModal);
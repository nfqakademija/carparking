import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPlateNumber} from '../../../store/thunk/plateModal';


class PlateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plateNumber: "",
            info: "",
            color: null
        };

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({plateNumber: "", info: null, color: null});
        this.props.getPlateNumber();
    }

    myChangeHandler(event) {
        this.setState({plateNumber: event.target.value});
    }

    onSubmit() {
        if (this.checkNumber(this.state.plateNumber)) {
            this.setState({info: "Numeriai atnaujinti!", color: "success"});
            this.props.updatePlate(this.state.plateNumber);
        } else {
            this.setState({info: "Numeriai nėra tinkami!", color: "wrong"});
        }
    }

    checkNumber(numbers) {

        return numbers.length > 0 && numbers.length < 7 && /^\w*(?=\w*\d)(?=\w*[A-Za-z])\w*$/.test(numbers);

    };

    render() {
        console.log(this.props.state.plate);
        return (

            <div className="w-100 modalInsade">

                <div id="info" className={"mb-2 h4 " + this.state.color}>{this.state.info}</div>

                <input
                    type="text"
                    name="licenseplate"
                    className={"licenseplate modileWidth " + this.state.color}
                    maxLength="6"
                    id="plate"
                    placeholder={this.props.state.plate}
                    onKeyUp={this.myChangeHandler}
                />
                <br/>
                <button className="btn btn-warning btn-lg mt-3 shadow">
                    <b className="text-white" onClick={this.onSubmit}>Update</b>
                </button>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        plate: state.user.activeCar,
    }
}

const mapDispatchToProps = dispatch => ({
    getPlateNumber: () => dispatch(getPlateNumber()),
    updatePlate: (data) => dispatch(updatePlate(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlateModal);
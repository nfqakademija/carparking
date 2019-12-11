import React, {Component} from 'react';
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../../css/containers/Away/away.scss'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: ""
        };

        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.myRef = React.createRef();
    }

    setStartDate(date) {
        this.setState({
            startDate: date
        });
    };

    setEndDate(date) {
        this.setState({
            endDate: date
        });
    };

    addDays(days) {
        const result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }

    render() {

        const ExampleCustomInput = React.forwardRef((props, ref) => (
                <input {...props} readOnly={true} type="text" className="form-control" placeholder="Click to select a date" />
        ));

        return (
            <div className="bg-white container-fluid mt-4 p-4">

                <form>
                    <div className="form-row">
                        <div className="col-6">
                            <p className="text-left m-1"><b>From:</b></p>
                            <DatePicker
                                minDate={new Date()}
                                maxDate={this.addDays(90)}
                                selected={this.state.startDate}
                                onChange={date => this.setStartDate(date)}
                                dateFormat="dd - MM - yyyy"
                                isClearable

                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                customInput={<ExampleCustomInput />}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="text-left m-1"><b>To:</b></p>
                            <DatePicker
                                minDate={new Date()}
                                maxDate={this.addDays(90)}
                                selected={this.state.endDate}
                                onChange={date => this.setEndDate(date)}
                                dateFormat="dd - MM - yyyy"
                                isClearable

                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                minDate={this.state.startDate}
                                customInput={<ExampleCustomInput />}
                            />
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        registrationData: state.reservationStatus,
    }
}

const mapDispatchToProps = dispatch => ({
    onGetHomeData: (f) => dispatch(getHomeData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
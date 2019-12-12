import React, {Component} from 'react';
import {connect} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import '../../../css/containers/Away/away.scss'

import '../../../css/components/UI/PopUp/popAway.scss';
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import {enGB} from "date-fns/esm/locale";

registerLocale("en-GB", enGB);
setDefaultLocale("en-GB");


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            popUp: false
        };

        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.openPop = this.openPop.bind(this);
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

    openPop() {
        this.setState({
            popUp: !this.state.popUp
        });
    }

    render() {

        const ExampleCustomInput = React.forwardRef((props, ref) => (
            <input {...props} readOnly={true} type="text" className="form-control"
                   placeholder="Click to select a date"/>
        ));

        return (
            <div className="p-4">

                <div className={`PopUp_away_container mb-4 animation ${this.state.popUp?'show':'hide'}`}>
                    From {this.state.setStartDate} To {this.state.endDate}
                    Are you sure?
                </div>


                <div className="bg-white container-fluid p-4 shadow">

                    <div className="rounded text-left p-2 my-3" style={{backgroundColor: "#E9ECEF"}}><b>History:</b>
                    </div>
                    <div className="rounded text-left p-2 my-3" style={{backgroundColor: "#E9ECEF"}}>Welcome please
                        choose
                        dates when you will not use the car park.
                    </div>

                    <form>
                        <div className="form-row">
                            <div className="col-12 col-md-6">
                                <p className="text-left m-1"><b>From:</b></p>
                                <DatePicker
                                    minDate={new Date()}
                                    maxDate={this.addDays(90)}
                                    selected={this.state.startDate}
                                    onChange={date => this.setStartDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    isClearable
                                    locale="en-GB"

                                    selectsStart
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    customInput={<ExampleCustomInput/>}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <p className="text-left m-1"><b>To:</b></p>
                                <DatePicker
                                    maxDate={this.addDays(90)}
                                    selected={this.state.endDate}
                                    onChange={date => this.setEndDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    isClearable
                                    locale="en-GB"

                                    selectsEnd
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    minDate={this.state.startDate}
                                    customInput={<ExampleCustomInput/>}
                                />
                            </div>
                        </div>
                    </form>

                    <button className="btn btn-warning btn-lg mt-4 shadow" onClick={this.openPop}>
                        <b className="text-white">Enter</b>
                    </button>
                </div>
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
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
            startDateClear: null,
            endDate: "",
            endDateClear: null,
            popUp: false,
            message: null
        };

        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.openPop = this.openPop.bind(this);
    }

    setStartDate(date) {
        const dateConstructor = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        this.setState({
            startDate: date,
            startDateClear: dateConstructor
        });
    };

    setEndDate(date) {
        const dateConstructor = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        this.setState({
            endDate: date,
            endDateClear: dateConstructor
        });
    };

    addDays(days) {
        const result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    }

    openPop() {
        if(this.state.startDateClear !== null && this.state.endDateClear !== null)
        {
            this.setState({
                popUp: !this.state.popUp,
                message: null
            });
        }
        else{
            this.setState({
                message: "Sorry,  you didn't select a dates!"
            });
        }

    }

    render() {

        const ExampleCustomInput = React.forwardRef((props, ref) => (
            <input {...props} readOnly={true} type="text" className="form-control"
                   placeholder="Click to select a date"/>
        ));

        return (
            <div className="p-4">

                <div className={`PopUp_away_container mb-4 animation ${this.state.popUp?'show':'hide'}`}>
                    <p><b>Set Away </b> - From: <b>{this.state.startDateClear}</b> To <b>{this.state.endDateClear}</b></p>
                    <p>Are you sure?</p>
                    <button className="btn btn-warning mr-2"><b className="text-white">Yes</b></button>
                    <button className="btn btn-danger"><b className="text-white">No</b></button>
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
                                    minDate={new Date()}
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

                    <div className="text-danger my-4">{this.state.message}</div>

                    <button className="btn btn-warning btn-lg mt-2 shadow" onClick={this.openPop}>
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
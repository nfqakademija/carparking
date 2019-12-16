import React, {Component} from 'react';
import {connect} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import '../../../css/containers/Away/away.scss'
import {getDatesAway, postDatesAway} from '../../store/thunk/awayPage';

import '../../../css/components/UI/PopUp/popAway.scss';
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import {enGB} from "date-fns/esm/locale";
import {postAwayDefaultStatus} from "../../store/actions/main";
import {getSingleUser} from "../../store/thunk/reservations";

registerLocale("en-GB", enGB);
setDefaultLocale("en-GB");


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            startDateClear: null,
            endDate: null,
            endDateClear: null,
            popUp: false,
            message: null,
        };

        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.openPop = this.openPop.bind(this);
        this.closePop = this.closePop.bind(this);
        this.postData = this.postData.bind(this);
    }

    componentDidMount() {
        // this.props.onGetSingleUser();
        this.props.postAwayDefaultStatus();
        // this.props.getDatesAway();
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

    dateConstruction(date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    openPop() {

        this.props.postAwayDefaultStatus();

        if (this.state.startDate !== null && this.state.endDate !== null) {

            const dateStart = this.dateConstruction(this.state.startDate);
            const dateEnd = this.dateConstruction(this.state.endDate);

            this.setState({
                startDateClear: dateStart,
                endDateClear: dateEnd
            });

            this.setState({
                popUp: true,
                message: null
            });
        } else {
            this.setState({
                message: "Sorry,  you didn't select a dates!"
            });
        }

    }

    closePop() {
        this.setState({
            popUp: false,
            startDateClear: null,
            endDateClear: null
        });
    }

    postData() {
        this.props.postDatesAway(this.state.startDateClear, this.state.endDateClear);

    }

    render() {


        const ExampleCustomInput = React.forwardRef((props, ref) => (
            <input {...props} readOnly={true} type="text" className="form-control"
                   placeholder="Click to select a date"/>
        ));

        const Popup = () => (

            this.props.status ?
                //if exist post status (success or error)
                this.props.postAwayLoading ?
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    this.props.status === "success" ?
                        <div><b>The operation performed successfully</b></div>
                        : this.props.status === "fail" ?
                        <div><b>Sorry, operation failed please contact the call center.</b></div> :
                        this.props.status === "duplicate" ?
                            <div><b>Sorry, this dates duplicate and exist in history. Please select unique dates.</b></div> : null
                :
                //if exist post null (success or error)
                <div>
                    <p><b>Set Away </b> -
                        From: <b>{this.state.startDateClear}</b> To <b>{this.state.endDateClear}</b>
                    </p>
                    <p>Are you sure?</p>
                    <button className="btn btn-warning mr-2" onClick={this.postData}><b
                        className="text-white">Accept</b>
                    </button>
                    <button className="btn btn-danger" onClick={this.closePop}><b className="text-white">Cancel</b>
                    </button>
                </div>
        );

        const History = () => (
            <div>
                {(Array.isArray(this.props.history) && this.props.history.length) ?
                    <table className="table m-0">
                        <tbody>
                        {this.props.history.map((data) =>
                            (<tr key={data.awayStartDate}>
                                <td className="px-0 py-1">From: <b>{data.awayStartDate}</b></td>
                                <td className="px-0 py-1">To: <b>{data.awayEndDate}</b></td>
                            </tr>))
                        }
                        </tbody>
                    </table>
                    :
                    <p>No Records.</p>}
            </div>

        );

        console.log(this.props.history)

        return (
            <div className="p-0 py-2 p-md-4" style={{height: '100%', overflow: 'scroll'}}>

                <div
                    className={`PopUp_away_container shadow mb-2 animation ${this.state.popUp ? 'show' : 'hide'} ${this.props.status === "success" ? "bg-success" : this.props.status === "fail" ? "bg-danger" : this.props.status === "duplicate" ? "bg-warning" : null }`}>
                    <Popup/>
                </div>


                <div className="bg-white p-4 shadow rounded">

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
                                    minDate={this.state.startDate === null ? new Date() : this.state.startDate}
                                    customInput={<ExampleCustomInput/>}
                                />
                            </div>
                        </div>
                    </form>

                    <div className="text-danger my-4">{this.state.message}</div>

                    <button className="btn btn-warning btn-lg mt-1 shadow" onClick={this.openPop}>
                        <b className="text-white">Enter</b>
                    </button>
                </div>

                <div className="bg-white p-4 shadow rounded mt-2">
                    {
                        this.props.historyLoading ?
                            <div className="spinner-border text-dark" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            :
                            <div className="rounded text-left p-2 my-3 fade-in" style={{backgroundColor: "#E9ECEF"}}>
                                <div className="py-2"><b className="h5">History:</b></div>
                                <History/>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        history: state.singleUser.user.aways,
        status: state.main.postAwayStatus,
        user: state.singleUser.user.aways,
        loading: state.main.postAwayLoading,
        historyLoading: state.main.awayHistoryLoading
    }
}

const mapDispatchToProps = dispatch => ({
    getDatesAway: () => dispatch(getDatesAway()),
    postDatesAway: (startDate, endDate) => dispatch(postDatesAway(startDate, endDate)),
    postAwayDefaultStatus: () => dispatch(postAwayDefaultStatus()),
    onGetSingleUser: () => dispatch(getSingleUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React, {Component} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import {connect} from "react-redux";

import {fetchReservations} from './store/thunk/reservations';
import {fetchSignleUserAndNotifications} from './store/thunk/notifications';
import {fetchUsersData} from './store/thunk/usersList';

import Layout from './containers/Layout/Layout';
import Login from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import Users from './containers/Users/Users';
import Logout from './containers/Auth/Logout/Logout';
import Away from './containers/Away/Away';
import Notifications from './containers/Notifications/Notifications';

class App extends Component {

    componentDidMount() {
        this.props.onFetchNotifications()
        this.props.onFetchUsersData()
        this.props.onFetchReservations()
    }

    render() {

        let routes =
            <Switch>
                <Route path='/app/' exact component={Login}/>
                <Redirect from='/app/' to='/app/'/>
            </Switch>

        if (this.props.token) {
            routes =
                <Layout user={this.props.user}>
                    <Switch>
                        <Route path="/app/home" component={Home}/>
                        <Route path='/app/users' component={Users}/>
                        <Route path='/app/logout' component={Logout}/>
                        <Route path='/app/away' component={Away}/> :
                        <Route path='/app/notifications' component={Notifications}/>
                        <Redirect from='/app/' to='/app/home'/>
                    </Switch>
                </Layout>
        }

        return routes
    }

}

const mapStateToProps = state => {
    return {
        token: state.main.token,
        user: state.singleUser.user
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchUsersData: () => dispatch(fetchUsersData()),
    onFetchReservations: () => dispatch(fetchReservations()),
    onFetchNotifications: () => dispatch(fetchSignleUserAndNotifications())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
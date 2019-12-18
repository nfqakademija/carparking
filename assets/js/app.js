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

    render() {

        let routes =
            <Switch>
                <Route path='/login' exact component={Login}/>
                <Redirect from='/' to='/login'/>
            </Switch>

        if (this.props.token) {
            routes =
                <Layout user={this.props.user}>
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path='/users' component={Users}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/away' component={Away}/> :
                        <Route path='/notifications' component={Notifications}/>
                        <Redirect from='/' to='/home'/>
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


export default connect(mapStateToProps)(App);
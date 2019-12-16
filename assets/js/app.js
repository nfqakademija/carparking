import React, { Component } from 'react';
import { Route,  Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { getUsersData, getReservations, getNotifications  } from './store/thunk/reservations';
import { fetchNotifications } from './store/thunk/notifications';

import Layout from './containers/Layout/Layout';
import Login from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import Users from './containers/Users/Users';
import Logout from './containers/Auth/Logout/Logout';
import Away from './containers/Away/Away';
import Notifications from './containers/Notifications/Notifications';

class App extends Component {
    
    componentDidMount() {
        this.props.onGetUsersData()
        this.props.onGetReservations()
        this.props.onFetchNotifications() 
    }

    render(){

        let routes =
        <Switch>
            <Route path='/app/' exact component={Login}/>
            <Redirect from='/app/' to='/app/'/>
        </Switch>

        if(this.props.token) {
            routes = 
            <Layout user={this.props.user}>
                <Switch>  
                    <Route path="/app/home" component={Home}/>
                    <Route path='/app/users' component={Users}/>
                    <Route path='/app/logout' component={Logout}/>
                    <Route path='/app/away' component={Away}/>
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
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps= dispatch => ({
    onGetUsersData: () => dispatch(getUsersData()),
    onGetReservations: () => dispatch(getReservations()),
    onFetchNotifications: () => dispatch(fetchNotifications())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
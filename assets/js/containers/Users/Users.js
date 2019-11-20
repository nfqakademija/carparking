import React, { Component } from 'react';
import { connect } from "react-redux";

import { getUsersData } from '../../store/thunk/reservations';

import UsersTable from '../../components/UsersTable/UsersTable';

class Users extends Component {

    componentDidMount() {
        this.props.onGetUsersData()
    }

    render (){
        return (
            <>
            {this.props.loading || this.props.usersList.length === 0
            ? 'loading ...'
            : <div style={{display:'flex', justifyContent:'space-around', height:'100%'}}>
                <UsersTable usersList={this.props.usersList}/>
                </div>
            }   
            </>
        )
    }  
}

const mapStateToProps = state => {
    return {
        usersList: state.users,
        loading: state.loading
    }
}


const mapDispatchToProps= dispatch => ({
    onGetUsersData: () => dispatch(getUsersData())
})


export default connect(mapStateToProps,mapDispatchToProps)(Users);
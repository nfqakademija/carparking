import React from 'react';
import { connect } from "react-redux";
import Background from '../../components/UI/Background/Background';

import * as fake from './fake';

import * as actions from "../../store/actions/index";
import '../../../css/containers/Auth/Auth.scss';

const auth = (props) => {
  return (
    <>
      <Background/>
      <div className='Auth_container bg-white'>
        <div className='Auth_header'>
          LOG IN
        </div>
            <div className='Auth_body shadow'>
              <div className="px-5 my-auto">
                <a className='google btn' onClick={()=>{props.onLogin(fake.userId, fake.userToken)}}>
                    <b style={{color:'white'}}>Login as User</b>
                </a>
              </div>
              <div className="px-5 my-auto">
                  <a className='google btn' onClick={()=>{props.onLogin(fake.guestId, fake.guestToken)}}>
                      <b style={{color:'white'}}>Login as Guest</b>
                  </a>
              </div>
            </div>
        </div>
    </>
)}

const mapDispatchToProps = dispatch => {
    return {
      onLogin: (id, token) => dispatch(actions.login(id, token))
    }
  }

export default connect(null, mapDispatchToProps)(auth);
import React from 'react';
import { connect } from "react-redux";
import Background from '../../components/UI/Background/Background';
import Button from '../../components/UI/Button/Button';

import * as actions from "../../store/actions/index";
import '../../../css/containers/Auth/Auth.scss';

const auth = (props) => (
    <>
      <Background/>
      <div className='Auth_container'>
        <div className='Auth_header'>
          LOG IN
        </div>
            <div className='Auth_body'>
              <input className='Auth_input' type="text" placeholder='E-mail' style={{padding:'0.5rem'}}/>
              <Button classname='Button_success' text='Log in ' onclick={props.onLogin} buttonStyle={{width:'50%'}}/>
            </div>
        </div>
    </>
)

const mapDispatchToProps = dispatch => {
    return {
      onLogin: () => dispatch(actions.login())
    }
  }

export default connect(null, mapDispatchToProps)(auth);
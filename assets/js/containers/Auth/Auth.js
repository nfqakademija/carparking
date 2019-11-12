import React from 'react';
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

const auth = (props) => (
    <button
        onClick={props.onLogin}>
            Log in
    </button>
)

const mapDispatchToProps = dispatch => {
    return {
      onLogin: () => dispatch(actions.login())
    }
  }

export default connect(null, mapDispatchToProps)(auth);
import React from 'react';

import '../../../../css/components/UI/Button/Button.scss';

// Button should recieve prop classname (with lowercase name!) Button_success, Button_danger or Button_neutral.
// Button should recieve prop text.
// Button should recieve prop onclick (with function).
// Button can recieve prop buttonStyle (should be an object. like in line style) this style owerrides original one.

const button = (props) => (
    <button 
        className={[props.classname, 'Button_base'].join(' ')} 
        style={props.buttonStyle}
        onClick={props.onclick}>
            {props.text}
    </button>
)

export default button;
import React from 'react';

import '../../../../css/components/UI/PopUp/PopUp.scss';

const popUp = (props) => {
    return (
            <>  
                <div className='PopUp_container' 
                    style={{
                        position:'relative',
                        left: props.left,
                        width: props.width,
                        transform: props.translate ?'translateY(0)': 'translateY(-200%)'
                    }} 
                    >                
                        pop-up
                </div>
            </>
    )
}

export default popUp;
import React from 'react';

import '../../../../css/components/UI/PopUp/PopUp.scss';

const popUp = (props) => {
    return(
    <>
        <div className='PopUp_container' 
            style={{
                position:'relative',
                //left:`${props.left.current.offsetLeft}px`,
                // width:`${props.right.current.offsetLeft+props.right.current.offsetWidth-props.left.current.offsetLeft}px`
            }} 
            onClick={e =>  {e.target.style.left = `${props.left.current.offsetLeft}px`;
                            e.target.style.width = `${props.right.current.offsetLeft+props.right.current.offsetWidth-props.left.current.offsetLeft}px`}}>                
                pop-up
        </div>
    </>
)}

export default popUp;
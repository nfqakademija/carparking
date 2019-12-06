import React from 'react';

import '../../../../css/components/UI/Background/Background.scss';

// background without any animations yet

const background = (props) => (
    <div className='Background_container'>
        <div class="car-wrapper">
            <div class="car-wrapper_inner">
                <div class="car_outter">  
                    <div class="car">
                        <div class="body">
                            <div></div>
                        </div>
                        <div class="decos">
                            <div class="line-bot"></div>
                            <div class="door">
                                <div class="handle"></div>
                                <div class="bottom"></div>
                        </div>
                        <div class="window"></div> 
                        <div class="light"></div>
                        <div class="light-front"></div>
                        <div class="antenna"></div>
                        <div class="ice-cream">
                            <div class="text">NFQ</div>
                        </div>  
                        </div>
                        <div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                        </div>    
                        <div class="wind">
                            <div class="p p1"></div>
                            <div class="p p2"></div>
                            <div class="p p3"></div>
                            <div class="p p4"></div>
                            <div class="p p5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='Background_sky'></div>
        <div className='Background_ground'></div>
    </div>
)

export default background;


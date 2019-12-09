import React from 'react';

import '../../../../css/components/UI/Background/Background.scss';
import car from '../../../../css/cars/cars1.svg';

import SVG from 'react-inlinesvg';

const background = (props) => (
    <div className='Background_container'>
        <div className="car-wrapper">
            <div className="car-wrapper_inner">
                <div className="car_outter">
                    <div className="car">
                        <div className="body">
                            <SVG src={car} />
                        </div>

                        <div>
                            <div className="wheel"></div>
                            <div className="wheel"></div>
                        </div>
                        <div className="wind">
                            <div className="p p1"></div>
                            <div className="p p2"></div>
                            <div className="p p3"></div>
                            <div className="p p4"></div>
                            <div className="p p5"></div>
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


import React from 'react';

import '../../../../css/components/UI/Background/Background.scss';
import car1 from '../../../../css/cars/cars1.svg';
import car2 from '../../../../css/cars/cars2.svg';
import car3 from '../../../../css/cars/cars3.svg';
import wheel from '../../../../css/cars/wheel.svg';

import SVG from 'react-inlinesvg';

const background = (props) => (
    <div className='Background_container'>
        <div className="car-wrapper">
            <div className="car-wrapper_inner">
                <div className="car_outter1">
                    <div className="car1">

                        <div className="bodyCar1">
                            <SVG className="svg1" src={car1}/>
                        </div>

                        <div className="wind1">
                            <div className="p p1"></div>
                            <div className="p p2"></div>
                            <div className="p p3"></div>
                            <div className="p p4"></div>
                            <div className="p p5"></div>
                        </div>
                    </div>
                </div>
                <div className="car_outter2">
                    <div className="car2">

                        <div className="bodyCar2">
                            <SVG className="svg2" src={car2}/>
                        </div>

                        <div className="wind2">
                            <div className="p p1"></div>
                            <div className="p p2"></div>
                            <div className="p p3"></div>
                            <div className="p p4"></div>
                            <div className="p p5"></div>
                        </div>

                    </div>
                </div>
                <div className="car_outter3">
                    <div className="car3">

                        <div className="bodyCar3">
                            <SVG className="svg3" src={car3}/>
                        </div>

                        <div className="wind3">
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


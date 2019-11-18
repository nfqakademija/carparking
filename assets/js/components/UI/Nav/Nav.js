import React from 'react';

import Menu from '../Menu/Menu';

const nav = () => (
            <div className="d-none bg_lightGrey d-md-block col-0 col-md-4 col-lg-3 p-0 box-shadow h-100">
                <div className="d-none d-md-block col-0 col-md-4 col-lg-3 position-fixed p-0 mt-2">
                    <div className="py-2">
                        <p className=" m-0 h3">
                            <b>Menu</b>
                        </p>
                    </div>
                    <Menu/>
                </div>
            </div>
)

export default nav;
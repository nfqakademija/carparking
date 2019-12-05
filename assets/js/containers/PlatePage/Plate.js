import React from 'react';
import Button from "../../components/UI/Button/Button";


const plate = (props) => (
    <div className="container w-100 bg-light mt-2 rounded shadow p-0">
        <div className="bg-dark py-2 rounded-top">
            <p className="text-light h4 m-0">Car Plate</p>
        </div>


            <div className="w-100 px-2 py-4">
                <input
                    type="text"
                    name="licenseplate"
                    className="licenseplate w-100"
                    maxLength="6"
                    placeholder="ABC123"
                />
            </div>

        <button className="btn btn-warning btn-lg mb-3 shadow"><b className="text-white">Update</b></button>

    </div>
)

export default plate;
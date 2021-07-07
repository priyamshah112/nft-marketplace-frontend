import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../CSS/createasset.css';
import React, { useState, useEffect } from 'react';

const PlaceBidModal = (props) => {

    const handleSubmit = () => {
        window.location.href = "/profile"
    }

    return (
        <Popup className="rounded-md"
            trigger={<button style={{ outline: "none"}} className="button w-full" type="button">Place Bid</button>}
            modal
            nested
        >
            {close => (
                <div class=" flex flex-col mx-8 my-5" >
                    <div className="modal">
                        <div class="flex flex-row-reverse">
                            <button id="closebutton" style={{ outline: "none" }} className="close m-2" onClick={close}><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row border-2 rounded-lg shadow-lg border-gray-200 h-15">
                                <div className="align-middle mt-5 ml-5 mr-5">Price</div>
                                <input id="bidvalue" className = "h-full w-full border-l-2 outline-none p-5 border-gray-200" placeholder="Enter Price" defaultValue={props.bid} type="number"></input>
                            </div>
                            <button onClick={handleSubmit} class="bg-blue-500 font-bold w-32 px-3 py-2 rounded mt-5 justify-self-center hover:bg-blue-600" style={{ color: "white", outline: "none" }}>Place Bid</button>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default PlaceBidModal;

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../CSS/createasset.css';
import React, { useState, useEffect } from 'react';

const PlaceBidModal = (props) => {

    const handleSubmit = () => {
        window.location.href = "/profile"
    }
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var style = {}
    if(isMobile)
        style = {width: "80%"};
    return (
        <Popup className="rounded-md"
            trigger={<button style={{ outline: "none"}} className="button w-full" type="button">Place Bid</button>}
            modal
            nested
            contentStyle={style}
        >
            {close => (
                <div className=" flex flex-col mx-8 my-5 " >
                    <div className="modal">
                        <div className="flex flex-row-reverse">
                            <button id="closebutton" style={{ outline: "none" }} className="close m-2" onClick={close}><i className="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row border-2 rounded-lg shadow-lg border-gray-200 h-15">
                                <div className="align-middle mt-5 ml-5 mr-5">Price</div>
                                <input id="bidvalue" className = "h-full w-full border-l-2 outline-none p-5 border-gray-200" placeholder="Enter Price" defaultValue={props.bid} type="number"></input>
                            </div>
                            <button onClick={handleSubmit} className="bg-blue-500 font-bold w-32 px-3 py-2 rounded mt-5 justify-self-center hover:bg-blue-600" style={{ color: "white", outline: "none" }}>Place Bid</button>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default PlaceBidModal;

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../CSS/createasset.css';
import React from 'react';

const ReferalModal = (props) => {

    // const handleSubmit = () => {
    //     window.location.href = "/profile"
    // }
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var style = {}
    if(isMobile)
        style = {width: "80%"};
    return (
        <Popup className="rounded-md"
            trigger={<button style={{ outline: "none"}} className="button w-full" type="button"><i className="fas fa-dollar-sign mr-2"></i>Referal</button>}
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
                        <div className="font-bold text-xl text-center">Refer to more users</div>
                        <div className="m-5">
                        Copy your unique referral link and share it far and wide. Any time a new user buys something on OpenSea, you’ll earn at least 1% of the sale! Referrals are processed in bulk each month. Due to high gas prices, only referrals earning over .005 ETH will be processed.
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row border-2 rounded-lg shadow-lg border-gray-200 h-15">
                                <div className="align-middle mt-5 ml-5 mr-5">Referral</div>
                                <input id="bidvalue" className = "h-full w-full border-l-2 outline-none p-5 border-gray-200" placeholder="Referral URL" value={props.url} type="text"></input>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default ReferalModal;
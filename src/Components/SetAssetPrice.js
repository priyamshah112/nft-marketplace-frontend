import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';
import '../CSS/createasset.css';





const Property_Card = (props) => {
    let selected = props.priceType == 0 && props.type == "Set Price" ? 
                    "border-blue-400 bg-blue-50" :
                    props.priceType == 1 && props.type == "Heighest Price" ?
                    "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"
    console.log(selected, props.priceType, props.type)
    return (
        <div className={"rounded-lg border-2 px-6 py-3 cursor-pointer w-1/4 " + selected} onClick={props.onClick}>
            <div className="text-blue-600 text-center" style={{ fontWeight: "bold" }}>{props.type}</div>
            <div className="text-center" style={{ color: "rgb(158, 158, 158)" }}>{props.name}</div>
        </div>
    )
}

const SetPriceAsset = () => {

    const [unlockableContent, setunlockableContent] = useState(-1);
    const [value, onChange] = useState('10:00');
    const [priceType, setpriceType] = useState(1);
    return (

        <div class="flex flex-col">
            <div class="flex flex-col bg-blue-50 py-2">
                <div class="w-10/12 m-auto px-10 text-xs">
                    Treasure3242
                </div>
                <div class="w-10/12 m-auto px-10">
                    Hacker
                </div>
            </div>

            <div class="w-10/12 m-auto p-10">
                <div class=" flex flex-row gap-5 justify-between">
                    <div class="w-2/3 flex flex-col gap-9">
                        <div class="row1" style={{ fontWeight: "bold" }}>
                            Select your sell method
                </div>
                        <div class="flex flex-row row2 gap-5">
                            <Property_Card type="Set Price" name="Sell at a fixed or declining price" priceType={priceType} onClick={() => setpriceType(0)}></Property_Card>
                            <Property_Card type="Heighest Price" name="Auction to the highest bidder" priceType={priceType} onClick={() => setpriceType(1)}></Property_Card>
                        </div>
                        {priceType == 0 ? (
                            <div class="flex flex-col gap-9">
                                <div class="flex flex-row price justify-between" >
                                    <div class="flex flex-col gap-5">
                                        <div class="heading" style={{ fontWeight: "bold" }}>
                                            Price
                        </div>
                                        <div class="normal" style={{ color: "rgb(158, 158, 158)" }}>
                                            Will be on the sale until you transfer this item
                        </div>

                                    </div>
                                    <div class="input">
                                        <input className="p-3 rounded-md bg-gray-50 border-2" placeholder="Amount"></input>
                                    </div>
                                </div>
                                <div style={{ borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: "10px" }}>
                                    <label className="block mt-4 font-bold">Privacy</label>
                                    <div class="flex flex-row justify-between align-items-center" style={{ alignItems: "center" }}>
                                        <p className="mt-1 text-gray-400">You can keep your listing public, or your can specify one address that's allowed to buy it.</p>
                                        <form>

                                            <label className="flex items-center cursor-pointer mt-5">
                                                <div className="relative">
                                                    <input type="checkbox" id="notificationToggle" className="sr-only toggleCheckBox" onChange={() => { setunlockableContent(unlockableContent * (-1)) }} />
                                                    <div className={"block w-14 h-8 rounded-full " + (unlockableContent == -1 ? 'bg-gray-600' : 'bg-gray-200')}></div>
                                                    <div className="toggle absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                                </div>
                                            </label>
                                        </form>

                                    </div>
                                    {unlockableContent == 1 ? <textarea className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 h-20 w-full focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Buyer address" type="text"></textarea> : null}

                                </div>
                            </div>) : (
                            <div class="flex flex-col gap-9">
                                <div class="flex flex-row price justify-between" >
                                    <div class="flex flex-col gap-5">
                                        <div class="heading" style={{ fontWeight: "bold" }}>
                                            Minimum Bid
                        </div>
                                        <div class="normal" style={{ color: "rgb(158, 158, 158)" }}>
                                            Set your starting bid price.Learn More

                        </div>

                                    </div>
                                    <div class="input">
                                        <input className="p-3 rounded-md bg-gray-50 border-2" placeholder="Amount"></input>
                                    </div>
                                </div>
                                <div class="flex flex-row price justify-between" >
                                    <div class="flex flex-col gap-5">
                                        <div class="heading" style={{ fontWeight: "bold" }}>
                                            Reserve Price
                        </div>
                                        <div class="normal" style={{ color: "rgb(158, 158, 158)" }}>
                                            Create a hidden limit by setting a reserve price.

                        </div>

                                    </div>
                                    <div class="input">
                                        <input className="p-3 rounded-md bg-gray-50 border-2" placeholder="Amount"></input>
                                    </div>
                                </div>
                                <div class="flex flex-row price justify-between" >
                                    <div class="flex flex-col gap-5">
                                        <div class="heading" style={{ fontWeight: "bold" }}>
                                            Expiration Date

                        </div>
                                        <div class="normal" style={{ color: "rgb(158, 158, 158)" }}>
                                            Your auction will automatically end at this time and the highest bidder will win. No need to cancel it!
                        </div>

                                    </div>
                                    <div class="input">
                                        {/* <input  placeholder="Amount"></input> */}
                                        <select className="p-3 rounded-md bg-gray-50 border-2" id="cars">
                                            <option value="in 5 Days">in 5 Days</option>
                                            <option value="in a week">in a week</option>
                                            <option value="in a month">in a month</option>
                                            <option value="never">never</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <div class="flex flex-row"></div> */}
                                <div class=" flex flex-row input justify-end rounded-md gap-3 items-baseline">
                                    <p>At</p>
                                    {/* <input className="p-3 rounded-md bg-gray-50 border-2" placeholder="Time"></input> */}
                                    <TimePicker

                                        onChange={onChange}
                                        value={value}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div class="w-1/3 p-5 my-7 rounded-lg border-2" style={{ backgroundColor: "rgb(251, 253, 255)" }}>
                        <div class="flex flex-col gap-5">
                            <div class="row1" style={{ borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: "25px", fontWeight: "bold" }}>
                                <i class="far fa-list-alt mr-3"></i>
                        Summary
                    </div>
                            <div class="row2 flex-row" style={{ borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: "25px", fontWeight: "bold" }}>
                                <p>Listing</p>
                                <button className="bg-blue-600 p-5 rounded-md" style={{ color: "white", fontWeight: "bold" }}>Post Your Listing <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                            </div>
                            <div class="row3 flex-row" style={{ borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: "25px" }}>
                                <p style={{ fontWeight: "bold" }}>Fees</p>
                                <p style={{ fontWeight: "lighter" }}>Listing is free! At the time of the sale, the following fees will be deducted. Learn more.</p>
                                <div class="flex flex-row justify-between">
                                    <p>To OpenSea</p>
                                    <p>2.5%</p>
                                </div>
                                <div class="flex flex-row justify-between font-bold">
                                    <p>Total</p>
                                    <p>2.5%</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-32 p-10">
                <div className="about tab w-full overflow-hidden border-2 border-gray-200 rounded-md">
                    <input className="absolute opacity-0 margin-auto margin-r-0" id="tab-about" type="checkbox" name="tabs"></input>
                    <label className="block p-8 leading-normal cursor-pointer text-xl" for="tab-about"><i className="fas fa-th mr-6 text-xl"></i>Instructions</label>
                    <div className="propertiesContent px-4 tab-content overflow-hidden bg-blue-50 w-full leading-normal">
                        <div className="flex flex-row flex-wrap p-4">
                            <p>
                               Our platform is decentralized, so we never escrow your items. As a result, if this is your first time 
                               selling a crypto asset, you need to complete 2 free transactions:
                            </p>
                            <ol className = "list-decimal mx-8 mb-4">
                                <li>To initialize your account for making sell orders, which only needs to be done once for your account.</li>
                                <li>To allow us to access your item when a sale occurs.</li>
                            </ol>
                            <p>
                                After those, you'll see a signature request to finalize your listing. In the future, as long as the item 
                                was approved in step 2 above, you won't have any transactions at all, only a signature! This is how we can 
                                (almost) achieve gas-free listings.
                            </p>
                            <p>
                                Note that you can always decrease the price of your listing for free, without making a transaction or paying gas. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default SetPriceAsset;
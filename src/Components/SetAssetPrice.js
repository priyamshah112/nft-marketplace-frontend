import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import '../CSS/createasset.css';





const Property_Card = (props) => {
    let selected = props.priceType === 0 && props.type === "Set Price" ? 
                    "border-blue-400 bg-blue-50" :
                    props.priceType === 1 && props.type === "Heighest Price" ?
                    "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"
    console.log(selected, props.priceType, props.type)
    return (
        <div className={"rounded-lg border-2 px-6 py-3 cursor-pointer md:w-1/4 " + selected} onClick={props.onClick}>
            <div className="text-blue-600 text-center" style={{ fontWeight: "bold" }}>{props.type}</div>
            <div className="text-center" style={{ color: "rgb(158, 158, 158)" }}>{props.name}</div>
        </div>
    )
}

const SetPriceAsset = () => {

    const [unlockableContent, setunlockableContent] = useState(-1);
    const [value, onChange] = useState('10:00');
    const [priceType, setpriceType] = useState(1);
    const [price, setPrice] = useState(null);
    const [reservePrice, setReservePrice] = useState(null);  

    return (

        <div className="flex flex-col">
            <div className="flex flex-col bg-blue-50 py-2">
                <div className="md:w-10/12 m-auto px-10 text-xs">
                    Treasure3242
                </div>
                <div className="w-10/12 m-auto px-10">
                    Hacker
                </div>
            </div>

            <div className="md:w-10/12 m-auto p-10">
                <div className=" flex flex-col md:flex-row gap-5 md:justify-between">
                    <div className="md:w-2/3 flex flex-col gap-9">
                        <div className="row1" style={{ fontWeight: "bold" }}>
                            Select your sell method
                </div>
                        <div className="flex flex-row row2 gap-5">
                            <Property_Card type="Set Price" name="Sell at a fixed or declining price" priceType={priceType} onClick={() => {setpriceType(0); setReservePrice(null)}}></Property_Card>
                            <Property_Card type="Heighest Price" name="Auction to the highest bidder" priceType={priceType} onClick={() => setpriceType(1)}></Property_Card>
                        </div>
                        {priceType === 0 ? (
                            <div className="flex flex-col gap-9">
                                <div className="flex flex-col md:flex-row price justify-between" >
                                    <div className="flex flex-col gap-2 md:gap-5">
                                        <div className="heading" style={{ fontWeight: "bold" }}>
                                            Price
                                        </div>
                                        <div className="normal mb-2" style={{ color: "rgb(158, 158, 158)" }}>
                                            Will be on the sale until you transfer this item
                                        </div>

                                    </div>
                                    <div className="input">
                                        <input className="p-3 rounded-md bg-gray-50 border-2" type="number" placeholder="Amount" onChange={(e) => setPrice(e.target.value)}></input>
                                    </div>
                                </div>
                                <div style={{ borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: "10px" }}>
                                    <label className="block mt-4 font-bold">Privacy</label>
                                    <div className="flex flex-col md:flex-row md:justify-between md:align-items-center">
                                        <p className="mt-1 text-gray-400">You can keep your listing public, or your can specify one address that's allowed to buy it.</p>
                                        <form>

                                            <label className="flex items-center cursor-pointer mt-5">
                                                <div className="relative">
                                                    <input type="checkbox" id="notificationToggle" className="sr-only toggleCheckBox" onChange={() => { setunlockableContent(unlockableContent * (-1)) }} />
                                                    <div className={"block w-14 h-8 rounded-full " + (unlockableContent === -1 ? 'bg-gray-600' : 'bg-gray-200')}></div>
                                                    <div className="toggle absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                                </div>
                                            </label>
                                        </form>

                                    </div>
                                    {unlockableContent === 1 ? <textarea className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 h-20 w-full focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Buyer address" type="text"></textarea> : null}

                                </div>
                            </div>) : (
                            <div className="flex flex-col gap-9">
                                <div className="flex flex-col md:flex-row price justify-between" >
                                    <div className="flex flex-col gap-2 md:gap-5">
                                        <div className="heading" style={{ fontWeight: "bold" }}>
                                            Minimum Bid
                                        </div>
                                        <div className="normal" style={{ color: "rgb(158, 158, 158)" }}>
                                            Set your starting bid price.Learn More
                                        </div>
                                    </div>
                                    <div className="input">
                                        <input className="p-3 rounded-md bg-gray-50 border-2 mt-2" type="number" placeholder="Amount" onChange={(e) => setPrice(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row price justify-between" >
                                    <div className="flex flex-col gap-2 md:gap-5">
                                        <div className="heading" style={{ fontWeight: "bold" }}>
                                            Reserve Price
                                        </div>
                                        <div className="normal" style={{ color: "rgb(158, 158, 158)" }}>
                                            Create a hidden limit by setting a reserve price.
                                        </div>
                                    </div>
                                    <div className="input">
                                        <input className="p-3 rounded-md bg-gray-50 border-2 mt-2" type="number" placeholder="Amount" onChange={(e) => setReservePrice(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row price justify-between" >
                                    <div className="flex flex-col gap-2 md:gap-5">
                                        <div className="heading" style={{ fontWeight: "bold" }}>
                                            Expiration Date
                                        </div>
                                        <div className="normal" style={{ color: "rgb(158, 158, 158)" }}>
                                            Your auction will automatically end at this time and the highest bidder will win. No need to cancel it!
                                        </div>
                                    </div>
                                    <div className="input">
                                        {/* <input  placeholder="Amount"></input> */}
                                        <select className="p-3 rounded-md bg-gray-50 border-2 mt-2" id="cars">
                                            <option value="in 5 Days">in 5 Days</option>
                                            <option value="in a week">in a week</option>
                                            <option value="in a month">in a month</option>
                                            <option value="never">never</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="flex flex-row"></div> */}
                                <div className=" flex flex-row input md:justify-end rounded-md gap-3 items-baseline">
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
                    <div className="md:w-1/3 p-5 my-7 rounded-lg border-2" style={{ backgroundColor: "rgb(251, 253, 255)" }}>
                        <div className="flex flex-col gap-5">
                            <div className="row1" style={{ borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: "25px", fontWeight: "bold" }}>
                                <i className="far fa-list-alt mr-3"></i>
                                Summary
                            </div>
                            <div className="row2 flex-row" style={{ borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: "25px", fontWeight: "bold" }}>
                                <p>Listing</p>
                                <p className={"font-light" + (price === null ? " hidden" : priceType === 1 ? " hidden" :price === "" ? " text-red-600" : " text-green-500")} >{price === "" ?  "Invalid price" : "The item will be sold for " + price + " ETH"}</p>
                                <p className={"font-light" + (price === null || reservePrice === null ? " hidden" : priceType === 0 ? " hidden" : parseInt(price) > parseInt(reservePrice) ? " text-red-600" : " text-green-500")} >{price === "" ?  "Invalid price" : parseInt(price) > parseInt(reservePrice) ? "Minimum Price cannot be greater than reserve price" : "The item will be auctioned at a minimum price of " + price + " ETH"}</p>
                                <button className="bg-blue-600 p-5 rounded-md mt-3" style={{ color: "white", fontWeight: "bold" }}>Post Your Listing <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                            </div>
                            <div className="row3 flex-row" style={{ borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: "25px" }}>
                                <p style={{ fontWeight: "bold" }}>Fees</p>
                                <p style={{ fontWeight: "lighter" }}>Listing is free! At the time of the sale, the following fees will be deducted. Learn more.</p>
                                <div className="flex flex-row justify-between">
                                    <p>To OpenSea</p>
                                    <p>2.5%</p>
                                </div>
                                <div className="flex flex-row justify-between font-bold">
                                    <p>Total</p>
                                    <p>2.5%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:max-w-5xl md:mx-32 p-10">
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
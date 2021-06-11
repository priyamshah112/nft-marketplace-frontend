import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const MessageExampleAttached = () => (
    <div className="rounded-lg">
        <Message
            attached
            header='Welcome to our site!'
            content=' 🕖 Sale ends today in 00:00:00'
            error
        />
        <Form className='attached fluid segment'>
            <div className="flex flex-col">
                <p>Current Price</p>
                <h1>0.5444</h1>
                <Button color='blue'>Buy Now</Button>
            </div>
        </Form>
    </div>
)

const Product_card = (props) => {
    return (
        <div className="rounded flex flex-col justify-between shadow-md my-2">
            <div className="flex flex-row-reverse m-5 items-center gap-1">
                {props.like}
                <i className="far fa-heart"></i>
            </div>
            <img className="w-full" src={props.imageurl} alt="Sunset in the mountains" />
        </div>
    )
}

const Property_Card = (props) => {
    return (
        <div className="bg-blue-300 rounded-lg border-2 p-4 w-1/4 m-3">
            <div className="text-blue-600 text-center">{props.type}</div>
            <div className="text-black text-center">{props.name}</div>
        </div>
    )
}

const Listing_Entry = (props) => {
    return (
        <tr className="bg-blue-50">
            <td className="p-4">{props.from}</td>
            <td className="p-4">{props.price} ETH</td>
            <td className="p-4">{props.expiry}</td>
            <td className="p-4">
                <button className="rounded-md p-2 border-2 border-green-400 bg-white text-green-400 hover:shadow-lg">{props.transact}</button>
            </td>
        </tr>
    )
}

const Offer_Entry = (props) => {
    return (
        <tr className="bg-blue-50">
            <td className="p-4">{props.from}</td>
            <td className="p-4">{props.price} ETH</td>
            <td className="p-4">{props.expiry}</td>
        </tr>
    )
}

const Trading_Entry = (props) => {
    return (
        <tr className="bg-blue-50">
            <td className="p-4">{props.event}</td>
            <td className="p-4">{props.price} ETH</td>
            <td className="p-4">{props.from}</td>
            <td className="p-4">{props.to}</td>
            <td className="p-4">{props.date}</td>
        </tr>
    )
}

const Asset = () => {
    return (
        <div className="w-11/12 m-10 pb-10">
            <div className=" flex gap-8">
                <div className="flex flex-col mt-15 w-1/3">
                    <div className="image">
                        <Product_card assetId={1} name="Abc" like={2} descr="Hey" imageurl={"https://ipfs.io/ipfs/QmViUFY5g6JzKCa2HA9dYtY864YsHqFQaryAJhm2NijUti"} />
                        {/* <img className="rounded w-full h-64 object-contain" src={"https://ipfs.io/ipfs/QmViUFY5g6JzKCa2HA9dYtY864YsHqFQaryAJhm2NijUti"} /> */}
                    </div>
                    <div className="assetDetails my-7 rounded-lg border-2">
                        <div className="description">
                            <div className="bg-white w-full p-8 text-lg font-bold">
                                <i className="fas fa-bars mr-6 text-xl"></i>Description
                            </div>
                            <div className="bg-blue-50 p-8">
                                Lorem ipsum
                            </div>
                        </div>
                        <div className="properties tab w-full overflow-hidden">
                            <input className="absolute opacity-0 margin-auto margin-r-0" id="tab-properties" type="checkbox" name="tabs"></input>
                            <label className="block p-8 leading-normal cursor-pointer text-xl" for="tab-properties"><i className="fas fa-bookmark mr-6 text-xl"></i>Properties</label>
                            <div id="propertiesContent"  className="propertiesContent px-4 tab-content overflow-hidden bg-blue-50 w-full leading-normal">
                                <div className="flex flex-row flex-wrap">
                                    <Property_Card type={"AGE"} name={"20"} />
                                    <Property_Card type={"AGE"} name={"20"} />
                                    <Property_Card type={"AGE"} name={"20"} />
                                    <Property_Card type={"AGE"} name={"20"} />
                                    <Property_Card type={"AGE"} name={"20"} />
                                    <Property_Card type={"AGE"} name={"20"} />
                                    <Property_Card type={"AGE"} name={"20"} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="about tab w-full overflow-hidden">
                            <input className="absolute opacity-0 margin-auto margin-r-0" id="tab-about" type="checkbox" name="tabs"></input>
                            <label className="block p-8 leading-normal cursor-pointer text-xl" for="tab-about"><i className="fas fa-address-card mr-6 text-xl"></i>About</label>
                            <div className="propertiesContent px-4 tab-content overflow-hidden bg-blue-50 w-full leading-normal">
                                <div className="flex flex-row flex-wrap p-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="details tab w-full overflow-hidden">
                            <input className="absolute opacity-0 margin-auto margin-r-0" id="tab-details" type="checkbox" name="tabs"></input>
                            <label className="block p-8 leading-normal cursor-pointer text-xl" for="tab-details"><i className="fas fa-info-circle mr-6 text-xl"></i>Details</label>
                            <div  className="propertiesContent px-4 tab-content overflow-hidden bg-blue-50 w-full leading-normal">
                                <div className="bg-blue-50 w-full p-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row">Crypto Address: <p className="m-auto mr-0 mt-0 text-gray-400">{"0xdfb2...46df"}</p></div>
                                        <div className="flex flex-row">Token ID: <p className="m-auto mr-0 mt-0 text-gray-400">{"27853175353..."}</p></div>
                                        <div className="flex flex-row">Blockchain: <p className="m-auto mr-0 mt-0 text-gray-400">{"Ethereum"}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow flex-col gap-3">
                    <div className="flex flex-row justify-between my-3">
                        <div>
                            Crypto Corgis ☑️
                        </div>
                        <div className="flex flex-row gap-2">
                            <i className="fas fa-redo-alt"></i>
                            <i className="fa fa-share" aria-hidden="true"></i>
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                    <div className="heading mb-6">
                        <h2>Corgi #2885</h2>
                    </div>
                    <div className="flex flex-row gap-8 my-4">
                        <div className="flex flex-row gap-2">
                            <p>Owned by HugMe</p>
                        </div>

                        <div className="flex flex-row gap-2 " style={{ "align-items": "center" }}>
                            <i className="far fa-eye"></i>
                            <p>7.8K views</p>
                        </div>

                        <div className="flex flex-row gap-2" style={{ "align-items": "center" }}>

                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <p>60 favorites</p>
                        </div>
                    </div>
                    <div className="message">
                        <MessageExampleAttached />

                    </div>
<<<<<<< HEAD
                    <div className="assetOffers my-7">
                        <div className="priceHistory mb-4 rounded-lg border-2">
                            <div className="flex flex-row">
                                <div className="bg-white w-full p-8 text-lg font-bold">
                                    <i className="fas fa-bookmark mr-6 text-xl"></i>Price History
                                </div>
                                <div className="m-auto mr-10">
                                    <i className="fas fa-caret-down text-2xl"></i>
                                </div>
                            </div>
                            <div className="bg-blue-50 w-full p-8">

                            </div>
                        </div>
                        <hr />
                        <div className="listings mb-4 rounded-lg border-2">
                            <div className="flex flex-row">
                                <div className="bg-white w-full p-8 text-lg font-bold">
                                    <i className="fas fa-address-card mr-6 text-xl"></i>Listings
                                </div>
                                <div className="m-auto mr-10">
                                    <i className="fas fa-caret-down text-2xl"></i>
                                </div>
                            </div>
                            <hr />
                            <div className="listingContent">
                                <table className="w-full">
                                    <tr className="bg-white">
                                        <td className="p-4">From</td>
                                        <td className="p-4">Price</td>
                                        <td className="p-4">Expiration</td>
                                        <td className="p-4">Buy/Sell</td>
                                    </tr>
                                    <Listing_Entry from={"ApeLife"} price={"0.12"} expiry={"03/08/2021"} transact={"Buy"} />
                                    <Listing_Entry from={"ApeLife"} price={"0.12"} expiry={"03/08/2021"} transact={"Buy"} />
                                </table>
                            </div>
                        </div>
                        <hr />
                        <div className="offers mb-4 rounded-lg border-2">
                            <div className="flex flex-row">
                                <div className="bg-white w-full p-8 text-lg font-bold">
                                    <i className="fas fa-info-circle mr-6 text-xl"></i>Offers
                                </div>
                                <div className="m-auto mr-10">
                                    <i className="fas fa-caret-down text-2xl"></i>
                                </div>
                            </div>
                            <hr />
                            <div className="offerContent">
                                <table className="w-full">
                                    <tr className="bg-white">
                                        <td className="p-4">From</td>
                                        <td className="p-4">Price</td>
                                        <td className="p-4">Expiration</td>
                                    </tr>
                                    <Offer_Entry from={"ApeLife"} price={"0.12"} expiry={"03/08/2021"} />
                                    <Offer_Entry from={"ApeLife"} price={"0.12"} expiry={"03/08/2021"} />
                                </table>
                                <hr />
                                <div className="bg-blue-50 p-4">
                                    <button className="bg-white rounded-md border-blue-500 border-2 px-8 py-4 text-blue-500 font-bold hover:shadow-lg">Make Offer</button>
                                </div>

=======
                    <div className="assetOffers my-7 tab w-full overflow-hidden border-2 rounded-md">
                        <input className="absolute opacity-0 margin-auto margin-r-0" id="tab-offers" type="checkbox" name="tabs"></input>
                        <label className="block p-8 leading-normal cursor-pointer text-xl" for="tab-offers"><i className="fas fa-info-circle mr-6 text-xl"></i>Offers</label>
                        <div className="offerContent tab-content overflow-hidden bg-blue-50 w-full leading-normal">
                            <hr/>
                            <table className="w-full">
                                <tr className="bg-white">
                                    <td className="p-4">From</td>
                                    <td className="p-4">Price</td>
                                    <td className="p-4">Expiration</td>
                                </tr>
                                <Offer_Entry from={"ApeLife"} price={"0.12"} expiry={"03/08/2021"} />
                                <Offer_Entry from={"ApeLife"} price={"0.12"} expiry={"03/08/2021"} />
                            </table>
                            <hr/>
                            <div className="bg-blue-50 p-4">
                                <button className = "bg-white rounded-md border-blue-500 border-2 px-8 py-4 text-blue-500 font-bold hover:shadow-lg">Make Offer</button>
>>>>>>> c1cac8d6381a4105fe73d20041e36be334d28ee9
                            </div>

                        </div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
            <div className="tradingHistory">
                <div className="flex flex-row border-2 rounded-t-lg border-b-0">
                    <div className="bg-white w-full p-8 text-lg font-bold">
                        <i className="fas fa-address-card mr-6 text-xl"></i>Trading History
                    </div>
                    <div className="m-auto mr-10">
                        <i className="fas fa-caret-down text-2xl"></i>
                    </div>
                </div>
                <hr />
                <div className="tradingHistoryContent border-2 rounded-b-md">
=======
            <div className="tradingHistory tab w-full overflow-hidden border-2 rounded-md">
                <input className="absolute opacity-0 margin-auto margin-r-0" id="tab-trading" type="checkbox" name="tabs"></input>
                <label className="block p-8 leading-normal cursor-pointer text-xl" for="tab-trading"><i className="fas fa-address-card mr-6 text-xl"></i>Trading History</label>
                <div className="tradingHistoryContent tab-content overflow-hidden bg-blue-50 w-full leading-normal">
                    <hr/>
>>>>>>> c1cac8d6381a4105fe73d20041e36be334d28ee9
                    <div className="tradingFilter bg-blue-50 p-4">
                        <select name="filters" className="w-full p-4 text-lg bg-white focus:outline-none">
                            <option selected value="Filter">Filter</option>
                            <option value="Listings">Listings</option>
                            <option value="Sales">Sales</option>
                            <option value="Bids">Bids</option>
                            <option value="Transfers">Transfers</option>
                        </select>
                    </div>
                    <hr />
                    <div>
                        <table className="w-full">
                            <tr className="bg-white">
                                <td className="p-4">Event</td>
                                <td className="p-4">Price</td>
                                <td className="p-4">From</td>
                                <td className="p-4">To</td>
                                <td className="p-4">Date</td>
                            </tr>
                            <Trading_Entry event={"Created"} from={"ApeLife"} to={"LazerViking"} price={"0.12"} date={"03/08/2021"} />
                            <Trading_Entry event={"Created"} from={"ApeLife"} to={"LazerViking"} price={"0.12"} date={"03/08/2021"} />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Asset;
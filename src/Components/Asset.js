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
                        <div className="properties">
                            <div className="flex flex-row">
                                <div className="bg-white w-full p-8 text-lg font-bold">
                                    <i className="fas fa-bookmark mr-6 text-xl"></i>Properties
                                </div>
                                <div className="m-auto mr-10">
                                    <i className="fas fa-caret-down text-2xl"></i>
                                </div>
                            </div>
                            <div className="bg-blue-50 w-full p-8">
                                <div className="flex flex-row flex-wrap">
                                    <Property_Card type={"AGE"} name={"20"} />
                                    <Property_Card type={"AGE"} name={"20"} />
                                    <Property_Card type={"AGE"} name={"20"} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="about">
                            <div className="flex flex-row">
                                <div className="bg-white w-full p-8 text-lg font-bold">
                                    <i className="fas fa-address-card mr-6 text-xl"></i>About
                                </div>
                                <div className="m-auto mr-10">
                                    <i className="fas fa-caret-down text-2xl"></i>
                                </div>
                            </div>
                            <div className="bg-blue-50 w-full p-8">
                                <div className="flex flex-row flex-wrap">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="details">
                            <div className="flex flex-row">
                                <div className="bg-white w-full p-8 text-lg font-bold">
                                    <i className="fas fa-info-circle mr-6 text-xl"></i>Details
                                </div>
                                <div className="m-auto mr-10">
                                    <i className="fas fa-caret-down text-2xl"></i>
                                </div>
                            </div>
                            <div className="bg-blue-50 w-full p-8">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row">Crypto Address: <p className="m-auto mr-0 mt-0 text-gray-400">{"0xdfb2...46df"}</p></div>
                                    <div className="flex flex-row">Token ID: <p className="m-auto mr-0 mt-0 text-gray-400">{"27853175353..."}</p></div>
                                    <div className="flex flex-row">Blockchain: <p className="m-auto mr-0 mt-0 text-gray-400">{"Ethereum"}</p></div>
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
                            <div className="bg-blue-50 w-full p-8">

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
                            <div className="bg-blue-50 w-full p-8">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tradingHistory">
                <div className="flex flex-row border-2 rounded-t-lg border-b-0">
                    <div className="bg-white w-full p-8 text-lg font-bold">
                        <i className="fas fa-address-card mr-6 text-xl"></i>Trading History
                    </div>
                    <div className="m-auto mr-10">
                        <i className="fas fa-caret-down text-2xl"></i>
                    </div>
                </div>
                <div className="bg-blue-50 w-full rounded-b-lg p-8 border-2">

                </div>
            </div>
        </div>
    )
}

export default Asset;
import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


const MessageExampleAttached = () => (
    <div>
        <Message
            attached
            header='Welcome to our site!'
            content=' 🕖 Sale ends today in 00:00:00'
            error
        />

        <Form className='attached fluid segment'>
            <div class="flex flex-col">
                <p>Current Price</p>
                <h1>0.5444</h1>
                <Button color='blue'>Buy Now</Button>
            </div>
        </Form>

    </div>
)

const Product_card = (props) => {
    return (
        <div className="w-60 rounded flex flex-col justify-between shadow-md my-2">
            <div className="flex flex-row-reverse m-5 items-center gap-1">
                {props.like}
                <i className="far fa-heart"></i>

            </div>
            <img className="w-full" src={props.imageurl} alt="Sunset in the mountains" />


        </div>





    )
}

const Asset = () => {
    return (

        <div class=" flex w-3/5 m-auto gap-3 " style={{ "marginTop": "25px" }}>
            <div class="flex flex-col mt-15">
                <div class="image">
                    <Product_card assetId={1} name="Abc" like={2} descr="Hey" imageurl={"https://ipfs.io/ipfs/QmViUFY5g6JzKCa2HA9dYtY864YsHqFQaryAJhm2NijUti"} />
                    {/* <img className="rounded w-full h-64 object-contain" src={"https://ipfs.io/ipfs/QmViUFY5g6JzKCa2HA9dYtY864YsHqFQaryAJhm2NijUti"} /> */}
                </div>
                <div class="description">
                    Decription
                </div>
            </div>
            <div class="flex-grow flex-col gap-3">
                <div class="flex flex-row justify-between">
                    <div class="">
                        Crypto Corgis ☑️
                    </div>
                    <div class="flex flex-row gap-2">
                        <i class="fas fa-redo-alt"></i>
                        <i class="fa fa-share" aria-hidden="true"></i>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                </div>
                <div class="heading">
                    <h2>Corgi #2885</h2>
                </div>
                <div class="flex flex-row gap-3">
                    <div class="flex flex-row gap-2">
                        <p>Owned by HugMe</p>
                    </div>

                    <div class="flex flex-row gap-2 " style={{ "align-items": "center" }}>
                        <i class="far fa-eye"></i>
                        <p>7.8K views</p>
                    </div>

                    <div class="flex flex-row gap-2" style={{ "align-items": "center" }}>

                        <i class="fa fa-heart" aria-hidden="true"></i>
                        <p>60 favorites</p>
                    </div>
                </div>
                <div class="message">
                    <MessageExampleAttached />
                </div>
            </div>
        </div>
    )
}

export default Asset;
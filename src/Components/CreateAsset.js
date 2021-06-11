import React, { useState, useEffect } from 'react';
import Popup1 from './Popup';
import axios from 'axios';
import { useParams } from 'react-router';
import { Redirect } from "react-router-dom";
import { render } from '@testing-library/react';
import verifyUser from '../Mock_Api/verifyUser';

const IPFS = require('ipfs-http-client')
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const CreateAsset = () => {
    const [unlockableContent, setunlockableContent] = useState(-1)
    const [buffer, setBuffer] = useState(null)
    const [ipfsHash, setIPFSHash] = useState("QmViUFY5g6JzKCa2HA9dYtY864YsHqFQaryAJhm2NijUti")
    const [redirect, setredirect] = useState(null)

    const [name, setname] = useState("")
    const [externallink, setexternallink] = useState("")
    const [description, setdescription] = useState("")
    const [properties, setproperties] = useState([])
    const [level, setlevel] = useState([])
    const [stats, setstats] = useState([])

    //LOGIN  ==============================
    
    const [accountAd, setaccountAd] = useState("")

    const VerifyUser = async (account)=>{
        verifyUser.post(`/auth/verifyUser/${account}`)
            .then(response=>{ 
                //console.log(response.data.data) 
            })
            .catch(err=>{
                console.log(err)
            })
    }
    
    async function enableEthereum() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setaccountAd(account);
        VerifyUser(account);
        console.log(account);
    }
    
    function login() {
        if(typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            enableEthereum()
            window.ethereum.on('accountsChanged', function (accounts) {
                window.location.reload()
            })
        }
    }

    useEffect(() => {  }, [accountAd])

    //=====================================
    
    const uploadImage = (event) => {
        event.preventDefault()

        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result))

        }

    }

    const updateValue = (event, name) => {
        console.log(event.target.value)
        console.log(name);
        // `${name}` = event.target.value;

        // console.log({ ...asset`${name}` = event.target.value });
    }


    useEffect(() => {
        if (buffer != null)
            ipfs.add(buffer).then((res) => {
                console.log(res)
                setIPFSHash(res.path)
            })
    }, [buffer])

    useEffect(() => {
        // updatePropertyTag()

    }, [properties, stats, level])

    useEffect(() => {
        return <Redirect to={redirect} />
    }, [redirect])

    const updatePropertyTag = () => {
        if (properties.length != 0) {
            var tag = [];
            var data = properties[0];
            console.log({ "length": data.length })
            for (var i = 0; i < data.length; i++) {
                // var data = properties[i];
                // console.log(data);
                tag.push(
                    <button type="button" class="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold" style={{ color: "rgb(32, 129, 226)", borderWidth: "1px", fontSize: "13px", outline: "none" }}>{data[i].name}:{data[i].value}</button>
                )
            }
            return tag
        }
    }
    const updateLevelTag = () => {
        if (level.length != 0) {
            var tag = [];
            var data = level[0];
            console.log({ "length": data.length })
            for (var i = 0; i < data.length; i++) {
                // var data = properties[i];
                // console.log(data);
                tag.push(
                    <button type="button" class="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold" style={{ color: "rgb(32, 129, 226)", borderWidth: "1px", fontSize: "13px", outline: "none" }}>{data[i].name}:{data[i].value} to {data[i].max}</button>
                )
            }
            return tag
        }
    }
    const updateStatsTag = () => {
        if (stats.length != 0) {
            var tag = [];
            var data = stats[0];
            console.log({ "length": data.length })
            for (var i = 0; i < data.length; i++) {
                // var data = properties[i];
                // console.log(data);
                tag.push(
                    <button type="button" class="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold" style={{ color: "rgb(32, 129, 226)", borderWidth: "1px", fontSize: "13px", outline: "none" }}>{data[i].name}:{data[i].value} to {data[i].max}</button>
                )
            }
            return tag
        }
    }

    const handleSubmit = (event) => {


        event.preventDefault()

        console.log(properties);
        console.log(level);
        console.log(stats);
        console.log(event.target.form[1].value)

        properties.map(data => console.log(data.name))
        console.log(level)

        console.log({
            "asset": {
                "assetUrl": "https://ipfs.io/ipfs/" + ipfsHash,
                "assetMime": "image/png",
                "name": event.target.form[1].value,
                "description": event.target.form[3].value,
                "private": false,
                "category": "art",

                "properties": properties,
                "levels": level,
                "stats": stats
            },
            "ownerId": accountAd
        })
        console.log()
        if(event.target.form[1].value.length > 2 && event.target.form[1].value.length < 20){
            axios.post('https://nft-api-1.herokuapp.com/api/assets/',
                {
                    "asset": {
                        "assetUrl": "https://ipfs.io/ipfs/" + ipfsHash,
                        "assetMime": "image/png",
                        "name": event.target.form[1].value,
                        "description": event.target.form[3].value,
                        "private": false,
                        "category": "art",
                        "properties": properties.length == 0 ? [] : properties[0],
                        "levels": level.length == 0 ? [] : level[0],
                        "stats": stats.length == 0 ? [] : stats[0]

                    },
                    "ownerId": accountAd
                }

            // Replace above line by: "ownerId": "6087765dfc13ae34e4000064" for testing 

            ).then((res, err) => {

                setredirect('/profile')

                if (err) {
                    console.log(err)
                }
                console.log(res);
                window.location.href = "/profile"

            }).catch((err) => {
                console.log(err)
            })
        }
        else{
            console.log("Invalid asset name entry")
        }

    }
    
    const getMetaMask = (event) => {
        event.preventDefault()
        if(typeof window.ethereum == 'undefined' || !window.ethereum.isMetaMask) {
            alert("This application requires MetaMask. Get MetaMask ?");
            window.location.href = "https://metamask.io/download.html";
        }
        else {
            alert("Please log in to MetaMask");
            window.location.reload()
        }
    }
    const [assetName, setAssetName] = useState(null)
    return (

        <div className="m-10 ml-96 mr-96">
            <h1 className="text-3xl mt-10">Create new item</h1>
            <form>
                <p className="mt-2 font-bold">Image, Video, Audio, or 3D Model</p>
                <p className="mt-1 text-gray-400">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 40 MB</p>
                <label className="cursor-pointer" for="upload-asset">
                    <div className="border-2 border-gray-200 w-96 h-60 mt-2 rounded-md border-dashed">
                        <img className="m-2 p-2 h-full self-center" src={"https://ipfs.io/ipfs/" + ipfsHash} />
                    </div>
                </label>
                <input className="opacity-0 absolute -z-10" id="upload-asset" type="file" onChange={uploadImage}></input>
                <label className="block mt-4 font-bold">Name *</label>
                <input className={"rounded-md border-2 mt-2 pl-2 py-2 w-full focus:shadow-lg focus:border-none focus:outline-none " + (assetName == null ? "border-gray-200": assetName.length > 2 && assetName.length < 20 ? "border-gray-200" : "border-red-500") } type="text" onChange={(event) => setAssetName(event.target.value)}></input>
                <div className={"mt-1 text-red-500 text-sm " + (assetName == null ? "hidden" : assetName.length > 2 && assetName.length < 20 ? "hidden" : "")}>Length of name should be from 3 to 19</div>
                <label className="block mt-4 font-bold">External Link</label>
                <p className="mt-1 text-gray-400">We will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</p>
                <input className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 w-full focus:shadow-lg focus:border-none focus:outline-none" type="text" ></input>
                <label className="block mt-4 font-bold">Description</label>
                <p className="mt-1 text-gray-400">The description will be included on the item's detail page underneath its image.</p>
                <textarea className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 h-20 w-full focus:shadow-lg focus:border-none focus:outline-none" type="text"></textarea>
                <div className="mt-2 flex flex-column w-full">
                    <i className="p-1 mt-2 fas fa-list-ul"></i>
                    <div>
                        <p className="ml-4 font-bold">Properties</p>
                        <p className="mt-1 ml-4 font-light">Textual traits</p>
                    </div>
                    <button type="button" className="m-auto mr-2 border-2 border-blue-500 px-3 py-2 rounded-md hover:shadow-lg focus:outline-none">
                        <Popup1 choice={1} properties={properties} setproperties={(value) => setproperties(value)} />
                    </button>


                </div>
                {/* <button type="button" class="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold" style={{ color: "rgb(32, 129, 226)", borderWidth: "1px", fontSize: "13px", outline: "none" }}>Ass</button> */}

                {
                    updatePropertyTag()
                }

                <hr className="mt-4" />
                <div className="mt-2 flex flex-column w-full">
                    <i className="p-1 mt-2 fas fa-star"></i>
                    <div>
                        <p className="ml-4 font-bold">Levels</p>
                        <p className="mt-1 ml-4 font-light">Numerical traits that show as progress bars</p>
                    </div>
                    <button type="button" className="m-auto mr-2 border-2 border-blue-500 px-3 py-2 rounded-md hover:shadow-lg focus:outline-none">
                        <Popup1 choice={2} properties={level} setproperties={(value) => setlevel(value)} />
                    </button>
                </div>
                {
                    updateLevelTag()
                }
                <hr className="mt-4" />
                <div className="mt-2 flex flex-column w-full">
                    <i className="p-1 mt-2 fas fa-signal"></i>
                    <div>
                        <p className="ml-4 font-bold">Stats</p>
                        <p className="mt-1 ml-4 font-light">Numerical traits that show as numbers</p>
                    </div>
                    <button type="button" className="m-auto mr-2 border-2 border-blue-500 px-3 py-2 rounded-md hover:shadow-lg focus:outline-none">
                        <Popup1 choice={3} properties={stats} setproperties={(value) => setstats(value)} />
                    </button>
                </div>
                {
                    updateStatsTag()
                }

                <label className="block mt-4 font-bold">Unlockable content</label>
                <div class="flex flex-row justify-between align-items-center" style={{ alignItems: "center" }}>
                    <p className="mt-1 text-gray-400">Include unlockable content that can only be revealed by the owner of the item.</p>
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
                {unlockableContent == 1 ? <textarea className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 h-20 w-full focus:shadow-lg focus:border-none focus:outline-none" type="text"></textarea> : null}
                <label className="block mt-4 font-bold">Supply *</label>

                <p className="mt-1 text-gray-400">The number of copies that can be minted. No gas cost to you! Quantities above one coming soon.</p>
                <input value="1" className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 w-full focus:shadow-lg focus:border-none focus:outline-none" type="text" ></input>
                <hr className="mt-4" />
                {login()}
                { accountAd ?
                        <div className="w-full mt-8">
                            <input type="Submit" className="bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 hover:shadow-lg" value="Create" onClick={(event)=>handleSubmit(event)}></input>
                        </div>
                    :
                        <div className="w-full mt-8">
                            <input type="Submit" className="bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 hover:shadow-lg" value="Create" onClick={getMetaMask}></input>
                        </div>
                }
                <br /><br />
            </form>

        </div>
    )
}

export default CreateAsset
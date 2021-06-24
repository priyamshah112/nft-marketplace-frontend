import React, { useState, useEffect } from 'react';
import Popup1 from './Popup';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import verifyUser from '../Mock_Api/verifyUser';

const IPFS = require('ipfs-http-client')
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const EditAsset = (props) => {
    const [unlockableContent, setunlockableContent] = useState(-1)
    const [buffer, setBuffer] = useState(null)
    const [ipfsHash, setIPFSHash] = useState("")
    const [properties, setproperties] = useState([])
    const [level, setlevel] = useState([])
    const [stats, setstats] = useState([])
    const [assetData, setAssetData] = useState([])
    let { id } = useParams()
    const assetId = id != null ? id : ""
    const [category, setcategory] = useState("Art")


    //LOGIN  ==============================

    const [accountAd, setaccountAd] = useState("")

    const VerifyUser = async (account) => {
        verifyUser.post(`/auth/verifyUser/${account}`)
            .then(response => {
                //console.log(response.data.data) 
            })
            .catch(err => {
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
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            enableEthereum()
            window.ethereum.on('accountsChanged', function (accounts) {
                window.location.reload()
            })
        }
        else {
            alert("This application requires MetaMask. Get MetaMask ?");
            window.location.href = "https://metamask.io/download.html";
        }
    }

    useEffect(() => { }, [accountAd])

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

    useEffect(() => {
        if (buffer != null)
            ipfs.add(buffer).then((res) => {
                console.log(res)
                setIPFSHash(res.path)
            })
    }, [buffer])


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("P:", properties[0])
        console.log("L:", level[0])
        console.log("S:", stats[0])
        console.log({
            "ownerId": assetData['ownerId'],
            "assetId": assetData['meta']['assetId'],
            "asset": {
                "assetUrl": "https://ipfs.io/ipfs/" + ipfsHash,
                "assetMime": "image/png",
                "name": event.target.form[1].value,
                "description": event.target.form[3].value,
                "private": false,
                "category": category,
                "properties": properties.length == 0 ? [] : typeof (properties[0]) === 'object' ? properties : properties[0],
                "levels": level.length == 0 ? [] : level[0],
                "stats": stats.length == 0 ? [] : stats[0]
            }
        })

        console.log({
            "ownerId":assetData['ownerId'],
            "_id":assetData['meta']['assetId'],
            "asset":{
                "assetUrl":"https://ipfs.io/ipfs/" + ipfsHash,
                "category": category,
                "assetName":event.target.form[1].value,
                "assetMime":"image/png",
                "description":event.target.form[3].value,
                "private":false,
                "properties":properties.length == 0 ? [] : typeof (properties[0]) === 'object' ? properties : properties[0],
                "stats":stats.length == 0 ? [] : stats[0],
                "levels":level.length == 0 ? [] : level[0]
            }
        })

        if (event.target.form[1].value.length > 2 && event.target.form[1].value.length < 19) {
            axios.put('http://localhost:5000/api/assets', {
                "ownerId":assetData['ownerId'],
                "_id":assetData['meta']['assetId'],
                "asset":{
                    "assetUrl":"https://ipfs.io/ipfs/" + ipfsHash,
                    "category": category,
                    "assetName":event.target.form[1].value,
                    "assetMime":"image/png",
                    "description":event.target.form[3].value,
                    "private":false,
                    "properties":properties.length == 0 ? [] : typeof (properties[0]) === 'object' ? properties : properties[0],
                    "stats":stats.length == 0 ? [] : stats[0],
                    "levels":level.length == 0 ? [] : level[0]
                }
            }).then((result) => {
                console.log(result.data);
                window.location.href = "/profile";
            })
                .catch((error) => {
                    throw console.log(error);
                })
        }
        else {
            console.log("Invalid asset/creator name entry")
        }
    }

    const handleDelete = (event) => {
        event.preventDefault()
        console.log({
            "ownerId": assetData['ownerId'],
            "assetId": assetData['meta']['assetId']
        })
        axios.delete('http://localhost:5000/api/assets', {
            data: {
                "ownerId": assetData['ownerId'],
                "assetId": assetData['meta']['assetId']
            }
        }).then((result) => {
            console.log(result.data);
            window.location.href = "/profile";
        })
            .catch((error) => {
                throw console.log(error);
            })
    }

    useEffect(() => {
        axios.get('https://localhost:5000/api/assets/' + assetId.toString())
            .then(response => {
                setAssetData(response['data']['data'])
                setIPFSHash(response['data']['data']['assetUrl'].split('/')[4])
                setproperties(response['data']['data']['meta']['properties'])
                console.log(response['data']['data']['meta']['properties'])
                setlevel(response['data']['data']['meta']['levels'])
                setstats(response['data']['data']['meta']['stats'])
            })
    }, [])
    console.log(assetData)
    const [assetName, setAssetName] = useState(assetData['name'])
    const [creatorName, setCreatorName] = useState(assetData['createrName'])
    login();
    if (accountAd === assetData['ownerId']) {
        return (
            <div className="m-10 ml-96 mr-96">
                <h1 className="text-3xl mt-10">Edit Asset</h1>
                <form>
                    <p className="mt-2 font-bold">Image, Video, Audio, or 3D Model</p>
                    <p className="mt-1 text-gray-400">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 40 MB</p>
                    <label className="cursor-pointer" for="upload-asset">
                        <div className="border-2 border-gray-200 w-96 h-60 mt-2 rounded-md border-dashed">
                            <img className="m-2 w-full h-full self-center" src={"https://ipfs.io/ipfs/" + ipfsHash} />
                        </div>
                    </label>
                    <input className="opacity-0 absolute -z-10" id="upload-asset" type="file" onChange={uploadImage}></input>
                    <label className="block mt-4 font-bold">Name *</label>
                    <input className={"rounded-md border-2 mt-2 pl-2 py-2 w-full focus:shadow-lg focus:border-none focus:outline-none " + (assetName == null ? "border-gray-200" : assetName.length > 2 && assetName.length < 19 ? "border-gray-200" : "border-red-500")} type="text" defaultValue={assetData['name']} onChange={(event) => setAssetName(event.target.value)}></input>
                    <div className={"mt-1 text-red-500 text-sm " + (assetName == null ? "hidden" : assetName.length > 2 && assetName.length < 20 ? "hidden" : "")}>Length of name should be from 3 to 18</div>
                    <label className="block mt-4 font-bold">Description</label>
                    <p className="mt-1 text-gray-400">The description will be included on the item's detail page underneath its image.</p>
                    <textarea className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 h-20 w-full focus:shadow-lg focus:border-none focus:outline-none" type="text" defaultValue={assetData['description']}></textarea>
                    <div class="flex flex-row py-4 price justify-between" >
                        <div class="flex flex-col gap-5">
                            <div class="heading" style={{ fontWeight: "bold" }}>
                                Category


                            </div>
                            <div class="normal" style={{ color: "rgb(158, 158, 158)" }}>
                                Select category of your asset
                            </div>

                        </div>
                        <div class="input">
                            {/* <input  placeholder="Amount"></input> */}
                            <select className="p-3 rounded-md bg-gray-50 border-2" id="cars" value={category} onChange={(e) => { setcategory(e.target.value); }}>
                                <option value="Art">Art</option>
                                <option value="Music">Music</option>
                                <option value="Domain Name">Domain Name</option>
                                <option value="Sport">Sport</option>
                                <option value="Virtual Card">Virtual Card</option>
                                <option value="Trading Card">Trading Card</option>
                                <option value="Collectibles">Collectibles</option>
                                <option value="GIFS">GIFS</option>
                                <option value="Memes">Memes</option>
                            </select>
                        </div>
                    </div>
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
                    <div className="w-full mt-8">
                        <input type="Submit" className="bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 hover:shadow-lg" value="Submit" onClick={handleSubmit}></input>
                        <input type="Submit" className="bg-red-500 text-white p-4 rounded-md float-right hover:bg-red-600 hover:shadow-lg" value="Delete Item" onClick={handleDelete}></input>
                    </div>
                </form>

            </div>
        )
    }
    return <div className="flex h-screen justify-center items-center"><h1 className="text-center text-3xl">Please Sign in to MetaMask</h1></div>;
}

export default EditAsset
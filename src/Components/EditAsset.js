import React, { useState, useEffect } from 'react';
import Popup1 from './Popup';

const IPFS = require('ipfs-http-client')
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const EditAsset = () => {
    const [unlockableContent, setunlockableContent] = useState(-1)
    const [buffer, setBuffer] = useState(null)
    const [ipfsHash, setIPFSHash] = useState(null)
    let data = {}
    useEffect(() => {
        fetch('https://nft-api-1.herokuapp.com/api/assets')
        .then((result) => result.json())
        .then((data) => console.log(data))
    }, [])

    const uploadImage = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(buffer)
        const res = ipfs.add(buffer).then((res) => {
            console.log(res)
            setIPFSHash(res.path)
        })
    }

    return (
        <div className="m-10 ml-96 mr-96">
            <h1 className="text-3xl mt-10">Edit Asset</h1>
            <form>
                <p className="mt-2 font-bold">Image, Video, Audio, or 3D Model</p>
                <p className="mt-1 text-gray-400">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 40 MB</p>
                <label className="cursor-pointer" for="upload-asset">
                    <div className="border-2 border-gray-200 w-96 h-60 mt-2 rounded-md border-dashed">
                        <img className="m-2 w-11/12 self-center" src={"https://ipfs.io/ipfs/" + ipfsHash }/>
                    </div>
                </label>
                <input className="opacity-0 absolute -z-10" id="upload-asset" type="file" onChange={uploadImage}></input>
                <label className="block mt-4 font-bold">Name *</label>
                <input className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 w-full focus:shadow-lg focus:border-none focus:outline-none" type="text" ></input>
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
                        <Popup1 choice={1} />
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
                        <Popup1 choice={2} />
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
                        <Popup1 choice={3} />
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
                    <input type="Submit" className="bg-red-500 text-white p-4 rounded-md float-right hover:bg-red-600 hover:shadow-lg" value="Delete Item"></input>
                </div>
            </form>

        </div>
    )
}

export default EditAsset
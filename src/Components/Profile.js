import React, { useState, useEffect } from 'react';
import '../tailwind.css';
// import profile_img from '../Images/profile.PNG'
import {
    Link
} from "react-router-dom";
import axios from 'axios';
import RedirectModal from './RedirectModal';
import userActivity from "../Mock_Api/user_activity.json"
import Card from "./Card"
import favorite from "../Mock_Api/favourite_assets.json"
import userOffers from "../Mock_Api/offer_to_user.json"
import ReferalModal from './ReferalModal';
import { Button } from 'semantic-ui-react';
import referral from "../Mock_Api/userReferrals.json";

const IPFS = require('ipfs-http-client')
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const serverAdd = process.env.REACT_APP_SERVER;

const Product_card = (props) => {
    function deleteAsset(ownerId, assetId) {
        console.log(ownerId, assetId)
        props.setLoading(true)
        axios.delete(serverAdd+'/assets', {
            data: {
                "assetId": assetId,
                "ownerId": ownerId
            }
        }).then((result) => {
            console.log(result.data);
            window.location.href = "/profile";
        }).catch((error) => {
            props.setLoading(false)
            throw console.log(error);
        })
    }
    console.log(props)
    return (
        <Link to={{
            pathname: "/asset/",
            state: {
                ownerId: props.id.account_address[0],
                name: props.name,
                descr: props.descr,
                assetId: props.assetId,
                source: "profile"
            }
        }}>
        <div className="w-60 rounded flex flex-col justify-between shadow-lg my-2">
            <div className="flex flex-row-reverse m-5 items-center gap-1">
                {props.like}
                <i className="far fa-heart"></i>
                
                    <button className="mr-2"><i className="fas fa-tag"></i></button>
                
                <button className="mr-2" onClick={() => deleteAsset(props.ownerId, props.assetId)}><i className="fas fa-trash"></i></button>
            </div>
            <img className="w-full" src={props.imageurl} alt="Sunset in the mountains" />
            <div className="mx-6 my-4">
                <div className="font-bold text-xl ">{props.name}</div>
                <p className="text-grey-darker text-base">
                    {props.descr}
                </p>
            </div>

        </div>
        </Link>
    )
}

const Assets = (props) => {

    const [assets, setassets] = useState([])

    const getAsset = () => {
        console.log(props.accountAd)
        {
            axios.get(serverAdd+ '/assets/user/' + props.accountAd).then((res, err) => {
                if (err) {
                    console.log(err);
                }
                var data = res.data.data;
                console.log({ "asdas": res })
                var item = []
                data.map(asset => {
                    item.push(<Product_card loading={props.loading} setLoading={props.setLoading} id={asset.ownerId} ownerId={asset.ownerId.account_address[0]} assetId={asset.meta.assetId} accountAd={props.accountAd} name={asset.assetName} like={asset.likes} descr={asset.description} imageurl={asset.assetUrl} />)
                })
                setassets(item);

            }).catch(err => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        getAsset()
    }, [])


    return (
        <div className="flex flex-col m-5 my-2">
            <Link to={'/createAsset/'}><button className="bg-blue-400 font-bold w-32 px-3 py-2  rounded m-3" style={{ color: "white" }}>Add Assets</button></Link>
            <div className="flex border-grey-light border ">
                <input className="w-full rounded ml-1" type="text" placeholder="Search..." />
                <button className="bg-grey-lightest border-grey border-l shadow hover:bg-grey-lightest">
                    <span className="w-auto flex justify-end items-center text-grey p-2 hover:text-grey-darkest">
                        <i className="fas fa-search"></i>
                    </span>
                </button>
            </div>


            <div className="flex flex-wrap gap-5 mx-auto justify-evenly">
               
            {assets}


            </div>

        </div>
    )
}


const Activity = (props) => {
    props.activity.map((act, ind)=> {
        if(ind === 0)
            console.log(act)
    })
    return (
        // <div className="m-5 ">
        <div className="overflow-x-auto m-5">
        <table className="table-auto m-5 p-5 bg-gray-50 w-full border-2">
            <thead>
                <tr className="h-20 bg-gray-200">
                    <th>Event</th>
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
            {
                props.activity.map((act, ind) => {
                    return <tr className="h-20 bg-blue-50">
                        <th className="font-light">{act['Event_type'].toString()}</th>
                        <th className="font-light">{act['Asset']['AssetName'].toString()}</th>
                        <th className="font-light">{act['Price'].toString()}</th>
                        <th className="font-light">{act['Quantity'].toString()}</th>
                        <th className="font-light">{act['From'].toString()}</th>
                        <th className="font-light">{act['To'].toString()}</th>
                        <th className="font-light">{act['date'].toString()}</th>
                    </tr>
                })
            }
            </tbody>
        </table>
        </div>
    )
}

const Offers = (props) => {
    props.offers.map((act, ind)=> {
        if(ind === 0)
            console.log(act)
    })
    return (
        // <div className="m-5 ">
        <div className="overflow-x-auto m-5">
        <table className="table-auto m-5 w-full p-5 bg-gray-50 border-2">
            <thead>
                <tr className="h-20 bg-gray-200">
                    <th>Asset</th>
                    <th>Price</th>
                    <th>From</th>
                    <th>Expiration</th>
                </tr>
            </thead>
            <tbody>
            {
                props.offers.map((offer, ind) => {
                    return <tr className="h-20 bg-blue-50">
                        <th className="font-light">{offer['assetDetails']['assetName'].toString()}</th>
                        <th className="font-light">{offer['Price'].toString()}</th>
                        <th className="font-light">{offer['From'].toString()}</th>
                        <th className="font-light">{offer['Expiration_date'].toString()}</th>
                    </tr>
                })
            }
            </tbody>
        </table>
        </div>
    )
}


const Favorite = () => {
    const DisplayCard = ()=>{
        const [cards,setCards] = useState([]);
        useEffect(()=>{
            const fetchAssets = async () =>{
                //Using MockAPI
    
                /*
                const response = assets.get('/assets');
                const data = (await response).data
                const assetData = (await response).data.data
                console.log(assetData);*/
                
                //-------------------
                //Data is direct imported here
                //----------------------
            }
            const asset = favorite.data.Favourite_assets
            setCards(asset)
            fetchAssets();
            console.log(cards);
        },[]);
        return(
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {cards && cards.length > 0 && cards.map((asset,assetIdx) => (<Card data={asset} />))}
            </div>
        )
    }
    return <div className="container mx-auto px-5">
        <DisplayCard/>
    </div>

}


const Profile = () => {

    const [accountAd, setaccountAd] = useState("")
    const [iscreate, setiscreate] = useState(false)
    // const [buffer, setBuffer] = useState(null);
    const [bgipfs, setbgipfs] = useState("");
    const [pfipfs, setpfipfs] = useState("");
    const [loading, setLoading] = useState(false);
    const [userName, setUsername] = useState("");
    const [activity, setActivity] = useState([]);
    const [offers, setOffers] = useState([]);
    function createUser(accAd) {
        axios.get(serverAdd + '/user/' + accAd)
            .then(res => {
                console.log(res)
                if (res.data.data === null) {
                    console.log({
                        "username": "User_" + accAd.substring(accAd.length - 5),
                        "account_address": [accAd],
                        "user_type": "",
                        "bio": "",
                        "email_address": "",
                        "bg_img_url": "https://ipfs.io/ipfs/QmTudZ7p5EftYP3eK9zd7dypdPCBUqLShL3o5w1SfGhnAX",
                        "profile_pic_url": "https://ipfs.io/ipfs/QmaZS9UiC9vbxUaEze3Kt4dCLH74CUCb23YoSfxp1BzM2J",
                        "is_verified": true,
                        "is_deleted": false
                    })
                    axios.post(serverAdd + '/user/',
                        {
                            "username": "User_" + accAd.substring(accAd.length - 5),
                            "account_address": [accAd],
                            "user_type": "",
                            "bio": "",
                            "email_address": "",
                            "bg_img_url": "https://ipfs.io/ipfs/QmTudZ7p5EftYP3eK9zd7dypdPCBUqLShL3o5w1SfGhnAX",
                            "profile_pic_url": "https://ipfs.io/ipfs/QmaZS9UiC9vbxUaEze3Kt4dCLH74CUCb23YoSfxp1BzM2J",
                            "is_verified": true,
                            "is_deleted": false
                        }
                    )
                        .then(res => {
                            console.log(res);
                            setiscreate(true);
                        })
                        .catch(err => { console.log(err) });
                }
                else {
                    setUsername(res.data.data.username)
                }
            })
            .catch(err => { console.log(err) });
    }

    async function enableEthereum() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setaccountAd(account);
        createUser(account);
        console.log(account);
    }

    function login() {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            enableEthereum()
            window.ethereum.on('accountsChanged', function (accounts) {
                window.location.reload()
            })
        }
        // else {
        //     alert("This application requires MetaMask. Get MetaMask ?");
        //     window.location.href = "https://metamask.io/download.html";
        // }
    }

    useEffect(() => {
        //console.log(accountAd);
        if (accountAd != "") {
            axios.get(serverAdd + '/user/' + accountAd).then((res, err) => {
                if (err) {
                    console.log(err);
                }
                else if (res.data.data != null) {
                    var data = res.data.data;
                    setbgipfs(data.bg_img_url)
                    setpfipfs(data.profile_pic_url);
                    console.log(data);
                }
            })
            setActivity(userActivity['data']['activity'])
            setOffers(userOffers['data']['offers'])
        }
    }, [accountAd, iscreate, activity, offers])

    useEffect(() => {
        setActivity(userActivity['data']['activity'])
        setOffers(userOffers['data']['offers'])
    },[activity, offers])

    // let fileSelector = null;
    const [selectedTab, setselectedTab] = useState(0);
    //Background pic handler
    const fileSelectedHandler = (e) => {
        // const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(e.target.files[0])
        reader.onloadend = () => {
            ipfs.add(Buffer(reader.result)).then((res) => {
                setbgipfs('https://ipfs.io/ipfs/' + res.path.toString());
                console.log(res.path);
                axios.put(serverAdd + '/user/' + accountAd,
                    { "account_address": [accountAd], "bg_img_url": 'https://ipfs.io/ipfs/' + res.path.toString() })
                    .then((res, err) => {
                        if (err) {
                            console.log(err);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
            })

        }

    }
    //Profile Pic Handler
    const fileSelectedHandler2 = (e) => {
        // const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(e.target.files[0])
        reader.onloadend = () => {

            ipfs.add(Buffer(reader.result)).then((res) => {
                setpfipfs('https://ipfs.io/ipfs/' + res.path.toString());
                console.log(res.path);
                axios.put(serverAdd + '/user/' + accountAd,
                    { "account_address": [accountAd], "profile_pic_url": 'https://ipfs.io/ipfs/' + res.path.toString() })
                    .then((res, err) => {
                        if (err) {
                            console.log(err);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
            })

        }

    }

    //
    useEffect(() => {
        if (document.getElementById(selectedTab) !== null)
            document.getElementById(selectedTab).classList.add('bg-gray-100')
    })

    const toggleChange = (e) => {
        console.log(e);
        if (e.target.id !== selectedTab) {
            e.target.classList.add('bg-gray-100');
            setselectedTab(e.target.classList[0]);
            document.getElementById(selectedTab).classList.remove('bg-gray-100');
        }

    }

    login();
    console.log(accountAd)
    if (accountAd) {
        console.log(accountAd)
        return (
            <div className="flex flex-col">
                <div className="flex flex-row-reverse h-52 bg-cover" style={{ background: "url(" + bgipfs + ")" }}>

                    <div className="pr-3 py-4">

                        <i className="fas fa-pen-square cursor-pointer" onClick={(e) => document.getElementById('myInput').click()} style={{ fontSize: "40px" }}></i>
                        <input
                            id="myInput"
                            style={{ display: 'none' }}
                            type={"file"}
                            onChange={fileSelectedHandler}

                        />
                    </div>

                </div>
                <div className="flex flex-row-reverse gap-5 pr-5 py-4 relative">
                    <a href="/settings"><i className="fas fa-cog cursor-pointer text-black" style={{ fontSize: "40px" }}></i></a>
                    <i className="fas fa-share-alt-square" style={{ fontSize: "40px" }}></i>
                    <div className="absolute flex flex-col bottom-4 right-1/2 justify-center items-center" style={{ left: "50%" }}>

                        <div className="rounded-full h-32 w-32 flex bg-cover" style={{ backgroundImage: "url(" + pfipfs + ")", justifyContent: "center", alignItems: "flex-end" }} >
                            {/* <div > */}
                            <i className="cursor-pointer" onClick={(e) => document.getElementById('myInput2').click()} style={{ color: "white", fontWeight: "bold", paddingBottom: "10px" }}>Edit</i>
                            <input
                                id="myInput2"
                                style={{ display: 'none' }}
                                type={"file"}
                                onChange={fileSelectedHandler2}

                            />
                            {/* </div> */}
                        </div>
                        <h2>{userName}</h2>
                    </div>
                </div>
                <div className="flex flex-row gap-2 md:gap-10 m-2 md:m-10 font-light" style={{ fontSize: "16px" }}>
                    <div className="0 flex flex-row px-5 py-2 hover rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="0">
                        <i className="0 fas fa-tag"></i>
                        <p className="0 hidden sm:block">Assets</p>
                    </div>
                    <div className="1 flex flex-row px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="1">
                        <i className="1 fas fa-history"></i>
                        <p className="1 hidden sm:block">Activity</p>
                    </div>
                    <div className="2 flex flex-row  px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="2">
                        <i className="2 fas fa-gift"></i>
                        <p className="2 hidden sm:block">Offer</p>
                    </div>
                    <div className="3 flex flex-row  px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="3">
                        <i className="3 far fa-heart"></i>
                        <p className="3 hidden sm:block">Favourite</p>
                    </div>
                    <Button className="4 hidden"><ReferalModal url={referral['data']['ReferralUrls']}/></Button>
                    
                </div>
                <hr />
                {
                    selectedTab === 0 ? <Assets loading={loading} setLoading={setLoading} accountAd={accountAd} /> : null

                }
                {selectedTab === 1 ? <Activity activity={activity}/> : null}
                {selectedTab === 2 ? <Offers offers={offers}/> : null}
                {selectedTab === 3 ? <Favorite />: null}
                {/* <Assets /> */}
                <div className={loading ? "fixed z-10 inset-0 overflow-y-auto" : "hidden"} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom text-center bg-transparent rounded-lg transform transition-all sm:my-8 sm:align-middle">
                            <svg className="animate-spin h-5 w-5 bg-red-500 p-5 ml-12 justify-center" viewBox="0 0 24 24">

                            </svg>
                            <h3>Deleting Asset</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <div className="flex h-screen justify-center items-center">
        {typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask ? null : <RedirectModal />}
        <h1 className="text-center text-3xl">Please Sign in to MetaMask</h1>
    </div>;
}
export default Profile;
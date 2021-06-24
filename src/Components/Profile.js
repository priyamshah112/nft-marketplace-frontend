import React, { useState, useEffect } from 'react';
import '../tailwind.css';
import profile_img from '../Images/profile.PNG'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';
import verifyUser from '../Mock_Api/verifyUser';
const IPFS = require('ipfs-http-client')
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const Product_card = (props) => {
    function deleteAsset(ownerId, assetId){
        console.log(ownerId, assetId)
        axios.delete('http://localhost:5000/api/assets',{
            data:{
                "assetId": assetId,
                "ownerId": ownerId
            }
        }).then((result) => {
            console.log(result.data);
            window.location.href = "/profile";
        }).catch((error) => {
            throw console.log(error);
        })
    }
    return (
        <div className="w-60 rounded flex flex-col justify-between shadow-lg my-2">
            <div className="flex flex-row-reverse m-5 items-center gap-1">
                {props.like}
                <i className="far fa-heart"></i>
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
    )
}

const Assets = (props) => {

    const [assets, setassets] = useState([])

    const getAsset = () => {
        console.log(props.accountAd)
        {
            axios.get('http://localhost:5000/api/assets/user/' + props.accountAd).then((res, err) => {
                if (err) {
                    console.log(err);
                }
                var data = res.data.data;
                console.log({ "asdas": res })
                var item = []
                data.map(asset => {
                    item.push(<Product_card ownerId={asset.ownerId.account_address[0]} assetId={asset.meta.assetId} accountAd={props.accountAd} name={asset.name} like={asset.likes} descr={asset.description} imageurl={asset.assetUrl} />)
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


const Activity = () => {
    return (
        // <div className="m-5 ">

        <table className="table-auto m-5 p-5 bg-gray-50">
            <thead>
                <tr className="bg-gray-200">
                    <th>Event</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>Intro to CSS</td>
                    <td>Adam</td>
                    <td>858</td>
                </tr>
                <tr className="bg-emerald-200">
                    <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
                    <td>Adam</td>
                    <td>112</td>
                </tr>
                <tr>
                    <td>Intro to JavaScript</td>
                    <td>Chris</td>
                    <td>1,280</td>
                </tr> */}
            </tbody>
        </table>
        // </div>
    )
}





const Profile = () => {

    const [accountAd, setaccountAd] = useState("")
    const [buffer, setBuffer] = useState(null);
    const [bgipfs, setbgipfs] = useState("");
    const [pfipfs, setpfipfs] = useState("");


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

    useEffect(() => {
        //console.log(accountAd);
        if (accountAd != "") {
            axios.get('http://localhost:5000/api/user/' + accountAd).then((res, err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var data = res.data.data;
                    setbgipfs(data.bg_img_url)
                    setpfipfs(data.profile_pic_url);
                    console.log(data);
                }
            })
        }
    }, [accountAd])



    let fileSelector = null;
    const [selectedTab, setselectedTab] = useState(0);
    //Background pic handler
    const fileSelectedHandler = (e) => {
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            ipfs.add(Buffer(reader.result)).then((res) => {
                setbgipfs('https://ipfs.io/ipfs/' + res.path.toString());
                console.log(res.path);
                axios.put('http://localhost:5000/api/user/' + accountAd,
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
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {

            ipfs.add(Buffer(reader.result)).then((res) => {
                setpfipfs('https://ipfs.io/ipfs/' + res.path.toString());
                console.log(res.path);
                axios.put('http://localhost:5000/api/user/' + accountAd,
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
        if (e.target.id != selectedTab) {
            e.target.classList.add('bg-gray-100');
            setselectedTab(e.target.id);
            document.getElementById(selectedTab).classList.remove('bg-gray-100');
        }

    }

    login();
    console.log(accountAd)
    if (accountAd) {
        console.log(accountAd)
        return (
            <div className="flex flex-col">
                <div className="flex flex-row-reverse  bg-gray-100 h-52 " id="background" style={{ background: "url(" + bgipfs + ")" }}>

                    <div className="pr-3 py-4">

                        <i className="fas fa-pen-square" onClick={(e) => document.getElementById('myInput').click()} style={{ fontSize: "40px" }}></i>
                        <input
                            id="myInput"
                            style={{ display: 'none' }}
                            type={"file"}
                            onChange={fileSelectedHandler}

                        />
                    </div>

                </div>
                <div className="flex flex-row-reverse gap-5 pr-5 py-4 relative">
                    <i className="fas fa-cog" style={{ fontSize: "40px" }}></i>
                    <i className="fas fa-share-alt-square" style={{ fontSize: "40px" }}></i>
                    <div className="absolute flex flex-col bottom-4 right-1/2 justify-center items-center" style={{ left: "50%" }}>

                        <div className="rounded-full h-32 w-32 flex" style={{ backgroundImage: "url(" + pfipfs + ")", justifyContent: "center", alignItems: "flex-end" }} >
                            {/* <div > */}
                            <i onClick={(e) => document.getElementById('myInput2').click()} style={{ color: "white", fontWeight: "bold", paddingBottom: "10px" }}>Edit</i>
                            <input
                                id="myInput2"
                                style={{ display: 'none' }}
                                type={"file"}
                                onChange={fileSelectedHandler2}

                            />
                            {/* </div> */}
                        </div>
                        <h2>{accountAd}</h2>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap gap-10 m-10 font-light" style={{ fontSize: "16px" }}>
                    <div className="flex flex-row px-5 py-2 hover rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="0">
                        <i className="fas fa-tag"></i>
                        Assets
                    </div>
                    <div className="flex flex-row px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="1">
                        <i className="fas fa-history"></i>
                        Activity
                    </div>
                    <div className="flex flex-row  px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="2">
                        <i className="fas fa-gift"></i>
                        Offer
                    </div>
                    <div className="flex flex-row  px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="3">
                        <i className="far fa-heart"></i>
                        Favourite
                    </div>
                    <div className="flex flex-row  px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="4">
                        <i className="fas fa-dollar-sign"></i>
                        Referrals
                    </div>
                </div>
                <hr />
                {
                    selectedTab == 0 ? <Assets accountAd={accountAd} /> : null

                }
                {selectedTab == 1 ? <Activity /> : null}
                {/* <Assets /> */}
            </div>
        )
    }
    return <div className="flex h-screen justify-center items-center"><h1 className="text-center text-3xl">Please Sign in to MetaMask</h1></div>;
}
export default Profile;
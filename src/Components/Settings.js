import React, { useState, useEffect } from 'react';
import verifyUser from '../Mock_Api/verifyUser';
import axios from 'axios';



const handleSubmit = (e, accountAd) => {
    e.preventDefault();
    var data = { "account_address": [accountAd] }
    if (e.target[0].value != "") {
        data = {
            ...data,
            "username": e.target[0].value

        }
    }
    if (e.target[1].value != "") {
        data = {
            ...data,
            "bio": e.target[1].value,
        }
    }
    if (e.target[2].value != "") {
        data = {
            ...data,
            "email_address": e.target[2].value
        }
    }
    axios.put('http://localhost:5000/api/user/' + accountAd,
        data)
        .then((res, err) => {
            if (err) {
                console.log(err);
            }
        }).catch((err) => {
            console.log(err);
        })

}

const GeneralSettings = (props) => {
    return (
        <div>
            <div className="mx-32 mt-16">
                <p className="text-2xl font-bold">General Settings</p>
                <form onSubmit={(e) => handleSubmit(e, props.accountAd)}>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Username</label>
                    <input id="username" className="rounded-md border-2 border-gray-200 mt-1 pl-2 py-2 w-96 focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Username" type="text"></input>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Bio</label>
                    <textarea id="bio" className="rounded-md border-2 border-gray-200 mt-1 pl-2 py-2 h-20 w-96 focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Bio" type="text"></textarea>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Email</label>
                    <input id="email" className="rounded-md border-2 border-gray-200 mt-1 pl-2 py-2 w-96 focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Email address" type="text"></input>
                    <input className="block bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 rounded cursor-pointer mt-5 mb-2" type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    )
}

const NotificationSettings = () => {
    const [permission, setPermission] = useState(Notification.permission)

    const checkNotification = (e) => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        }
        else if (permission === 'granted') {
            setPermission('default')
        }
        else if (permission !== 'denied' || permission === "default") {
            Notification.requestPermission();
            setPermission('granted')
        }
    }
    return (
        <div>
            <div className="mx-32 mt-16">
                <p className="text-2xl font-bold">Notification Settings</p>
                <form>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Allow Notifications</label>
                    <label className="flex items-center cursor-pointer mt-5">
                        <div className="relative">
                            <input type="checkbox" id="notificationToggle" checked={permission === 'granted'} className="sr-only toggleCheckBox" onChange={(e) => checkNotification(e)} />
                            <div className={"block w-14 h-8 rounded-full " + (permission !== 'denied' ? 'bg-gray-600' : 'bg-gray-200')}></div>
                            <div className="toggle absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}

const WalletSettings = (props) => {

    return (
        <div className="ml-32 mt-20 border-2 rounded-md h-full w-1/2">
            <div className="p-5 text-lg">
                <i className="fas fa-cog mr-3"></i>Settings
            </div>
            <hr></hr>
            <div className="p-5 bg-gray-50">
                <p>Your Wallet Address</p>
                <div className="flex flex-row justify-between mt-5 bg-gray-200 p-2 rounded-md border-2 border-gray-300">
                    <div >{props.accountAd}</div>
                    <div className="justify-self-end text-blue-500 cursor-pointer">Copy</div>
                </div>
                <div className="flex flex-row">
                    <button className="block bg-blue-500 hover:bg-blue-700 text-lg text-white font-light py-2 px-4 rounded cursor-pointer mt-5 mb-2">Add Funds</button>
                    {/* <button className="block border-2 border-blue-500 text-blue-500 hover:shadow-lg text-lg text-white font-light py-2 px-4 rounded cursor-pointer mt-5 mb-2 ml-5">Log Out</button> */}
                </div>
            </div>
        </div>
    )
}

const Settings = () => {

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


    const [selectedOption, setSelectedOption] = useState("General")
    let handleClick = (e) => {
        let option = e.target.id
        if (option === "General")
            setSelectedOption("General")
        else if (option === "Notifications")
            setSelectedOption("Notifications")
        else
            setSelectedOption("Wallet")
    }

    login();
    if (accountAd) {
        return (
            <div className="flex flex-row h-full">
                <div id="sidebar" className="shadow-lg w-1/4 h-screen">
                    <div>
                        <div className="p-5 text-base text-gray-500 font-bold">
                            <i className="fas fa-wallet mr-3"></i>My Wallet
                        </div>
                        <hr />
                        <div id="Wallet" className={"p-5 px-10 text-base text-gray-500 font-bold " + (selectedOption === "Wallet" ? "bg-blue-50" : "bg-gray-100") + " hover:text-black cursor-pointer"}
                            onClick={(e) => { handleClick(e) }}>
                            {accountAd}
                        </div>
                        <hr />
                    </div>
                    <div id="General" className={"p-5 text-base text-gray-500 font-bold " + (selectedOption === "General" ? "bg-blue-50" : "") + " hover:text-black cursor-pointer"}
                        onClick={handleClick}>
                        <i className="fas fa-cog mr-3"></i>General
                    </div>
                    <hr />
                    <div id="Notifications" className={"p-5 text-base text-gray-500 font-bold " + (selectedOption === "Notifications" ? "bg-blue-50" : "") + " hover:text-black cursor-pointer"}
                        onClick={handleClick}>
                        <i className="fas fa-bell mr-5"></i>Notifications
                    </div>
                    <hr />
                </div>
                {selectedOption === "General"
                    ? <GeneralSettings accountAd={accountAd} />
                    : selectedOption === "Notifications"
                        ? <NotificationSettings />
                        : <WalletSettings accountAd={accountAd} />
                }
            </div>
        )
    }
    return <div className="flex h-screen justify-center items-center"><h1 className="text-center text-3xl">Please Sign in to MetaMask</h1></div>;
}

export default Settings
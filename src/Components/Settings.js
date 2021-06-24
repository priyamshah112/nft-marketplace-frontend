import React, { useState, useEffect } from 'react';
import verifyUser from '../Mock_Api/verifyUser';
import axios from 'axios';


const GeneralSettings = (props) => {
    console.log(props)

    function handleSubmit(event){
        event.preventDefault()
        if(event.target.form[0].value.length > 2 && event.target.form[0].value.length < 29 && event.target.form[1] != event.target.form[2] != ""){
            axios.put('http://localhost:5000/api/user/'+props.accountAd,
                    {
                        "username":event.target.form[0].value,
                        "account_address":props.accountAd,
                        "user_type":"verified",
                        "bio":event.target.form[1].value,
                        "email_address":event.target.form[2].value,
                        "bg_img_url":"https://google.com/",
                        "profile_pic_url":"https://google.com/",
                        "is_verified":true,
                        "is_deleted":false
                    }

                // Replace above line by: "ownerId": "6087765dfc13ae34e4000064" for testing 

                ).then((res, err) => {

                    if (err) {
                        console.log(err)
                    }
                    console.log(res);

                }).catch((err) => {
                    console.log(err)
                }
            )
        }
    }

    return (
        <div>
            <div className="mx-32 mt-16">
                <p className="text-2xl font-bold">General Settings</p>
                <form>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Username</label>
                    <input id="username" className="rounded-md border-2 border-gray-200 mt-1 pl-2 py-2 w-96 focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Username" type="text" defaultValue={props.username}></input>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Bio</label>
                    <textarea id="bio" className="rounded-md border-2 border-gray-200 mt-1 pl-2 py-2 h-20 w-96 focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Bio" type="text" defaultValue={props.bio}></textarea>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Email</label>
                    <input id="email" className="rounded-md border-2 border-gray-200 mt-1 pl-2 py-2 w-96 focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Email address" type="text" defaultValue={props.email}></input>
                    <input className="block bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 rounded cursor-pointer mt-5 mb-2" type="submit" value="Submit" onClick={(event)=>handleSubmit(event)}></input>
                </form>
            </div>
        </div>
    )
}

const NotificationSettings = (props) => {
    const [permission, setPermission] = useState(Notification.permission)
    
    const checkNotification = (e) => {
        if (!("Notification" in window)) {
          console.log("This browser does not support desktop notification");
        }
        else if(permission === 'granted' ){
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
                            <input type="checkbox" id="notificationToggle" checked={permission === 'granted'} className="sr-only toggleCheckBox" onChange={(e) => checkNotification(e)}/>
                            <div className={"block w-14 h-8 rounded-full " + (permission !== 'denied'? 'bg-gray-600':'bg-gray-200')}></div>
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
        <div className = "ml-32 mt-20 border-2 rounded-md h-full w-1/2">
            <div className = "p-5 text-lg">
                <i className="fas fa-cog mr-3"></i>Settings
            </div>
            <hr></hr>
            <div className = "p-5 bg-gray-50">
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
    const [user, setUser] = useState({})

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
        else {
            alert("This application requires MetaMask. Get MetaMask ?");
            window.location.href = "https://metamask.io/download.html";
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/' + accountAd.toString())
            .then(response => {
                setUser(response['data']['data'])
            })
    }, [accountAd])


    const [selectedOption, setSelectedOption] = useState("General")
    let handleClick = (e) => {
        let option = e.target.id
        if(option === "General")
            setSelectedOption("General")
        else if(option === "Notifications")
            setSelectedOption("Notifications")
        else
            setSelectedOption("Wallet")
    }
    
    login();
    if(accountAd){
        return (
                <div className="flex flex-row h-full">
                    <div id="sidebar" className="shadow-lg w-1/4 h-screen">
                        <div>
                            <div className="p-5 text-base text-gray-500 font-bold">
                                <i className="fas fa-wallet mr-3"></i>My Wallet
                            </div>
                            <hr/>
                            <div id="Wallet" className={"p-5 px-10 text-base text-gray-500 font-bold " + (selectedOption === "Wallet" ? "bg-blue-50":"bg-gray-100") + " hover:text-black cursor-pointer"}
                                onClick={(e) => {handleClick(e)}}>
                                {accountAd}
                            </div>
                            <hr/>
                        </div>
                        <div id="General" className={"p-5 text-base text-gray-500 font-bold " + (selectedOption === "General" ? "bg-blue-50":"") + " hover:text-black cursor-pointer"}
                            onClick={handleClick}>
                            <i className="fas fa-cog mr-3"></i>General
                        </div>
                        <hr/>
                        <div id="Notifications" className={"p-5 text-base text-gray-500 font-bold " + (selectedOption === "Notifications" ? "bg-blue-50":"") + " hover:text-black cursor-pointer"}
                            onClick={handleClick}>
                            <i className="fas fa-bell mr-5"></i>Notifications
                        </div>
                        <hr/>
                    </div>
                    {selectedOption === "General"
                        ? <GeneralSettings username={user['username']} bio={user['bio']} email={user['email_address']} accountAd={user['account_address']}/>
                        : selectedOption === "Notifications" 
                            ? <NotificationSettings />
                            : <WalletSettings accountAd={accountAd}/>
                    }
                </div>
        )
    }
    return <div className="flex h-screen justify-center items-center"><h1 className="text-center text-3xl">Please Sign in to MetaMask</h1></div>;
}

export default Settings
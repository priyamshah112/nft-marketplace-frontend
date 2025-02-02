import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RedirectModal from './RedirectModal';

const GeneralSettings = (props) => {
    console.log(props)
    const [username, setUsername] = useState(props.username)

    function handleSubmit(event){
        event.preventDefault()
        if(event.target.form[0].value.length > 2 && event.target.form[0].value.length < 29 && event.target.form[1] !== event.target.form[2] !== ""){
            axios.put('https://nft-api-1.herokuapp.com/api/user/'+props.accountAd,
                    {
                        "username":event.target.form[0].value,
                        "account_address":props.accountAd,
                        "bio":event.target.form[1].value,
                        "email_address":event.target.form[2].value
                    }

                // Replace above line by: "ownerId": "6087765dfc13ae34e4000064" for testing 

                ).then((res, err) => {

                    if (err) {
                        console.log(err)
                    }
                    console.log(res);
                    window.location.href = "/profile"

                }).catch((err) => {
                    console.log(err)
                }
            )
        }
        else{
            console.log("Invalid username")
        }
    }

    return (
        <div>
            <div className="mx-10 mt-10 md:mx-32 md:mt-16">
                <p className="text-2xl font-bold">General Settings</p>
                <form>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Username</label>
                    <input id="username" className={"rounded-md border-2 mt-1 pl-2 py-2 w-60 md:w-96 " + (username == null ? "border-gray-200" : username.length > 2 && username.length < 19 ? "border-gray-200" : "border-red-700") + " focus:shadow-lg focus:border-none focus:outline-none"} placeholder="Enter Username" type="text" defaultValue={props.username} onChange={(event) => setUsername(event.target.value)}></input>
                    <div className={"mt-1 text-red-500 text-sm " + (username == null ? "hidden" : username.length > 2 && username.length < 19 ? "hidden" : "")}>Length of username should be from 3 to 28</div>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Bio</label>
                    <textarea id="bio" className="rounded-md border-2 border-gray-200 mt-1 pl-2 py-2 h-20 w-60 md:w-96 focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Bio" type="text" defaultValue={props.bio}></textarea>
                    <label className="block text-gray-600 text-md font-bold mt-5 mb-2">Email</label>
                    <input id="email" className="rounded-md border-2 border-gray-200 mt-1 pl-2 py-2 w-60 md:w-96 focus:shadow-lg focus:border-none focus:outline-none" placeholder="Enter Email address" type="text" defaultValue={props.email}></input>
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
            <div className="mx-10 mt-10 md:mx-32 md:mt-16">
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
        <div className = "ml-10 mt-8 border-2 rounded-md h-full w-4/6 md:mt-20 md:w-3/5 md:ml-32">
            <div className = "p-5 text-lg">
                <i className="fas fa-cog mr-3"></i>Settings
            </div>
            <hr></hr>
            <div className = "p-5 bg-gray-50">
                <p>Your Wallet Address</p>
                <div className="flex flex-row justify-between mt-5 bg-gray-200 p-2 rounded-md border-2 border-gray-300">
                    <input id="accountAd" className="overflow-hidden bg-gray-200 w-full" type="text" value={props.accountAd} readOnly></input>
                    <div className="justify-self-end text-blue-500 cursor-pointer" onClick={() => {
                        var copyText = document.querySelector("#accountAd");
                        copyText.select();
                        document.execCommand("copy");                      
                    }}>Copy</div>
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
    const [iscreate, setiscreate] = useState(false)
    const [user, setUser] = useState({})

    function createUser(accAd) {
        axios.get('https://nft-api-1.herokuapp.com/api/user/' + accAd)
        .then(res => {
            console.log(res)
            if(res.data.data === null){
                console.log({
                    "username":"User_" + accAd.substring(accAd.length - 5),
                    "account_address":[accAd],
                    "user_type":"",
                    "bio":"",
                    "email_address":"",
                    "bg_img_url":"https://ipfs.io/ipfs/QmTudZ7p5EftYP3eK9zd7dypdPCBUqLShL3o5w1SfGhnAX",
                    "profile_pic_url":"https://ipfs.io/ipfs/QmaZS9UiC9vbxUaEze3Kt4dCLH74CUCb23YoSfxp1BzM2J",
                    "is_verified":true,
                    "is_deleted":false
                })
                axios.post('https://nft-api-1.herokuapp.com/api/user/',
                    {
                        "username":"User_" + accAd.substring(accAd.length - 5),
                        "account_address":[accAd],
                        "user_type":"",
                        "bio":"",
                        "email_address":"",
                        "bg_img_url":"https://ipfs.io/ipfs/QmTudZ7p5EftYP3eK9zd7dypdPCBUqLShL3o5w1SfGhnAX",
                        "profile_pic_url":"https://ipfs.io/ipfs/QmaZS9UiC9vbxUaEze3Kt4dCLH74CUCb23YoSfxp1BzM2J",
                        "is_verified":true,
                        "is_deleted":false
                    }
                )
                .then(res => {
                    console.log(res);
                    setiscreate(true);
                })
                .catch(err => {console.log(err)} );
            }
        })
        .catch(err => {console.log(err)} );
    }

    async function enableEthereum() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setaccountAd(account);
        createUser(account);
        console.log(account);
    }
    
    function login() {
        if(typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
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
        axios.get('https://nft-api-1.herokuapp.com/api/user/' + accountAd.toString())
            .then(response => {
                if (response.data.data != null) {
                    setUser(response['data']['data'])
                }
                else {
                    setUser(
                        {
                            "username":"User_" + accountAd.substring(accountAd.length - 5),
                            "account_address":[accountAd],
                            "user_type":"",
                            "bio":"",
                            "email_address":"",
                            "bg_img_url":"https://ipfs.io/ipfs/QmTudZ7p5EftYP3eK9zd7dypdPCBUqLShL3o5w1SfGhnAX",
                            "profile_pic_url":"https://ipfs.io/ipfs/QmaZS9UiC9vbxUaEze3Kt4dCLH74CUCb23YoSfxp1BzM2J",
                            "is_verified":true,
                            "is_deleted":false
                        }
                    )
                }
            })
            .catch(err => {console.log(err)} );
    }, [accountAd, iscreate])


    const [selectedOption, setSelectedOption] = useState("General")
    let handleClick = (e) => {
        let option = e.target.classList
        console.log(option)
        if(option.contains("General"))
            setSelectedOption("General")
        else if(option.contains("Notifications"))
            setSelectedOption("Notifications")
        else if(option.contains("Wallet"))
            setSelectedOption("Wallet")
    }
    
    login();
    if(accountAd){
        return (
                <div className="flex flex-row h-full">
                    <div id="sidebar" className="shadow-lg w-1/4 h-screen max-w-min">
                        <div>
                            <div className={"Wallet p-5 text-base text-gray-500 font-bold flex flex-row " + (selectedOption === "Wallet" ? "bg-blue-50 md:bg-white":"")}
                                onClick={(e) => {handleClick(e)}}>
                                <i className="Wallet fas fa-wallet mt-1" onClick={(e) => {handleClick(e)}}></i><div className="Wallet hidden ml-4 md:block" onClick={(e) => {handleClick(e)}}>My Wallet</div>
                            </div>
                            <hr/>
                            <div className={"Wallet p-5 text-base text-gray-500 font-bold overflow-hidden hidden md:block " + (selectedOption === "Wallet" ? "bg-blue-50":"bg-gray-100") + " hover:text-black cursor-pointer"}
                                onClick={(e) => {handleClick(e)}}>
                                {accountAd}
                            </div>
                            <hr/>
                        </div>
                        <div id="General" className={"General p-5 text-base text-gray-500 font-bold flex flex-row " + (selectedOption === "General" ? "bg-blue-50":"") + " hover:text-black cursor-pointer"}
                            onClick={(e) => handleClick(e)}>
                            <i className="General fas fa-cog mt-1" onClick={(e) => {handleClick(e)}}></i><div className="General hidden ml-4 md:block" onClick={(e) => {handleClick(e)}}>General</div>
                        </div>
                        <hr/>
                        <div id="Notifications" className={"Notifications p-5 text-base text-gray-500 font-bold flex flex-row " + (selectedOption === "Notifications" ? "bg-blue-50":"") + " hover:text-black cursor-pointer"}
                            onClick={(e) => handleClick(e)}>
                            <i className="Notifications fas fa-bell mt-1" onClick={(e) => {handleClick(e)}}></i><p className="Notifications hidden ml-5 md:block" onClick={(e) => {handleClick(e)}}>Notifications</p>
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
    return  <div className="flex h-screen justify-center items-center">
                {typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask ? null : <RedirectModal/> }
                <h1 className="text-center text-3xl">Please Sign in to MetaMask</h1>
            </div>;
}

export default Settings
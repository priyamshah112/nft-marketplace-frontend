import React, { useState, useEffect } from 'react';
import Profile from './Profile'
import LoadingIndicator from './LoadingIndicator'
import Metamask from '../Images/metamask.png'
import '../tailwind.css';
import verifyUser from '../Mock_Api/verifyUser';
import { trackPromise } from 'react-promise-tracker';
import  { Redirect } from 'react-router-dom'





const Login = () => {
    let signInText = "Get a MetaMask"
    let selector = false
    const[loading,setLoading]=useState(true)
    const[accountAd,setAccountAd]=useState(" ")
    console.log(window.ethereum)
    if (typeof window.ethereum !== 'undefined') {
        signInText = "Sign In"
        selector = true
        console.log('MetaMask is installed!');
    } else {
        selector = false
        console.log("metamask not installed !")
    }
    const VerifyUser = async (account)=>{
        // const response = verifyUser.post(`/auth/verifyUser/${account}`);
        // const data = (await response).data.data;
        // console.log(data);
        verifyUser.post(`/auth/verifyUser/${account}`)
            .then(response=>{
                const data = response.data.data
                setAccountAd(data.account_address[0]);
                console.log(accountAd)
                setLoading(false)
                console.log(loading)
            }
            )
            .catch(err=>{
                console.log(err)
                setLoading(true)
            })
    }
    const getHref = () => {
        window.location.href = "https://metamask.io/download.html"
    }
    async function enableEthereum() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        // console.log(account)
        // setAccount(account)
        VerifyUser(account);
        
    }
    return (
        <div>
            <div className="text-center pt-8">
                <div className="text-3xl font-bold py-3 w-1/3 mx-auto">You need an Ethereum wallet to use ArtChange.</div>
                <img className="mx-auto mb-4 py-4" src={Metamask} alt="MetaMask" width="150px" height="150px"></img>
                <button id="sign-in" onClick={() => selector ? enableEthereum() : getHref()} className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 rounded">
                    {signInText}
                </button>
            </div>
            {loading?<LoadingIndicator/>:<Redirect to="/profile" account={accountAd}/>}
        </div>
        
    )
}

export default Login;
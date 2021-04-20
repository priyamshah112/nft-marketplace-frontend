import React,{useState,useEffect} from 'react';
import Metamask from '../Images/metamask.png'
import '../tailwind.css';

const Login = ()=>{
    // const[signInText,setSignIn] = useState('Get a MetaMask');
    // if (typeof window.ethereum !== 'undefined') {
    //     useEffect(() => {
    //         setSignIn("Sign in")
    //     })
    //     console.log('MetaMask is installed!');
    // }else{
    //     useEffect(()=>{
    //         setSignIn("Get a MetaMask")
    //     })
    // }
    let signInText = "Get a MetaMask"
    let selector = false
    console.log(window.ethereum)
    if (typeof window.ethereum !== 'undefined') {
        signInText="Sign In"
        selector=true
        console.log('MetaMask is installed!');
    }else{
        selector=false
        console.log("metamask not installed !")
    }
    const getHref = ()=>{
        window.location.href="https://metamask.io/download.html"
    }
    async function enableEthereum(){
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account)
    }
    return(
        <div>
            <div className="text-center pt-5">
                <div className="text-3xl font-bold py-3 w-1/3 mx-auto">You need an Ethereum wallet to use ArtChange.</div>
                <img className="mx-auto mb-4 py-4" src={Metamask} alt="MetaMask" width="150px" height="150px"></img>
                <button id="sign-in" onClick={()=>selector?enableEthereum():getHref()}   className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 rounded">
                    {signInText}
                </button>    
            </div>
        </div>
    )
}

export default Login ;
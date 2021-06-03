//======================================================================================
// THIS FILE IS FOR REFERENCE TO IMPLEMENT LOGIN FLOW
//======================================================================================

import verifyUser from '../Mock_Api/verifyUser';

const your_component = () => {
    
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
        else {
            alert("This application requires MetaMask. Get MetaMask ?");
            window.location.href = "https://metamask.io/download.html";
        }
    }

    useEffect(() => {  }, [accountAd])

    login(); // call login method before return block
    if(accountAd){
        return (<div>Return block of your component will come here</div>)
    }
    return <div className="flex h-screen justify-center items-center"><h1 className="text-center text-3xl">Please Sign in to MetaMask</h1></div>;
}
 
export default your_component;
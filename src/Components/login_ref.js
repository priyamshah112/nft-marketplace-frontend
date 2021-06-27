//======================================================================================
// THIS FILE IS FOR REFERENCE TO IMPLEMENT LOGIN FLOW
//======================================================================================

// import verifyUser from '../Mock_Api/verifyUser';

const your_component = () => {
    
    const [accountAd, setaccountAd] = useState("")
    const [iscreate, setiscreate] = useState(false)

    // const VerifyUser = async (account)=>{
    //     verifyUser.post(`/auth/verifyUser/${account}`)
    //         .then(response=>{ 
    //             //console.log(response.data.data) 
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //         })
    // }
    
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
                    setiscreate(true); // can be used in useEffect to observe if user is created
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
        // VerifyUser(account);
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
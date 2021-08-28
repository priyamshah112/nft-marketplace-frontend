const Web3 = require("web3");
const AssetContract = require("../contracts/NFTOriginalsContract.json");

let acct;
// var gas = 4712388;
// var gasPrice = 10000000000;
let assetContractAddress;
// let ropstenInfuraUrl = "https://ropsten.infura.io/v3/8d012749a8ae4ca1a238b25053109ffe";

export const getWeb3 = async () => {
  //uncomment to use rinkeby
  if (!window.ethereum) {
    return "ERROR: please login to metamask";
  } else {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    acct = accounts[0];
    // console.log(accounts);
    // const web3 = new Web3(provider);

    //uncomment to use ganache
    //   const web3 = new Web3("http://localhost:7545");
    //   const accounts = await web3.eth.getAccounts();
    //   owner = accounts[0]
    //   user1 = accounts[1]
    //   user2 = accounts[2]
    //   payer = accounts[4]

    //returns final web3
    return web3;
  }
};

// returns the CrashGameContract instance from the deployed network
const getNFTInstance = async () => {
  const web3 = await getWeb3();
  const networkId = await web3.eth.net.getId();
  assetContractAddress = AssetContract.networks[80001].address;
  const assetContract = new web3.eth.Contract(
    AssetContract.abi,
    assetContractAddress
  );
  return assetContract;
};

// fetches the crash game status for a gamehash
const mintToken = async (tokenURI) => {
  try {
    const nftToken = await getNFTInstance();

    let tokenId = await nftToken.methods
      .createNftToken(tokenURI)
      .send({ from: acct, value: Web3.utils.toWei("0.001") })
      .then(function (data) {
        console.log("data:", data);
        let r = data.events.Transfer.returnValues.tokenId;
        console.log("nftToken.methods.data:", r);
        return r;
      })
      .catch((err) => {
        console.log("Error in nft token create: ", err);
        return {
          status: false,
          tokenId: "",
        };
      });

    console.log("TokenId generated:", tokenId);
    console.log(
      "=> Fetching the minted tokenURI for holder1: ",
      await nftToken.methods.tokenURI(tokenId).call()
    );

    return {
      status: true,
      tokenId: tokenId,
    };

  } catch (err) {
    console.log("Error in nft token create: ", err);
    return {
      status: false,
      tokenId: "",
    };
  }
};
const buyToken = async (assetData) => {
  try {
    const nftToken = await getNFTInstance();

    let tokenId = await nftToken.methods
      .createNftToken(assetData.assetJsonUrl)
      .send({ from: acct, value: Web3.utils.toWei("0.001") })
      .then(function (data) {
        console.log("data:", data);
        let r = data.events.Transfer.returnValues.tokenId;
        console.log("nftToken.methods.data:", r);
        return r;
      })
      .catch((err) => {
        console.log("Error in nft token create: ", err);
        return {
          status: false,
          tokenId: "",
        };
      });

    console.log("TokenId generated:", tokenId);
    console.log(
      "=> Fetching the minted tokenURI for holder1: ",
      await nftToken.methods.tokenURI(tokenId).call()
    );

    return {
      status: true,
      tokenId: tokenId,
    };
    
  } catch (err) {
    console.log("Error in nft token create: ", err);
    return {
      status: false,
      tokenId: "",
    };
  }
};
// sets crashGame hash
const getTokenURI = async (tokenId) => {
  try {
    const nftToken = await getNFTInstance();
    let tokenURI = await nftToken.methods.tokenURI(tokenId).call();

    return {
      status: true,
      tokenURI: tokenURI,
    };
  } catch (err) {
    //throw error in json response with status 500.
    return {
      status: true,
      error: err.data,
    };
  }
};

export default { getWeb3, mintToken, buyToken, getTokenURI };
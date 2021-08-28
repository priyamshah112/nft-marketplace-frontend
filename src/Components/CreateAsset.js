import React, { useState, useEffect } from "react";
import Popup1 from "./Popup";
import axios from "axios";
// import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
// import { render } from "@testing-library/react";
// import web3lib from "./web3lib";
import * as db from "./database";

const IPFS = require("ipfs-http-client");
const ipfs = IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
let baseURL = process.env.REACT_APP_SERVER;
let ipfsbaseURL = "https://ipfs.io/ipfs/";

const CreateAsset = () => {
  const [unlockableContent, setunlockableContent] = useState(-1);
  const [buffer, setBuffer] = useState(null);
  const [ipfsHash, setIPFSHash] = useState(
    "QmViUFY5g6JzKCa2HA9dYtY864YsHqFQaryAJhm2NijUti"
  );
  const [redirect, setredirect] = useState(null);

  // const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);
  const [properties, setproperties] = useState([]);
  const [level, setlevel] = useState([]);
  const [stats, setstats] = useState([]);
  const [category, setcategory] = useState("Art");

  //LOGIN  ==============================

  const [accountAd, setaccountAd] = useState("");
  const [iscreate, setiscreate] = useState(false);

  function createUser(accAd) {
    axios
      .get(baseURL + "/user/" + accAd)
      .then((res) => {
        if (res.data.data == null) {
          axios
            .post(baseURL + "/user/", {
              username: "User_" + accAd.substring(accAd.length - 5),
              account_address: [accAd],
              user_type: "",
              bio: "",
              email_address: "",
              bg_img_url:
                "https://ipfs.io/ipfs/QmTudZ7p5EftYP3eK9zd7dypdPCBUqLShL3o5w1SfGhnAX",
              profile_pic_url:
                "https://ipfs.io/ipfs/QmaZS9UiC9vbxUaEze3Kt4dCLH74CUCb23YoSfxp1BzM2J",
              is_verified: true,
              is_deleted: false,
            })
            .then((res) => {
              setiscreate(true);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function enableEthereum() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setaccountAd(account);
    createUser(account);
  }

  function login() {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      enableEthereum();
      window.ethereum.on("accountsChanged", function (accounts) {
        window.location.reload();
      });
    }
  }

  useEffect(() => {}, [accountAd]);

  //=====================================

  const uploadImage = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  };

  // const updateValue = (event, name) => {
  //   `${name}` = event.target.value;
  // };

  useEffect(() => {
    if (buffer != null)
      ipfs.add(buffer).then((res) => {
        setIPFSHash(res.path);
      });
  }, [buffer]);

  useEffect(() => {
    // updatePropertyTag()
  }, [properties, stats, level]);

  useEffect(() => {
    return <Redirect to={baseURL.replace('/api', '')+redirect} />;
  }, [redirect]);

  const updatePropertyTag = () => {
    if (properties.length !== 0) {
      var tag = [];
      var data = properties[0];
      for (var i = 0; i < data.length; i++) {
        // var data = properties[i];
        tag.push(
          <button
            type="button"
            className="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold"
            style={{
              color: "rgb(32, 129, 226)",
              borderWidth: "1px",
              fontSize: "13px",
              outline: "none",
            }}
          >
            {data[i].name}:{data[i].value}
          </button>
        );
      }
      return tag;
    }
  };
  const updateLevelTag = () => {
    if (level.length !== 0) {
      var tag = [];
      var data = level[0];
      for (var i = 0; i < data.length; i++) {
        // var data = properties[i];
        tag.push(
          <button
            type="button"
            className="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold"
            style={{
              color: "rgb(32, 129, 226)",
              borderWidth: "1px",
              fontSize: "13px",
              outline: "none",
            }}
          >
            {data[i].name}:{data[i].value} to {data[i].max}
          </button>
        );
      }
      return tag;
    }
  };
  const updateStatsTag = () => {
    if (stats.length !== 0) {
      var tag = [];
      var data = stats[0];
      for (var i = 0; i < data.length; i++) {
        // var data = properties[i];
        tag.push(
          <button
            type="button"
            className="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold"
            style={{
              color: "rgb(32, 129, 226)",
              borderWidth: "1px",
              fontSize: "13px",
              outline: "none",
            }}
          >
            {data[i].name}:{data[i].value} to {data[i].max}
          </button>
        );
      }
      return tag;
    }
  };
  const categoryType = {
    Art: "art",
    Music: "music",
    "Domain Name": "domain_names",
    Sports: "sports",
    "Virtual Card": "virtual_Worlds",
    "Trading Card": "trading_Cards",
    Collectibles: "collectibles",
    GIFS: "gifs",
    Memes: "memes",
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      let userData = {
        ownerId: accountAd,
        asset: {
          assetUrl: "https://ipfs.io/ipfs/" + ipfsHash,
          category: categoryType[event.target.form[3].value],
          assetName: event.target.form[1].value,
          assetMime: "image/png",
          description: event.target.form[2].value,
          private: false,
          properties: properties.length === 0 ? [] : properties[0],
          stats: stats.length === 0 ? [] : stats[0],
          levels: level.length === 0 ? [] : level[0],
        },
      };

      if (
        event.target.form[1].value.length > 2 &&
        event.target.form[1].value.length < 19
      ) {
        const nftJson = {
          name: userData.asset.assetName,
          description: userData.asset.description,
          image: ipfsbaseURL + ipfsHash,
          external_url: "https://nft-frontend.herokuapp.com/",
          attributes: [
            {
              trait_type: "stats",
              value: userData.asset.stats,
            },
            {
              trait_type: "levels",
              value: userData.asset.levels,
            },
          ],
        };
        const data = JSON.stringify(nftJson);

        const added = await ipfs.add(data);
        const jsonurl = `https://ipfs.infura.io/ipfs/${added.path}`;
        /* after file is uploaded to IPFS, pass the URL to save it on Polygon */

        // let result = await web3lib.mintToken(jsonurl);
        if (jsonurl) {
          // get tokenId of minted token
        //   let tokenId = result.tokenId;

        //   //update userData with tokenId and assetJsonUrl
        //   userData.asset.isMinted = true;
        //   userData.asset.tokenId = tokenId;
          userData.asset.assetJsonUrl = jsonurl;

          // updated db with the asset and tokenId
          let dbstatus = await db.updateDBwithToken(userData, nftJson);
          if (dbstatus.status) {
            console.log('Success: DB updated success');
            // setredirect("/");
            setLoading(false);
            window.location.href = "/profile";
          }
          else {
                console.log('ERROR: failed to updated DB');
                // set loading finished
                setLoading(false);
          }
        } 
        // if (result.status) {
        //   // get tokenId of minted token
        //   let tokenId = result.tokenId;

        //   //update userData with tokenId and assetJsonUrl
        //   userData.asset.isMinted = true;
        //   userData.asset.tokenId = tokenId;
        //   userData.asset.assetJsonUrl = jsonurl;

        //   // updated db with the asset and tokenId
        //   let dbstatus = await db.updateDBwithToken(userData, nftJson);
        //   if (dbstatus.status) {
        //     setredirect("/");
        //     setLoading(false);
        //   }
        //   else {
        //         console.log('ERROR: failed to updated DB');
        //         // set loading finished
        //         setLoading(false);
        //   }
        // } 
        else {
          console.log("Unable to mint token:");
        }
      } else {
        console.log("Invalid asset name provided");
      }
      
    } catch (error) {
      console.log("Error while creating asset: ", error);
    }
    setLoading(false);
  };

  const getMetaMask = (event) => {
    event.preventDefault();
    if (typeof window.ethereum == "undefined" || !window.ethereum.isMetaMask) {
      //alert("This application requires MetaMask. Get MetaMask ?");
      //window.location.href = "https://metamask.io/download.html";
      window.location.href = "/profile";
    } else {
      alert("Please log in to MetaMask");
      window.location.reload();
    }
  };
  const [assetName, setAssetName] = useState(null);
  return (
    <div className="m-5 sm:m-10 sm:ml-96 sm:mr-96">
      <h1 className="text-3xl mt-10">Create new item</h1>
      <form>
        <p className="mt-2 font-bold">Image, Video, Audio, or 3D Model</p>
        <p className="mt-1 text-gray-400">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 40 MB
        </p>
        <label className="cursor-pointer" for="upload-asset">
          <div className="border-2 border-gray-200 w-96 h-60 mt-2 rounded-md border-dashed">
            <img
              className="m-2 p-2 h-full self-center"
              src={"https://ipfs.io/ipfs/" + ipfsHash}
            />
          </div>
        </label>
        <input
          className="opacity-0 absolute -z-10"
          id="upload-asset"
          type="file"
          onChange={uploadImage}
        ></input>
        <label className="block mt-4 font-bold">Name *</label>
        <input
          className={
            "rounded-md border-2 mt-2 pl-2 py-2 w-full focus:shadow-lg focus:border-none focus:outline-none " +
            (assetName == null
              ? "border-gray-200"
              : assetName.length > 2 && assetName.length < 19
              ? "border-gray-200"
              : "border-red-500")
          }
          type="text"
          onChange={(event) => setAssetName(event.target.value)}
        ></input>
        <div
          className={
            "mt-1 text-red-500 text-sm " +
            (assetName == null
              ? "hidden"
              : assetName.length > 2 && assetName.length < 19
              ? "hidden"
              : "")
          }
        >
          Length of asset name should be from 3 to 18
        </div>
        <label className="block mt-4 font-bold">Description</label>
        <p className="mt-1 text-gray-400">
          The description will be included on the item's detail page underneath
          its image.
        </p>
        <textarea
          className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 h-20 w-full focus:shadow-lg focus:border-none focus:outline-none"
          type="text"
        ></textarea>
        <div className="flex flex-row py-4 price justify-between">
          <div className="flex flex-col gap-5">
            <div className="heading" style={{ fontWeight: "bold" }}>
              Category
            </div>
            <div className="normal" style={{ color: "rgb(158, 158, 158)" }}>
              Select category of your asset
            </div>
          </div>
          <div className="input">
            {/* <input  placeholder="Amount"></input> */}
            <select
              className="p-3 rounded-md bg-gray-50 border-2"
              id="cars"
              value={category}
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            >
              <option value="Art">Art</option>
              <option value="Music">Music</option>
              <option value="Domain Name">Domain Name</option>
              <option value="Sports">Sports</option>
              <option value="Virtual Card">Virtual Card</option>
              <option value="Trading Card">Trading Card</option>
              <option value="Collectibles">Collectibles</option>
              <option value="GIFS">GIFS</option>
              <option value="Memes">Memes</option>
            </select>
          </div>
        </div>
        <div className="mt-2 flex flex-column w-full">
          <i className="p-1 mt-2 fas fa-list-ul"></i>
          <div>
            <p className="ml-4 font-bold">Properties</p>
            <p className="mt-1 ml-4 font-light">Textual traits</p>
          </div>
          <button
            type="button"
            className="m-auto mr-2 border-2 border-blue-500 px-3 py-2 rounded-md hover:shadow-lg focus:outline-none"
          >
            <Popup1
              choice={1}
              properties={properties}
              setproperties={(value) => setproperties(value)}
            />
          </button>
        </div>

        {/* <button type="button" className="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold" style={{ color: "rgb(32, 129, 226)", borderWidth: "1px", fontSize: "13px", outline: "none" }}>Ass</button> */}

        {updatePropertyTag()}

        <hr className="mt-4" />
        <div className="mt-2 flex flex-column w-full">
          <i className="p-1 mt-2 fas fa-star"></i>
          <div>
            <p className="ml-4 font-bold">Levels</p>
            <p className="mt-1 ml-4 font-light">
              Numerical traits that show as progress bars
            </p>
          </div>
          <button
            type="button"
            className="m-auto mr-2 border-2 border-blue-500 px-3 py-2 rounded-md hover:shadow-lg focus:outline-none"
          >
            <Popup1
              choice={2}
              properties={level}
              setproperties={(value) => setlevel(value)}
            />
          </button>
        </div>
        {updateLevelTag()}
        <hr className="mt-4" />
        <div className="mt-2 flex flex-column w-full">
          <i className="p-1 mt-2 fas fa-signal"></i>
          <div>
            <p className="ml-4 font-bold">Stats</p>
            <p className="mt-1 ml-4 font-light">
              Numerical traits that show as numbers
            </p>
          </div>
          <button
            type="button"
            className="m-auto mr-2 border-2 border-blue-500 px-3 py-2 rounded-md hover:shadow-lg focus:outline-none"
          >
            <Popup1
              choice={3}
              properties={stats}
              setproperties={(value) => setstats(value)}
            />
          </button>
        </div>
        {updateStatsTag()}

        <label className="block mt-4 font-bold">Unlockable content</label>
        <div
          className="flex flex-row justify-between align-items-center"
          style={{ alignItems: "center" }}
        >
          <p className="mt-1 text-gray-400">
            Include unlockable content that can only be revealed by the owner of
            the item.
          </p>
          <form>
            <label className="flex items-center cursor-pointer mt-5">
              <div className="relative">
                <input
                  type="checkbox"
                  id="notificationToggle"
                  className="sr-only toggleCheckBox"
                  onChange={() => {
                    setunlockableContent(unlockableContent * -1);
                  }}
                />
                <div
                  className={
                    "block w-14 h-8 rounded-full " +
                    (unlockableContent == -1 ? "bg-gray-600" : "bg-gray-200")
                  }
                ></div>
                <div className="toggle absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
            </label>
          </form>
        </div>
        {unlockableContent == 1 ? (
          <textarea
            className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 h-20 w-full focus:shadow-lg focus:border-none focus:outline-none"
            type="text"
          ></textarea>
        ) : null}
        <label className="block mt-4 font-bold">Supply *</label>

        <p className="mt-1 text-gray-400">
          The number of copies that can be minted. No gas cost to you!
          Quantities above one coming soon.
        </p>
        <input
          value="1"
          className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 w-full focus:shadow-lg focus:border-none focus:outline-none"
          type="text"
        ></input>
        <hr className="mt-4" />
        <label className="block mt-4 font-bold">Max Price*</label>

        <p className="mt-1 text-gray-400">
          Maximum price for which a user can buy it directly without auction. 
        </p>
        <input
          value="0.001"
          className="rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 w-full focus:shadow-lg focus:border-none focus:outline-none"
          type="text"
        ></input>
        <hr className="mt-4" />
        {login()}
        {accountAd ? (
          <div className="w-full mt-8">
            <input
              type="Submit"
              className="bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 hover:shadow-lg"
              value="Create"
              onClick={(event) => handleSubmit(event)}
            ></input>
          </div>
        ) : (
          <div className="w-full mt-8">
            <input
              type="Submit"
              className="bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600 hover:shadow-lg"
              value="Create"
              onClick={getMetaMask}
            ></input>
          </div>
        )}
        <br />
        <br />
      </form>

      <div
        className={loading ? "fixed z-10 inset-0 overflow-y-auto" : "hidden"}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom text-center bg-transparent rounded-lg transform transition-all sm:my-8 sm:align-middle">
            <svg
              className="animate-spin h-5 w-5 bg-red-500 p-5 ml-12 justify-center"
              viewBox="0 0 24 24"
            ></svg>
            <h3>Generating Asset</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAsset;

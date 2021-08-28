import React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as db from "./database";
import web3lib from "./web3lib";

//Import mock get_asset_by_id api
// import get_asset_byId from "../Mock_Api/get_asset_byId1.json";
// import * as assetsUtil from "../Mock_Api/assets";

import individualAssetOnAuction from "../Mock_Api/individual_asset_on_auction_1.json";
import offersOnAsset from "../Mock_Api/offers_on_asset.json";
import assetTradingHistory from "../Mock_Api/asset_trading_history.json";
import PlaceBidModal from "./PlaceBid";

// const serverAdd = process.env.SERVER;
const serverAdd = process.env.REACT_APP_SERVER;

const Product_card = (props) => {
  return (
    <div className="rounded flex flex-col justify-between shadow-md my-2">
      <div className="flex flex-row-reverse m-5 items-center gap-1">
        {props.like}
        <i className="far fa-heart"></i>
      </div>
      <img
        className="w-full"
        src={props.imageurl}
        alt="Sunset in the mountains"
      />
    </div>
  );
};

const Property_Card = (props) => {
  return (
    <div className="bg-blue-300 rounded-lg border-2 p-4 min-w-min w-1/4 m-3">
      <div className="text-blue-600 text-center">{props.type}</div>
      <div className="text-black text-center">{props.name}</div>
    </div>
  );
};

const Stats_Card = (props) => {
  return (
    <div className="bg-blue-300 rounded-lg border-2 p-4 min-w-min w-1/4 m-3">
      <div className="text-blue-600 text-center">{props.name}</div>
      <div className="text-black text-center">
        {props.value} to {props.max}
      </div>
    </div>
  );
};

const Levels_Card = (props) => {
  return (
    <div className="bg-blue-300 rounded-lg border-2 p-4 min-w-min w-1/4 m-3">
      <div className="text-blue-600 text-center">{props.name}</div>
      <div className="text-black text-center">
        {props.value} to {props.max}
      </div>
    </div>
  );
};

// const Listing_Entry = (props) => {
//   return (
//     <tr className="bg-blue-50">
//       <td className="p-4">{props.from}</td>
//       <td className="p-4">{props.price} ETH</td>
//       <td className="p-4">{props.expiry}</td>
//       <td className="p-4">
//         <button className="rounded-md p-2 border-2 border-green-400 bg-white text-green-400 hover:shadow-lg">
//           {props.transact}
//         </button>
//       </td>
//     </tr>
//   );
// };

const Offer_Entry = (props) => {
  return (
    <tr className="bg-blue-50">
      <td className="p-4">{props.from}</td>
      <td className="p-4">{props.price} ETH</td>
      <td className="p-4">{props.expiry}</td>
    </tr>
  );
};

const Trading_Entry = (props) => {
  return (
    <tr className="bg-blue-50">
      <td className="p-4">{props.event}</td>
      <td className="p-4">{props.price} ETH</td>
      <td className="p-4">{props.from}</td>
      <td className="p-4">{props.to}</td>
      <td className="p-4">{props.date}</td>
    </tr>
  );
};

const Asset = (props) => {
  const [assetData, setAssetData] = useState([]);
  const [properties, setproperties] = useState([]);
  const [levels, setlevels] = useState([]);
  const [stats, setstats] = useState([]);
  const [contract, setContract] = useState(null);
  const [chain, setChain] = useState("Etheruem");
  const [token, setToken] = useState(null);
  const [ownerId, setownerId] = useState("");
  //Adding customer Type => Owner or viewer
  const [customer, setcustomer] = useState("viewer");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [currentBid, setCurrentBid] = useState(0);
  const [end, setEnd] = useState("");
  const [offers, setOffers] = useState(offersOnAsset["data"]);
  const [assetHistory, setAssetHistory] = useState(
    assetTradingHistory["data"]["Trading_history"]
  );

  //LOGIN  ==============================

  const [accountAd, setaccountAd] = useState("");
  const [iscreate, setiscreate] = useState(false);

  function createUser(accAd) {
    axios
      .get(serverAdd + "/user/" + accAd)
      .then((res) => {
        if (res.data.data === null) {
          axios
            .post("https://nft-api-1.herokuapp.com/api/user/", {
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

  // useEffect(() => {}, [accountAd]);

  const getMetaMask = (event) => {
    event.preventDefault();
    if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
      //alert("This application requires MetaMask. Get MetaMask ?");
      //window.location.href = "https://metamask.io/download.html";
      window.location.href = "/profile";
    } else {
      alert("Please log in to MetaMask");
      window.location.reload();
    }
  };

  const buyAsset = async () => {
    let result = await web3lib.buyToken(assetData);
    assetData.tokenId = result.tokenId;
    let dbRes = await db.updateDBwithTokenId(assetData);
    if (dbRes.status) {
      // setLoading(false);
      window.location.href = "/profile";
    }
  };
  //=====================================

  const check_owner_of_Asset = () => {
    if (ownerId === accountAd) {
      setcustomer("owner");
    } else {
      setcustomer("viewer");
    }
  };

  useEffect(() => {
    if (ownerId !== "") {
      check_owner_of_Asset();
    }
  }, [ownerId, accountAd]);

  useEffect(() => {
    if (props.location.state.source === "profile")
      axios
        .get(serverAdd + "/assets/" + props.location.state.assetId.toString())
        .then((response) => {
          let data = response.data.data;

          setOffers(offersOnAsset["data"]);
          setAssetHistory(assetTradingHistory["data"]["Trading_history"]);
          setAssetData(data);
          setproperties(data.meta.properties);
          setlevels(data.meta.levels);
          setstats(data.meta.stats);
          setContract(data.chainInfo.contract);
          setChain(data.chainInfo.chain);
          setToken(data.chainInfo.token);
          setownerId(data.ownerId);
        });
    else
      axios
        .get(serverAdd + "/assets/" + props.location.state.assetId.toString())
        .then((response) => {
          let data = response.data.data;

          setOffers(offersOnAsset["data"]);
          setAssetHistory(assetTradingHistory["data"]["Trading_history"]);
          setAssetData(data);
          setproperties(data.meta.properties);
          setlevels(data.meta.levels);
          setstats(data.meta.stats);
          setContract(data.chainInfo.contract);
          setChain(data.chainInfo.chain);
          setToken(data.chainInfo.token);
          setownerId(data.ownerId);
          setTimeRemaining(
            individualAssetOnAuction["data"]["Auction_details"][
              "Time_remaining"
            ]
          );
          setCurrentBid(
            individualAssetOnAuction["data"]["Auction_details"][
              "current_Bid"
            ] === 0
              ? individualAssetOnAuction["data"]["Auction_details"][
                  "min_Amount"
                ]
              : individualAssetOnAuction["data"]["Auction_details"][
                  "current_Bid"
                ]
          );
          setEnd(individualAssetOnAuction["data"]["Auction_details"]["endAt"]);
        });
  }, []);

  return (
    <div className="flex flex-col">
      {customer === "owner" ? (
        <div className="md:w-11/12 m-5 md:m-10 flex flex-row-reverse bg-blue-50 rounded-md py-5 pr-4">
          <Link
            to={{
              pathname: "/setassetprice",
            }}
          >
            <button className="bg-blue-500 rounded-md py-3 px-10 text-white font-bold ">
              Sell
            </button>
          </Link>
        </div>
      ) : (
        ""
      )}

      <div className="md:w-11/12 m-5 md:m-10 pb-10">
        <div className=" flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col mt-15 md:w-1/3">
            <div className="flex-grow flex-col mt-4 gap-3 md:hidden ">
              <div className="heading mb-6">
                <h1>{assetData["assetName"]}</h1>
              </div>
              <div className="flex flex-row gap-8 my-4">
                <div className="flex flex-row gap-2">
                  <p>Owned by HugMe</p>
                </div>

                <div
                  className="flex flex-row gap-2 "
                  style={{ "alignItems": "center" }}
                >
                  <i className="far fa-eye"></i>
                  <p>7.8K views</p>
                </div>

                <div
                  className="flex flex-row gap-2"
                  style={{ "alignItems": "center" }}
                >
                  <i className="fa fa-heart" aria-hidden="true"></i>
                  <p>60 favorites</p>
                </div>
              </div>
            </div>
            <div className="image">
              <Product_card
                assetId={props.location.state.assetId}
                name={assetData["assetName"]}
                like={assetData["likes"]}
                descr={assetData["description"]}
                imageurl={assetData["assetUrl"]}
              />
              {/* <img className="rounded w-full h-64 object-contain" src={"https://ipfs.io/ipfs/QmViUFY5g6JzKCa2HA9dYtY864YsHqFQaryAJhm2NijUti"} /> */}
            </div>
            <div className="assetDetails my-7 rounded-lg border-2">
              <div className="description">
                <div className="bg-white w-full p-8 text-lg font-bold">
                  <i className="fas fa-bars mr-6 text-xl"></i>Description
                </div>
                <div className="bg-blue-50 p-8">{assetData["description"]}</div>
              </div>
              <div className="properties tab w-full overflow-hidden">
                <input
                  className="absolute opacity-0 margin-auto margin-r-0"
                  id="tab-properties"
                  type="checkbox"
                  name="tabs"
                ></input>
                <label
                  className="block p-8 leading-normal cursor-pointer text-xl"
                  htmlFor="tab-properties"
                >
                  <i className="fas fa-list-ul mr-6 text-xl"></i>Properties
                </label>
                <div
                  id="propertiesContent"
                  className="propertiesContent px-4 tab-content overflow-hidden bg-blue-50 w-full leading-normal"
                >
                  <div className="flex flex-row flex-wrap">
                    {properties.map((property, index) => {
                      return (
                        <Property_Card
                          type={property["name"]}
                          name={property["value"]}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <hr />
              <div className="levels tab w-full overflow-hidden">
                <input
                  className="absolute opacity-0 margin-auto margin-r-0"
                  id="tab-levels"
                  type="checkbox"
                  name="tabs"
                ></input>
                <label
                  className="block p-8 leading-normal cursor-pointer text-xl"
                  htmlFor="tab-levels"
                >
                  <i className="fas fa-star mr-6 text-xl"></i>Levels
                </label>
                <div
                  id="levelsContent"
                  className="levelsContent px-4 tab-content overflow-hidden bg-blue-50 w-full leading-normal"
                >
                  <div className="flex flex-row flex-wrap">
                    {levels.map((level, index) => {
                      return (
                        <Levels_Card
                          name={level["name"]}
                          value={level["value"]}
                          max={level["max"]}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <hr />
              <div className="stats tab w-full overflow-hidden">
                <input
                  className="absolute opacity-0 margin-auto margin-r-0"
                  id="tab-stats"
                  type="checkbox"
                  name="tabs"
                ></input>
                <label
                  className="block p-8 leading-normal cursor-pointer text-xl"
                  htmlFor="tab-stats"
                >
                  <i className="fas fa-signal mr-6 text-xl"></i>Stats
                </label>
                <div
                  id="statsContent"
                  className="statsContent px-4 tab-content overflow-hidden bg-blue-50 w-full leading-normal"
                >
                  <div className="flex flex-row flex-wrap">
                    {stats.map((stat, index) => {
                      return (
                        <Stats_Card
                          name={stat["name"]}
                          value={stat["value"]}
                          max={stat["max"]}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <hr />
              <div className="details tab w-full overflow-hidden">
                <input
                  className="absolute opacity-0 margin-auto margin-r-0"
                  id="tab-details"
                  type="checkbox"
                  name="tabs"
                ></input>
                <label
                  className="block p-8 leading-normal cursor-pointer text-xl"
                  htmlFor="tab-details"
                >
                  <i className="fas fa-info-circle mr-6 text-xl"></i>Details
                </label>
                <div className="propertiesContent px-4 tab-content overflow-hidden bg-blue-50 w-full leading-normal">
                  <div className="bg-blue-50 w-full p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row">
                        Contract:{" "}
                        <p className="m-auto mr-0 mt-0 text-gray-400">
                          {contract}
                        </p>
                      </div>
                      <div className="flex flex-row">
                        Token ID:{" "}
                        <p className="m-auto mr-0 mt-0 text-gray-400">
                          {token}
                        </p>
                      </div>
                      <div className="flex flex-row">
                        Blockchain:{" "}
                        <p className="m-auto mr-0 mt-0 text-gray-400">
                          {chain}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow flex-col mt-4 gap-3">
            <div className="heading mb-6 hidden md:block">
              <h1>{assetData["assetName"]}</h1>
            </div>
            <div className="flex flex-row gap-8 my-4 hidden md:flex md:flex-row">
              <div className="flex flex-row gap-2">
                <p>Owned by HugMe</p>
              </div>

              <div
                className="flex flex-row gap-2 "
                style={{ "alignItems": "center" }}
              >
                <i className="far fa-eye"></i>
                <p>7.8K views</p>
              </div>

              <div
                className="flex flex-row gap-2"
                style={{ "alignItems": "center" }}
              >
                <i className="fa fa-heart" aria-hidden="true"></i>
                <p>60 favorites</p>
              </div>
            </div>
            {customer === "viewer" ? (
              <div className="message">
                <div className="rounded-lg">
                  {assetData["isMinted"] === false ? (
                    <Message
                      attached
                      header="Welcome to our site!"
                      content={
                        " 🕖 Sale ends today in " +
                        timeRemaining +
                        " (Ends at " +
                        end +
                        ")"
                      }
                      error
                    />
                  ) : (
                    ""
                  )}

                  {login()}
                  <Form className="attached fluid segment">
                    {assetData["isMinted"] === undefined ? (
                      <div className="flex flex-col">
                        <p>
                          Current Min. Bid <h1>{currentBid}</h1>{" "}
                        </p>
                        <p>
                          Current Max. Price <h1>0.001</h1>{" "}
                        </p>
                        {accountAd ? (
                          <div>
                            <Button color="blue">
                              <PlaceBidModal bid={currentBid} />
                            </Button>
                            <Button color="blue" onClick={buyAsset}>
                              Buy Now
                            </Button>
                          </div>
                        ) : (
                          <Button color="blue" onClick={getMetaMask}>
                            Place Bid
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <h2>Sorry! this item is already sold out</h2>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            ) : (
              ""
            )}
            {assetData["isMinted"] === false ? (
            <div className="assetOffers my-7 tab w-full overflow-hidden border-2 rounded-md">
              <input
                className="absolute opacity-0 margin-auto margin-r-0"
                id="tab-offers"
                type="checkbox"
                name="tabs"
              ></input>
              <label
                className="block p-8 leading-normal cursor-pointer text-xl"
                htmlFor="tab-offers"
              >
                <i className="fas fa-info-circle mr-6 text-xl"></i>Offers
              </label>
              <div className="offerContent tab-content overflow-hidden bg-blue-50 w-full leading-normal">
                <hr />
               
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tr className="bg-white">
                        <td className="p-4">From</td>
                        <td className="p-4">Price</td>
                        <td className="p-4">Expiration</td>
                      </tr>
                      {offers.map((offer, index) => {
                        return (
                          <Offer_Entry
                            from={offer["From"]}
                            price={offer["Price"]}
                            expiry={offer["Expiration_date"]}
                            key={index}
                          />
                        );
                      })}
                    </table>
                  </div>
        
                <hr />
                <div className="bg-blue-50 p-4">
                  <button className="bg-white rounded-md border-blue-500 border-2 px-8 py-4 text-blue-500 font-bold hover:shadow-lg">
                    Make Offer
                  </button>
                </div>
              </div>
            </div>
            )
            :
            ''}
          </div>
        </div>
        <div className="tradingHistory tab w-full overflow-hidden border-2 rounded-md">
          <input
            className="absolute opacity-0 margin-auto margin-r-0"
            id="tab-trading"
            type="checkbox"
            name="tabs"
          ></input>
          <label
            className="block p-8 leading-normal cursor-pointer text-xl"
            htmlFor="tab-trading"
          >
            <i className="fas fa-address-card mr-6 text-xl"></i>Trading History
          </label>
          <div className="tradingHistoryContent tab-content overflow-hidden bg-blue-50 w-full leading-normal">
            <hr />
            <div className="tradingFilter bg-blue-50 p-4">
              <select
                name="filters"
                className="w-full p-4 text-lg bg-white focus:outline-none"
              >
                <option selected value="Filter">
                  Filter
                </option>
                <option value="Listings">Listings</option>
                <option value="Sales">Sales</option>
                <option value="Bids">Bids</option>
                <option value="Transfers">Transfers</option>
              </select>
            </div>
            <hr />
            <div className="overflow-x-auto">
              <table className="w-full">
                <tr className="bg-white">
                  <td className="p-4">Event</td>
                  <td className="p-4">Price</td>
                  <td className="p-4">From</td>
                  <td className="p-4">To</td>
                  <td className="p-4">Date</td>
                </tr>
                {assetHistory.map((trade, index) => {
                  return (
                    <Trading_Entry
                      event={trade["Event_type"]}
                      from={trade["From"]}
                      to={trade["To"]}
                      price={trade["Price"]}
                      date={trade["date"]}
                      key={index}
                    />
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asset;

import axios from 'axios';
// const Web3 = require("web3");


let baseURL = process.env.REACT_APP_SERVER;
console.log('baseURL', baseURL);

// const getUserAddress = async () => {
//     const web3 = new Web3(window.ethereum);
//     const accounts = await Web3.eth.getAccounts(); 
//     return accounts[0];
// }


export const getData = (path) => {
    return axios.get(baseURL+ path)
        .then(response => {
            // console.log(response);
            return response;
        })
};

export const updateDBwithToken = async (userData, nftJson) => {
        console.log('UserData for DB:', userData);
      return await axios.post(baseURL + "/assets/", userData)
      .then((res, err) => {
        if (err) {
            console.log('ERROR from db:', err);
            throw(err);}
        console.log('res from server: ', res);
        return {
            "status": true,
            "data": res
        }
      })
      .catch((err) => {
          console.log('ERROR while updateDBwithToken:', err);
        return {
            "status": false,
            "data": err
        }
      });
}
export const updateDBwithTokenId = async (userData, nftJson) => {
        console.log('UserData for DB:', userData);
      return await axios.put(baseURL + "/assets/", userData)
      .then((res, err) => {
        if (err) {
            console.log('ERROR from db:', err);
            throw(err);}
        console.log('res from server: ', res);
        return {
            "status": true,
            "data": res
        }
      })
      .catch((err) => {
          console.log('ERROR while updateDBwithToken:', err);
        return {
            "status": false,
            "data": err
        }
      });
}

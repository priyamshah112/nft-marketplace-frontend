import axios from 'axios';
// require("dotenv").config();


let baseURL = process.env.REACT_APP_SERVER;
console.log('baseURL', baseURL);
// export default axios.create(
//     {
//         baseURL:"https://nft-api-1.herokuapp.com/api",
//         headers:{
//             'Content-Type':'application/json'
//         }
//     }
// );

export const getData = (path) => {
    console.log('fetching api:', baseURL+ path);
    return axios.get(baseURL+ path)
        .then(response => {
            // console.log(response);
            return response;
        })
};

export const getAssetById = async (userData, nftJson) => {
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
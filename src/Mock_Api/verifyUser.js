import axios from 'axios';

export default axios.create(
    {
        baseURL:"https://nft-api-1.herokuapp.com/api",
        headers:{
            'Content-Type':'application/json'
        }
    }
)
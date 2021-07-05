import React,{useState} from "react";
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from "react-router-dom";

const Card = ({data}) => {
    const imageUrl = "https://robohash.org/evenietipsafuga.png?size=200x300&set=set1"
    const price = 4
    // console.log(data)
    // const[likes,name]=data;
    // const {imageUrl,likes,title,price} = props.data; 
    const [isLoaded,setLoaded] = useState(false);

    return (
            <Link to={{
                pathname: "/asset/",
                state: {
                    ownerId: data.ownerId == null ? "": data.ownerId.account_address[0],
                    name: data.assetName,
                    descr: data.description,
                    assetId: data.Auction_details == null ? "" : data.Auction_details.Asset_id
                }
            }}>
                <div className="mb-4 p-4 bg-white rounded-md shadow-md w-96 border transform hover:-translate-y-1.5 hover:shadow-2xl duration-150 mx-2">
                    <div className="flex flex-row justify-end p-1.5">
                        {/* <FavoriteBorderIcon className="hover:text-red-500" /> */}
                        <i class="far fa-heart hover:text-red-500"></i>
                        <span className="pl-1">{data.likes}</span>
                        {/* <span className="pl-1">4</span> */}
                    </div>
                    <div className="relative">
                        <img className="rounded w-full h-64 object-contain" src={data.assetUrl || data.imageUrl} onLoad={setLoaded} />
                        {!isLoaded && <div className="absolute w-full h-full t-0 bg-white z-10">{data.assetUrl}</div> }
                    </div>
                    <div className="flex justify-between mt-2">
                        <div>
                            <span className="block text-gray-400">{data.assetName}</span>
                            <span>{data.description}</span>
                            {/* <span>Title</span> */}
                        </div>
                        <div>
                            <span className="block text-gray-400">Price</span>
                            <div className="flex flex-row flex-nowrap items-center justify-evenly">
                                <span className="font-bold">Ξ</span>
                                <span className="font-bold">{price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            )

}

export default Card;

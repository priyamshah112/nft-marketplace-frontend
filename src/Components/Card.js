import React,{useState} from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const Card = (props) => {


    const {imageUrl,likes,title,price} = props.data; 
    const [isLoaded,setLoaded] = useState(false);

    return (
        <div style={{  width: "328px", } } className="mb-4 p-4 bg-white rounded-md shadow-md border transform hover:-translate-y-1.5 hover:shadow-2xl duration-150 mr-5">
            <div className="flex flex-row justify-end p-1.5">
                <FavoriteBorderIcon className="hover:text-red-500" />
            <span className="pl-1">{likes}</span>
            </div>
            <div className="relative">
                <img className="rounded w-full h-64 object-contain" src={imageUrl} onLoad={setLoaded} />
                {!isLoaded && <div className="absolute w-full h-full t-0 bg-white z-10">Loading.....</div> }
                </div>
                    <div className="flex justify-between mt-2">
                        <div>
                        <span className="block text-gray-400">Sperman</span>
                        <span>{title}</span>
                        </div>
                        <div>
                        <span className="block text-gray-400">Price</span>
                        <span className="font-bold">Ξ{price}</span>
                        </div>
                    </div>
            </div>
                )

}

export default Card;

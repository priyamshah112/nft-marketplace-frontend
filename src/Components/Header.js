import React from 'react';
import '../CSS/header.css';


const Header = () => {
    
    return (
        <div>
            <div className="flex text-2xl flex-col items-center w-full text-center mb-8 justify-center" style={{minHeight:'325px',backgroundImage:"url('https://opensea.io/static/images/frontpage-background.webp')",backgroundPosition:'center 150px',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                <div className="md:text-4xl leading-5">The largest NFT marketplace</div>
                <div className="flex mt-8">
                    <div className="py-1 px-8 bg-blue-400 text-white font-semibold rounded-md mr-4 cursor-pointer hover:bg-white hover:text-blue-400 btn1">Explore</div>
                    <div className="py-1 px-8 bg-white border border-blue-400 text-blue-400 font-semibold rounded-md cursor-pointer hover:bg-blue-400 hover:text-white">Create</div>
                </div>
            </div>
        </div>
    )

};


export default Header;

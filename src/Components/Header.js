import React from 'react';
import '../CSS/header.css';



const Header = () => {

    return (
        <div>
            {/* <div className="flex text-2xl flex-col items-center w-full text-center mb-8 justify-center" style={{minHeight:'500px',backgroundImage:"url('https://opensea.io/static/images/frontpage-background.webp')",backgroundPosition:'center 150px',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                <div className="md:text-4xl leading-5">The largest NFT marketplace</div>
                <div className="flex mt-8">
                    <div className="py-1 px-8 bg-blue-400 text-white font-semibold rounded-md mr-4 cursor-pointer hover:bg-white hover:text-blue-400 btn1">Explore</div>
                    <div className="py-1 px-8 bg-white border border-blue-400 text-blue-400 font-semibold rounded-md cursor-pointer hover:bg-blue-400 hover:text-white">Create</div>
                </div>
            </div> */}
            <div className="flex text-2xl flex-col w-full mb-8 bg-cover bg-no-repeat" style={{ minHeight: '100vh', backgroundImage: "url('https://cdn.shopify.com/s/files/1/1414/2472/articles/46_1300x800.png?v=1593590858')", boxShadow: "inset 0 0 0 1000px rgb(0 0 0 / 33%)" }}>
                <div className="ml-8 mt-8">
                    <div className="text-7xl text-white" style={{ lineHeight: '5rem' }}>Discover<br></br> rare digital art<br></br> and collect NFTs</div>
                    <div className="flex mt-8">
                        <a href="/browse" className="py-1 px-8 bg-blue-400 text-white font-semibold rounded-md mr-4 cursor-pointer hover:bg-white hover:text-blue-400 btn1">
                            Explore
                        </a>
                        <a href="/createAsset" className="py-1 px-8 bg-white border border-blue-400 text-blue-400 font-semibold rounded-md cursor-pointer hover:bg-blue-400 hover:text-white">
                            Create
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )

};


export default Header;

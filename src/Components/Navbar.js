import React from 'react';
import '../tailwind.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="flex items-center justify-between flex-col bg-gray-800 py-2 px-6 md:flex-row">
                <div className="flex flex-row w-full justify-between md:w-auto">
                    <a href="/" className="flex items-center flex-shrink-0 text-white mr-6 hover:cursor-pointer">
                        <span className="font-bold text-xl">NFT Original</span>
                    </a>
                    <i className="float-right fas fa-bars text-white text-lg cursor-pointer md:hidden" onClick={() => {
                        var ele = document.getElementsByClassName('navitems')[0]
                        ele.classList.contains("hidden") ? ele.classList.remove("hidden") : ele.classList.add("hidden")
                    }}></i>
                </div>
                <div className="navitems w-11/12 hidden md:block">
                    <div className="block mt-5 flex-grow sm:flex sm:w-full sm:mt-2">
                        <div className="text-md sm:flex-grow">
                            <div className="mx-16 shadow flex rounded-full">
                                <input className="w-full rounded-1-full pr-12 pl-5 p-2" type="text" placeholder="Search..."></input>
                                <button className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <a href="/browse" className="block mt-4 px-4 sm:inline-block sm:mt-1 text-white hover:text-white mr-4">
                                Browse
                        </a>
                            <a href="/leaderboard" className="block mt-4 px-4 sm:inline-block sm:mt-1 text-white hover:text-white mr-4">
                                Leaderboard
                        </a>
                            <a href="/createAsset" className="block mt-4 px-4 mr-5 sm:inline-block sm:mt-1 text-white hover:text-white">
                                Create
                        </a>
                        </div>
                        <div className="group">
                            <a href="#" className="inline-block text-sm px-4 py-1 leading-none rounded text-white mt-4 md:mt-0">
                                <i className="fas fa-user-circle fa-2x"></i>
                            </a>
                            <ul className="absolute z-40 shadow-xl sm:right-10 hidden text-black-700 pt-2 group-hover:block">
                                <li>
                                    <a href="/profile" className="rounded-t w-42 bg-gray-50 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
                                        <i className="far fa-address-card text-lg px-2 pr-4"></i>
                                        <span className="text-lg">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/settings" className="rounded-t w-42 bg-gray-50 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
                                        <i className="fas fa-user-cog text-lg px-2 pr-4"></i>
                                        <span className="text-lg">Account Settings</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;

/*

<li>
    <a href="#" className="rounded-t w-42 bg-gray-50 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
        <i className="fas fa-dollar-sign text-lg px-2 pr-7"></i>
        <span className="text-lg">Sell</span>
    </a>
</li>
<li>
    <a href="#" className="rounded-t w-42 bg-gray-50 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
        <i className="fas fa-exchange-alt text-lg px-2 pr-4"></i>
        <span className="text-lg">Transfer</span>
    </a>
</li>

*/

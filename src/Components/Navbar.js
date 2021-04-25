import React from 'react';
import '../tailwind.css';
import {Link} from 'react-router-dom';

const Navbar = ()=>{
    return(
        <div>
            <nav class="flex items-center justify-between flex-wrap bg-gray-800 py-2 px-6">
                <div class="flex items-center flex-shrink-0 text-white mr-6">
                <span class="font-bold text-xl">ArtXchange</span>
                </div>
                <div class="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
                <div class="text-md sm:flex-grow">
                    <div class="mx-28 shadow flex rounded-full">
                        <input class="w-full rounded-1-full pr-12 pl-5 p-2" type="text" placeholder="Search..."></input>
                        <button class="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
                            <i class="fas fa-search"></i>
                        </button>
                    </div> 
                </div>
                <div>
                    <a href="/browse" class="block mt-4 px-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4">
                        Browse
                    </a>
                    <a href="#" class="block mt-4 px-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4">
                        Leaderboard
                    </a>
                    <a href="#" class="block mt-4 px-4 mr-5 sm:inline-block sm:mt-0 text-white hover:text-white">
                        Create
                    </a>
                </div>
                <div className="group">
                    <a href="/login" className="inline-block text-sm px-4 py-2 leading-none rounded text-white mt-4 md:mt-0">
                        <i class="fas fa-user-circle fa-2x"></i>
                    </a>
                    <ul className="absolute shadow-xl right-10 hidden text-black-700 pt-2 group-hover:block">
                        <li>
                            <a href="/login" className="rounded-t w-42 bg-gray-50 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
                                <i class="far fa-address-card text-lg px-2 pr-4"></i>
                                <span className="text-lg">My Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="rounded-t w-42 bg-gray-50 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
                                <i class="fas fa-dollar-sign text-lg px-2 pr-7"></i>
                                <span className="text-lg">Sell</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="rounded-t w-42 bg-gray-50 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
                                <i class="fas fa-exchange-alt text-lg px-2 pr-4"></i>
                                <span className="text-lg">Transfer</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="rounded-t w-42 bg-gray-50 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
                                <i class="fas fa-user-cog text-lg px-2 pr-4"></i>
                                <span className="text-lg">Account Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
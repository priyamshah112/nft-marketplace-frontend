import React from 'react';
import '../tailwind.css';

const Navbar = ()=>{
    return(
        <div>
            <nav class="flex items-center justify-between flex-wrap bg-gray-800 py-2 px-4">
                <div class="flex items-center flex-shrink-0 text-white mr-6">
                <span class="font-bold text-xl">ArtXchange</span>
                </div>
                {/* <div class="shadow flex rounded-full">
                    <input class="w-full rounded-1-full p-2" type="text" placeholder="Search..."></input>
                    <button class="bg-white w-auto flex rounded justify-end items-center text-blue-500 p-2 hover:text-blue-400">
                        <i class="fas fa-search"></i>
                    </button>
                </div> */}
                <div class="p-2 pr-3">
                    <div class="bg-white flex items-center rounded-full">
                        <input class="rounded-l-full w-full py-1 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search"></input>
                        
                        <div class="p-1">
                            <button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
                <div class="text-md sm:flex-grow">
                    
                </div>
                <div>
                <a
                    href="#"
                    class="block mt-4 px-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4"
                    >
                    Browse
                    </a>
                    <a
                    href="#"
                    class="block mt-4 px-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4"
                    >
                    Community
                    </a>
                    <a
                    href="#"
                    class="block mt-4 px-4 mr-5 sm:inline-block sm:mt-0 text-white hover:text-white"
                    >
                    Create
                    </a>
                    <a
                    href="#login"
                    class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 mt-4 md:mt-0"
                    >Login</a
                    >
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
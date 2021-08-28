import React from "react";
import metamask from '../Images/metamask.png'

export default function RedirectModal() {
    const [showModal, setShowModal] = React.useState(true);
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col p-6 w-full bg-blue-100 outline-none focus:outline-none">
                                <div className="flex items-center justify-center pt-4">
                                    <h3 className="text-3xl font-semibold">
                                        MetaMask Required
                                        <img className="mx-auto pt-2" src={metamask} alt="metamask logo" width="60" height="60"/>
                                    </h3>
                                </div>
                                <p className="text-justify text-xl pt-3">This application requires MetaMask. <br/> Get MetaMask ?</p>
                                <div className="flex items-center justify-center">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 mb-1 rounded" onClick={() => setShowModal(false)}>
                                        CLOSE
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 mb-1 rounded" onClick={() => window.open('https://metamask.io/download.html', '_blank')}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}


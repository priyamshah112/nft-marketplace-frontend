import React from 'react';
import FOOTER_LINKS from '../Mock_Api/footer_links.json';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import RedditIcon from '@material-ui/icons/Reddit';
// import TelegramIcon from '@material-ui/icons/Telegram';
// import MailOutlineIcon from '@material-ui/icons/MailOutline';


const Links = ({ title, links }) => {

    // console.log(props);
    return (
        <div className="flex flex-col p-t-8 h-1/2 w-1/2 text-center mt-2 mb-2">
            <div className="capitalize font-extrabold text-white text-lg">{title}</div>
            {links.map((link, linkIdx) => (
                <a className="mt-2 capitalize font-thin text-white hover:text-blue-400" href={link.url} key={linkIdx}>{link.title}</a>
            ))}
        </div>
    );

}

const Footer = () => {

    // console.log(FOOTER_LINKS);
    return (
        <div className="w-full h-auto relative mt-32 mb-0 mx-auto p-8 text-white" style={{ backgroundColor: '#1868b7' }}>
            <div>
                <div className="flex flex-wrap border-b border-gray-300 border-opacity-25 pb-10">
                    <div className="flex flex-col md:w-5/8 md:pb-8 md:text-left md:pl-20">
                        <div className="text-left text-white font-bold my-8 mx-0 text-2xl">Stay in the Loop</div>
                        <p className="text-left md:text-left font-normal text-xl">Join our mailing list to get the latest updates on NFT and the best deals directly in your inbox</p>
                        <div className="flex mt-2">
                            <input className="p-3 md:w-3/4 rounded outline-none text-black text-xl" type="text" placeholder="Your email address" />
                            <div style={{ backgroundColor: "#2081e2" }} className="rounded pr-6 pl-6 cursor-pointer text-center text-xl items-center justify-center inline-flex ml-2 md:w-1/4">
                                Sign Up
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 flex flex-col md:w-1/4 md:pb-8 md:text-left md:ml-40">
                        <div className="text-left text-white font-bold my-8 mx-0 text-2xl">Join the Community</div>
                        <div className="flex flex-wrap justify-start">
                            <a href="https://twitter.com/" className="" target="_blank" rel="noreferrer">
                                <div className="p-2 rounded sm:p-3" style={{ backgroundColor: "#2081e2" }}>
                                    <i className="fab fa-twitter fa-2x px-2 pr-2" style={{ color: "white" }}></i>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/" className="ml-2" target="_blank" rel="noreferrer">
                                <div className="p-2 rounded sm:p-3" style={{ backgroundColor: "#2081e2" }}>
                                    <i className="fab fa-instagram fa-2x px-2 pr-2" style={{ color: "white" }}></i>
                                </div>
                            </a>
                            <a href="https://www.google.com/gmail/" className="ml-2" target="_blank" rel="noreferrer">
                                <div className="p-2 rounded sm:p-3" style={{ backgroundColor: "#2081e2" }}>
                                    <i className="fas fa-envelope fa-2x px-2 pr-2" style={{ color: "white" }}></i>
                                </div>
                            </a>
                            <a href="https://www.reddit.com/" className="ml-2" target="_blank" rel="noreferrer">
                                <div className="p-2 rounded sm:p-3" style={{ backgroundColor: "#2081e2" }}>
                                    <i className="fab fa-reddit-alien fa-2x px-2 pr-2" style={{ color: "white" }}></i>
                                </div>
                            </a>
                            <a href="https://discord.com/" className="ml-2" target="_blank" rel="noreferrer">
                                <div className="p-2 rounded sm:p-3 " style={{ backgroundColor: "#2081e2" }}>
                                    <i className="fab fa-discord fa-2x px-2 pr-2" style={{ color: "white" }}></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row p-b-8 border-b border-gray-300 border-opacity-25 flex-wrap mt-8 mb-8 pb-8 md:pl-20 items-center">
                    <div className="flex flex-col md:w-1/2 md:text-left text-center inline-block align-middle">
                        <div className="text-xl md:text-2xl md:text-center">NFT Original</div>
                        <p className="mt-2 text-lg text justify">The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital assets.  NFTs have exciting new properties: they’re unique, provably scarce, liquid, and usable across multiple applications. Just like physical goods, you can do whatever you want with them!</p>
                    </div>
                    <div className="mt-8 flex flex-nowrap md:w-1/2 items-start justify-start">
                        {FOOTER_LINKS.map((section, sectionIdx) => { return (<Links title={section.section.title} links={section.section.links} key={sectionIdx} />) })
                        }
                    </div>
                </div>
                <div className="flex md:flex-col content-center flex-wrap m-t-8 m-b-8 text-center justify-center item-center">
                    <div>© 2018-2021 NFT ORIGINAL</div>
                </div>
            </div>
        </div>
    );

};


export default Footer;

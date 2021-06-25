import React from 'react';
import FOOTER_LINKS from '../Mock_Api/footer_links.json';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import RedditIcon from '@material-ui/icons/Reddit';
// import TelegramIcon from '@material-ui/icons/Telegram';
// import MailOutlineIcon from '@material-ui/icons/MailOutline';


const Links = ({title,links}) => {
        
    // console.log(props);
    return (    
             <div className="flex flex-col p-t-8 h-1/2 w-1/2 text-center mt-2 mb-2">
                    <div className="capitalize font-bold">{ title }</div>
                 {links.map((link,linkIdx) => (
                     <a className="mt-2 capitalize font-light" href={link.url}>{link.title}</a>
                 ) )}
            </div>
    );
    
}

const Footer = () => {
    
    console.log(FOOTER_LINKS);
    return (
        <div className="w-full h-auto relative mt-32 mb-0 mx-auto p-8 text-white" style={{backgroundColor:'#1868b7'}}>
                <div>
                    <div className="flex flex-wrap border-b border-gray-300">
                        <div className="flex flex-col md:w-1/2 md:pb-8 md:text-left">
                            <div className="text-center text-white font-bold my-8 mx-0 text-xl">Stay in the Loop</div>
                            <p className="text-center md:text-left font-normal">Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenSea.</p>
                            <div className="flex mt-8">
                                <input className="p-2 md:w-3/4 rounded outline-none text-black" type="text" placeholder="Your email address"/>
                                <div style={{backgroundColor : "#2081e2"}} className="rounded pr-6 pl-6 cursor-pointer text-center items-center justify-center inline-flex ml-2 md:w-1/4">    
                                    Sign Up
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/2 text-center items-center text-white p-8">
                                <div className ="mt-8 mb-8 text-xl font-bold">Join the Community</div>
                                <div className="flex flex-wrap justify-center">
                                    <a href="#" className="ml-2">
                                        <div className="p-3 rounded" style={{backgroundColor : "#2081e2"}}>
                                            {/* <InstagramIcon /> */}
                                        </div>
                                    </a>
                                    <a href="#" className="ml-2">
                                        <div className="p-3 rounded" style={{backgroundColor : "#2081e2"}}>
                                            {/* <FacebookIcon /> */}
                                        </div>
                                    </a>
                                    <a href="#" className="ml-2">
                                        <div className="p-3 rounded" style={{backgroundColor : "#2081e2"}}>
                                            {/* <RedditIcon /> */}
                                        </div>
                                    </a>
                                </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row p-b-8 border-b border-gray-300 flex-wrap mt-8 mb-8 pb-8">
                        <div className="flex flex-col md:w-1/4 md:text-left items-center text-center">
                            <div className="md:text-2xl md:text-left">Logo</div>
                            <p>The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital assets.</p>
                        </div>
                        <div className="mt-8 flex flex-wrap md:flex-nowrap md:w-3/4 items-start justify-around">
                            {FOOTER_LINKS.map((section,sectionIdx) => 
                                {
                                // console.log("section",section);
                            return (<Links title={section.section.title} links={section.section.links} key={sectionIdx} /> )})}
                        </div>
                    </div>
                    <div className="flex md:flex-col content-center flex-wrap m-t-8 m-b-8 text-center justify-center item-center">
                        <div>© 2018-2021 NFT ORIGINAL</div>
                        <div className="flex">
                            <a href='#' className="mr-2">Privacy Policy</a>
                            <a href='#' className="ml-2">Terms of Service</a>
                        </div>
                    </div>
            </div>
        </div>
    );

};


export default Footer;

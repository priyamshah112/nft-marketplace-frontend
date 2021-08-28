import React,{useEffect,useState} from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Card = ({ imgUrl }) => {
        
    return ( 
                <div className="mb-2 ml-3 mr-5">
                    <div className="shadow-lg relative">
                        <img className="rounded-md md:w-full" src={imgUrl}  />
                        <div className="invisible md:visible bg-white text-blue-500 absolute bottom-5 ml-12 p-2 pl-5 pr-5 rounded flex flex-row cursor-pointer">
                            <a href="/browse">
                                Explore
                            </a>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
    )

};


const Carousel = () => {
    
    const [cards,loadCards] = useState([]);
    
    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    vertical: true,
                },
            },
        ],
    };
    
    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch('/carousel.json');
            const data = await response.json();
            // console.log(data);
            loadCards(data.cards);
        } 
        fetchCards();
    },[]);

    return (
        <div>
            {cards && cards.length > 0 && 
                <Slider {...settings} >
                        {cards.map((card,cardIdx) => (<Card imgUrl={card.imageUrl} key={cardIdx} />))}
                </Slider >
            }
        </div>
    );
};

export default Carousel;

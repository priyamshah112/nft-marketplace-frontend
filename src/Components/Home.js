import React from "react";
import Carousel from "./Carousel";
import CardsList from './CardsList'; 
import Footer from './Footer';
import Header from './Header';
const Home = () => {
    
    const Cards = ['c_1','c_2'];

    return (
        <div>
            <Header />
            <div className="w-11/12 my-10 mx-auto">
                <Carousel />
                {Cards.map((card,cardIdx) => <CardsList title={card} key={cardIdx}/>)}
            </div>
            <Footer />
        </div>
    );
};

export default Home;

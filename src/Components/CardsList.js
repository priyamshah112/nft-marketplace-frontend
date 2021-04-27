import React,{useState,useEffect,lazy} from 'react';
import Card from './Card';
// import InsightsIcon from '@material-ui/icons/Insights';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// const importIcon = iconName => lazy(() => import(`@material-ui/icons/${iconName}`));


const CardsList = (props) => {
    console.log(props);
    const [cards,setCards] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/${props.title}.json`);
            const data = await response.json();
            console.log(data);
            // const Icon = await importIcon(data.iconName);
            setCards({...data});
        }
        fetchData();
    },[]);

    return (
            <div className="mt-10 mb-0 ml-auto mr-auto card-container">
            {/* <!-- head --> */}
            <div className="border-b-2 pb-2 flex justify-between">
                <div className="pb-2 flex">
                    {/* <InsightsIcon /> */}
                    {/* {cards.icon} */}
                    <i class="fas fa-chart-line"></i>
                    <span className="block uppercase font-bold">&nbsp; {cards.title} </span>
                </div>
                <div className="flex cursor-pointer">
                    <span className="uppercase font-bold">View All</span>
                    {/* <ArrowForwardIosIcon /> */}
                </div>
            </div>
            <div className="mt-10 grid grid-flow-col overflow-auto">
                {cards.assets && cards.assets.length > 0 && cards.assets.map((asset,assetIdx) => (<Card data={asset} />))}
            </div>
        </div>
    );

};


export default CardsList;

import React,{useState,useEffect} from 'react';
import Card from './Card';
import assets from '../Mock_Api/assets'
import '../tailwind.css';


const FilterBar = ()=>{
    let choiceArray=["Price","Price: Low to High","Price: High to Low"]
    const[currValue,setValue] = useState(choiceArray[0])

    const LowToHigh = ()=>{
        setValue(choiceArray[1])
    }

    const HighToLow = ()=>{
        setValue(choiceArray[2])
    }

    return(
        <div className="flex flex-row flex-nowrap justify-end pt-6 mr-5">
            <div className="group">
                <button id="price-button" type="button" class="w-56 bg-gray-50 border justify-between border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center">
                    <span class="pr-8 inline-block">{currValue}</span>
                    <i class="fas fa-chevron-down "></i>
                </button>
                <ul className="w-56 z-30 absolute ml-4 shadow-xl hidden right-5 text-black-700 group-hover:block mr-5">
                    <li className="py-2 cursor-pointer rounded px-4 block bg-gray-50 w-42 hover:bg-gray-100" onClick={()=>LowToHigh()} id="menu-item-1">
                        <span>Price: Low to High</span>
                    </li>
                    <hr></hr>
                    <li className="py-2 cursor-pointer rounded px-4 block bg-gray-50 w-42 hover:bg-gray-100" onClick={()=>HighToLow()} id="menu-item-2">
                        <span>Price: High to Low</span>
                    </li>
                    <li className="py-2 cursor-pointer rounded px-4 block bg-gray-50 w-42 hover:bg-gray-100" onClick={()=>setValue(choiceArray[0])} id="menu-item-2">
                        <span>None</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

// const DisplayCard = ()=>{
//     const [cards,setCards] = useState({});
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(`/c_1.json`);
//             const data = await response.json();
//             console.log(data);
//             // const Icon = await importIcon(data.iconName);
//             setCards({...data});
//         }
//         fetchData();
//     },[]);
//     return(
//         <div className="mt-10 grid grid-flow-row auto-cols-auto grid-cols-4 gap-3">
//             {cards.assets && cards.assets.length > 0 && cards.assets.map((asset,assetIdx) => (<Card data={asset} />))}
//         </div>
//     )
// }

// CARD WITH OUR BACKEND API
const DisplayCard = ()=>{
    const [cards,setCards] = useState([]);
    useEffect(()=>{
        const fetchAssets = async () =>{
            
            const response = assets.get('/assets');
            const data = (await response).data
            const assetData = (await response).data.data
            console.log(assetData);
            setCards(assetData);
        }
        fetchAssets();
        console.log(cards);
    },[]);
    return(
        <div className="mt-10 grid grid-flow-row auto-cols-auto grid-cols-1 sm:grid-cols-4 gap-3">
            {cards && cards.length > 0 && cards.map((asset,assetIdx) => (<Card data={asset} />))}
        </div>
    )
}



const Browse = ()=>{
    return(
        <div className="container mx-auto px-5">
            <FilterBar/>
            <DisplayCard/>
        </div>
    )
}
export default Browse
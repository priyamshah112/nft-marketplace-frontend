import React, { useState, useEffect } from 'react';
import '../tailwind.css';
import profile_img from '../Images/profile.PNG'


const Product_card = (props) => {
    return (
        <div class="w-60 rounded shadow-lg my-2">
            <div class="flex flex-row-reverse m-5 items-center gap-1">
                {props.like}
                <i class="far fa-heart"></i>


            </div>
            <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
            <div class="mx-6 my-4">
                <div class="font-bold text-xl ">{props.name}</div>
                <p class="text-grey-darker text-base">
                    Lorem ipsum dolor
    </p>
            </div>

        </div>)
}

const Assets = () => {
    return (
        <div class="flex flex-col m-5 my-2">
            <div class="flex border-grey-light border ">
                <input class="w-full rounded ml-1" type="text" placeholder="Search..." />
                <button class="bg-grey-lightest border-grey border-l shadow hover:bg-grey-lightest">
                    <span class="w-auto flex justify-end items-center text-grey p-2 hover:text-grey-darkest">
                        <i class="fas fa-search"></i>
                    </span>
                </button>
            </div>


            <div class="flex flex-wrap gap-5 mx-auto justify-evenly">
                <Product_card name="ssm2" like="2" />
                <Product_card name="ssm2" like="3" />
                <Product_card name="ssm2" like="5" />
                <Product_card name="ssm2" like="1" />
                <Product_card name="ssm2" like="2" />
                <Product_card name="ssm2" like="2" />
                <Product_card name="ssm2" like="2" />
                <Product_card name="ssm2" like="2" />
                <Product_card name="ssm2" like="2" />
                <Product_card name="ssm2" like="2" />
            </div>

        </div>
    )
}


const Activity = () => {
    return (
        // <div class="m-5 ">

        <table class="table-auto m-5 p-5 bg-gray-50">
            <thead>
                <tr className="bg-gray-200">
                    <th>Event</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>Intro to CSS</td>
                    <td>Adam</td>
                    <td>858</td>
                </tr>
                <tr class="bg-emerald-200">
                    <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
                    <td>Adam</td>
                    <td>112</td>
                </tr>
                <tr>
                    <td>Intro to JavaScript</td>
                    <td>Chris</td>
                    <td>1,280</td>
                </tr> */}
            </tbody>
        </table>
        // </div>
    )
}





const Profile = () => {
    let fileSelector = null;




    const [selectedTab, setselectedTab] = useState(0);
    const fileSelectedHandler = (e) => {
        console.log(e.target.files[0]);
    }

    useEffect(() => {
        document.getElementById(selectedTab).classList.add('bg-gray-100')
    })

    const toggleChange = (e) => {
        console.log(e);
        if (e.target.id != selectedTab) {
            e.target.classList.add('bg-gray-100');
            setselectedTab(e.target.id);
            document.getElementById(selectedTab).classList.remove('bg-gray-100');
        }

    }


    return (
        <div className="flex flex-col">
            <div class="flex flex-row-reverse  bg-gray-100 h-52 " id="background">

                <div class="pr-3 py-4">

                    <i class="fas fa-pen-square" onClick={(e) => document.getElementById('myInput').click()} style={{ fontSize: "40px" }}></i>
                    <input
                        id="myInput"
                        style={{ display: 'none' }}
                        type={"file"}
                        onChange={fileSelectedHandler}

                    />
                </div>

            </div>
            <div class="flex flex-row-reverse gap-5 pr-5 py-4 relative">
                <i class="fas fa-cog" style={{ fontSize: "40px" }}></i>
                <i class="fas fa-share-alt-square" style={{ fontSize: "40px" }}></i>
                <div class="absolute flex flex-col bottom-4 right-1/2 justify-center items-center">
                    {/* <i class="far fa-user-circle" style={{ fontSize: "60px" }}></i> */}
                    <div class="rounded-full h-32 w-32 flex items-center justify-center" style={{ backgroundImage: "url(" + profile_img + ")" }} >
                        {/* <img src={profile_img}></img> */}
                    </div>
                    <div class=" ">
                        Unnamed
                    </div>
                </div>
            </div>
            <div class="flex flex-row flex-wrap gap-10 m-10 font-light" style={{ fontSize: "16px" }}>
                <div class="flex flex-row px-5 py-2 hover rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="0">
                    <i class="fas fa-tag"></i>
                    Assets
                </div>
                <div class="flex flex-row px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="1">
                    <i class="fas fa-history"></i>
                    Activity
                </div>
                <div class="flex flex-row  px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="2">
                    <i class="fas fa-gift"></i>
                    Offer
                </div>
                <div class="flex flex-row  px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="3">
                    <i class="far fa-heart"></i>
                    Favourite
                </div>
                <div class="flex flex-row  px-5 py-2 rounded-lg items-center gap-3" style={{ cursor: "pointer" }} onClick={toggleChange} id="4">
                    <i class="fas fa-dollar-sign"></i>
                    Referrals
                </div>
            </div>
            <hr />
            {
                selectedTab == 0 ? <Assets /> : null

            }
            {selectedTab == 1 ? <Activity /> : null}
            {/* <Assets /> */}
        </div>
    )
}
export default Profile;
import React from 'react';


const Leaderboard=()=>{

    var data=[
        {
            "name":"sid",
            "address":"0x9ab6c8babe633a1d9e0b056fd34b90709691554a",
            "total":"300"
        },
        {
            "name":"sid",
            "address":"0x9ab6c8babe633a1d9e0b056fd34b90709691554a",
            "total":"300"
        },
        {
            "name":"sid",
            "address":"0x9ab6c8babe633a1d9e0b056fd34b90709691554a",
            "total":"300"
        }, {
            "name":"sid",
            "address":"0x9ab6c8babe633a1d9e0b056fd34b90709691554a",
            "total":"300"
        },
        {
            "name":"sid",
            "address":"0x9ab6c8babe633a1d9e0b056fd34b90709691554a",
            "total":"300"
        },
        {
            "name":"sid",
            "address":"0x9ab6c8babe633a1d9e0b056fd34b90709691554a",
            "total":"300"
        },
        {
            "name":"sid",
            "address":"0x9ab6c8babe633a1d9e0b056fd34b90709691554a",
            "total":"300"
        }, {
            "name":"sid",
            "address":"0x9ab6c8babe633a1d9e0b056fd34b90709691554a",
            "total":"300"
        }

    ]

    return(
        <div className="w-screen  p-5">
            <table className="w-full table-auto p-20 bg-gray-50 border-2" >
            <thead>
                <tr className="h-20 bg-gray-200">
                    <th className="w-1/5">Name</th>
                    <th className="w-3/5">Address</th>
                    <th className="w-1/5">Total Price</th>
                    
                </tr>
            </thead>
            <tbody>
            {
                data.map((act, ind) => {
                    return <tr className="h-20 bg-blue-50">
                        <th className="font-light">{act['name'].toString()}</th>
                        <th className="font-light">{act['address'].toString()}</th>
                        <th className="font-light">{act['total'].toString()}</th>
                    </tr>
                })
            }
            </tbody>
        </table>
        </div>
    );

}

export default Leaderboard;
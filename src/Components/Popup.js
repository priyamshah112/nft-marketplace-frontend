import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../CSS/createasset.css';
import React, { useState, useEffect } from 'react';


const PropertyType1 = (props) => {
    const deleteProperty = (e) => {
        if (props.count > 1) {
            props.setting(props.count - 1);
        }
    }

    const handleChange = (e) => {
        var id = String(e.target.id)[0];


    }



    const items = []

    for (var i = 0; i < props.count; i++) {
        console.log(props.count);

        items.push(
            <tr className="w-full m-3 ">
                <td>
                    <button style={{ outline: "none" }} type="button" onClick={deleteProperty} className="w-full  border-2 border-grey-500 mt-2 p-2 py-2 rounded-md hover:shadow-lg focus:outline-none">
                        <i className="fa fa-times text-grey-500"></i>
                    </button>
                </td>
                <td >
                    <input onChange={handleChange} id={i + "name"} className="w-full rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 focus:shadow-lg focus:border-none focus:outline-none" type="text" defaultValue={props.properties[i] != null ? props.properties[i]['name'] : null}></input>

                </td>
                <td>
                    <input onChange={handleChange} id={i + "value"} className="w-full rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 focus:shadow-lg focus:border-none focus:outline-none" type="text" defaultValue={props.properties[i] != null ? props.properties[i]['value'] : null}></input>

                </td >
            </tr >)

    }
    // item.push(</form>)
    return items
}

const PropertyType2 = (props) => {
    const deleteProperty = (e) => {
        if (props.count > 1) {
            props.setting(props.count - 1);
        }
    }
    const items = []
    for (var i = 0; i < props.count; i++) {
        items.push(
            <tr className="w-full m-3 ">
                <td>
                    <button type="button" style={{ outline: "none" }} onClick={deleteProperty} className="w-full  border-2 border-grey-500 mt-2 p-2 py-2 rounded-md hover:shadow-lg focus:outline-none">
                        <i className="fa fa-times text-grey-500"></i>
                    </button>
                </td>
                <td >
                    <input id={i + "name"} className="w-full rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 focus:shadow-lg focus:border-none focus:outline-none" type="text" defaultValue={props.properties[i] != null ? props.properties[i]['name'] : null}></input>

                </td>
                <td >
                    <input id={i + "from"} className="w-full rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 focus:shadow-lg focus:border-none focus:outline-none" type="text" defaultValue={props.properties[i] != null ? props.properties[i]['value'] : null}></input>

                </td>
                <td>
                    <input value="Of" className="w-full rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 focus:shadow-lg focus:border-none focus:outline-none" type="text" ></input>

                </td>

                <td>
                    <input id={i + "to"} className="w-full rounded-md border-2 border-gray-200 mt-2 pl-2 py-2 focus:shadow-lg focus:border-none focus:outline-none" type="text" defaultValue={props.properties[i] != null ? props.properties[i]['max'] : null}></input>

                </td>
            </tr>)

    }
    return items
}


const Popup1 = (props) => {

    var [numberProperty, setnumberProperty] = useState(1);



    const addproperty = () => {
        setnumberProperty(numberProperty + 1);
        console.log(numberProperty);
    }
    const handleSubmit = () => {
        if (props.choice == 1) {
            //Adding data for property
            console.log({ 'Props choice1 =': numberProperty })
            //Push all data in props and lastly setproperties from props
            var propss = [];
            for (var i = 0; i < numberProperty; i++) {
                var name = document.getElementById(i + 'name').value;
                var value = document.getElementById(i + 'value').value;
                propss.push({ name: name, value: value })
            }
            props.setproperties([propss])
        }
        else {
            //Adding data for stats and level
            console.log({ 'Props choice2 =': numberProperty })
            //Push all data in props and lastly setproperties from props
            var propss = [];
            for (var i = 0; i < numberProperty; i++) {
                var name = document.getElementById(i + 'name').value;
                var from = document.getElementById(i + 'from').value;
                var to = document.getElementById(i + 'to').value;
                propss.push({ name: name, value: from, max: to })
            }
            props.setproperties([propss])
        }
        //When the user opens popup again so it should be reset and take all input again
        setnumberProperty(1);
        document.getElementById('closebutton').click()

    }

    return (
        <Popup className="rounded-md"
            trigger={<button style={{ outline: "none" }} className="button" type="button"><i className="fas fa-plus text-blue-500"></i></button>}
            modal
            nested

        >
            {close => (
                <div class=" flex flex-col mx-8 my-5" >
                    <div className="modal">
                        <div class="flex flex-row-reverse">
                            <button id="closebutton" style={{ outline: "none" }} className="close m-2" onClick={close}><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                        <div class="flex justify-center">
                            <h3 className="text-xl font-thin mt-2">Add Properties</h3>

                        </div>
                        <div class="flex m-1 " style={{ fontSize: "12px" }}>


                            {props.choice == 1 ? <p className="mt-2 ">Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</p> : null}

                            {props.choice == 2 ? <p className="mt-2 ">Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</p> : null}
                            {props.choice == 3 ? <p className="mt-2 ">Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</p> : null}

                        </div>

                        <table class="table-fixed inline-table w-full " style={{ fontSize: "12px" }}>
                            <thead>
                                {props.choice == 1 ? <tr className="head">
                                    <th className="w-1/12"></th>
                                    <th className="w-11/24">Type</th>
                                    <th className="w-11/24">Name</th>
                                </tr> : null}
                                {
                                    props.choice != 1 ? <tr className="head">
                                        <th className="w-1/12"></th>
                                        <th className="w-11/24">Name</th>
                                        <th className="w-22/120">Value</th>
                                        <th className="w-11/220"></th>
                                        <th className="w-22/120"></th>
                                    </tr> : null
                                }
                            </thead>

                            <tbody>


                                {/* <tr className="w-1/2">

                                </tr> */}
                                {props.choice == 1 ?
                                    <PropertyType1 id="property1" properties={props.properties} count={numberProperty} setting={(value) => setnumberProperty(value)} /> : null}
                                {props.choice != 1 ?
                                    <PropertyType2 count={numberProperty} properties={props.properties} setting={(value) => setnumberProperty(value)} /> : null}




                            </tbody>


                        </table>
                        <div class="flex flex-col">
                            <div class="flex flex-row">
                                <button onClick={addproperty} class="bg-white-400 w-32 px-3 py-3 mx-1 my-2 rounded m-3  border-blue-400 font-bold" style={{ color: "rgb(32, 129, 226)", borderWidth: "1px", fontSize: "13px", outline: "none" }}>Add More</button>
                            </div>
                            <div class="flex justify-center">
                                <button onClick={handleSubmit} class="bg-blue-400 font-bold w-32 px-3 py-2  rounded m-3" style={{ color: "white", outline: "none" }}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default Popup1;

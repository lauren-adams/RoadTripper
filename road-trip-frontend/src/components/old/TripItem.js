import {useState} from "react";
import {useHistory} from "react-router-dom";

const tripArr = [{name: "trip1", startLocation: "Waco", stopLocation: "Toronto", tripDate: "2022/2/2", stops: ["Dallas", "Memphis"]}];

// change to () for test
const TripItem = () => {
    return (
        <>
            <h3><center>Trips</center></h3>
            <div>
                <h4>{tripArr[0].name}</h4>
                <p>Start Location: {tripArr[0].startLocation}</p>
                <p>Stop Location : {tripArr[0].stopLocation}</p>
                <p>Trip Date     : {tripArr[0].tripDate}</p>
            </div>
        </>
    )
}

// const TripItem = props => {
//     const [data, setData] = useState({
//         startLocation: "",
//         stopLocation: "",
//         tripDate: "",
//         stops: "" //array for stops would be great
//     })
//     const history = useHistory()
//     const [touched, setTouched] = useState({});
//     const [editing, setEditing] = useState(false);
//
//     const editHandler = (event) => {
//         setEditing(true);
//     }
//     const handleUpdateDone = (event) => {
//         if (event.key === "Enter"){
//             setEditing(false);
//         }
//     }
//     let viewMode = {}
//     let editMode = {}
//     if(editing){
//         viewMode.display = "none"
//     }
//     else{
//         viewMode.display = "none"
//     }
//
//     return (
//         <div>hello</div>
//     );
//     // <li className="" >
//     //     <label>TripItem Name</label>
//     //     <input type="text" style={editMode} value="TripItem Name" onChange={e => {
//     //         props.setUpdate(e.target.value, id)}} onKeyDown={handleUpdateDone} />
//     //     <label>Starting Location</label>
//     //     <input type="text" style={editMode} value="Starting Location" onChange={e => {
//     //         props.setUpdate(e.target.value, id)}} onKeyDown={handleUpdateDone} />
//     //     <label>Ending Location</label>
//     //     <input type="text" style={editMode} value="Ending Location" onChange={e => {
//     //         props.setUpdate(e.target.value, id)}} onKeyDown={handleUpdateDone} />
//     //
//     //
//     // </li>
// };

export default TripItem;

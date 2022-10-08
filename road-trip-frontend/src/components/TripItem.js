import {useState} from "react";
import {useHistory} from "react-router-dom";


const TripItem = props => {
    const [data, setData] = useState({
        startLocation: "",
        stopLocation: "",
        tripDate: "",
        stops: "" //array for stops would be great
    })
    const history = useHistory()
    const [touched, setTouched] = useState({});
    const [editing, setEditing] = useState(false);

    const editHandler = (event) => {
        setEditing(true);
    }
    const handleUpdateDone = (event) => {
        if (event.key === "Enter"){
            setEditing(false);
        }
    }
    let viewMode = {}
    let editMode = {}
    if(editing){
        viewMode.display = "none"
    }
    else{
        viewMode.display = "none"
    }

    // TODO: the temp function for print the trip name
    function printList(passInValue) {
        return(
            <>
                <ul>
                    {passInValue.map((tripp) => (tripName(tripp)))}
                </ul>
            </>
        )
    }

    // TODO: call this function to print name
    function tripName(props) {
        return(<li>{props.name}</li>)
    }

    return (
        <div>hello</div>
    );
    // <li className="" >
    //     <label>TripItem Name</label>
    //     <input type="text" style={editMode} value="TripItem Name" onChange={e => {
    //         props.setUpdate(e.target.value, id)}} onKeyDown={handleUpdateDone} />
    //     <label>Starting Location</label>
    //     <input type="text" style={editMode} value="Starting Location" onChange={e => {
    //         props.setUpdate(e.target.value, id)}} onKeyDown={handleUpdateDone} />
    //     <label>Ending Location</label>
    //     <input type="text" style={editMode} value="Ending Location" onChange={e => {
    //         props.setUpdate(e.target.value, id)}} onKeyDown={handleUpdateDone} />
    //
    //
    // </li>
};

export default TripItem;

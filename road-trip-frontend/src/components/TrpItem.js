import { useContext, useState } from 'react';


import classes from './TripItem.module.css';
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

function TrpItem(props) {
    const [showBox, setShowBox] = useState(true);
    const userCtx = useContext(UserContext);
    console.log(props);
    const history = useHistory();

    //const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    function toggleFavoriteStatusHandler() {
        console.log("DELETE SOON");
    }

    function editHandler() {
        console.log("Edit");
        console.log(props.startLoc, props.endLoc, props.date, props.rating, props.id)
        userCtx.setCurTrip(props.startLoc, props.endLoc, props.date, props.rating, props.id);
        console.log(userCtx.start + userCtx.tid + userCtx.end + userCtx.rating + userCtx.date);
        history.push("/edit-trip");
    }

    function addStopHandler() {
        console.log("add stop");
        userCtx.setCurTrip(props.startLoc, props.endLoc, props.date, props.rating, props.id);
        history.push("/add-stop");
    }


    function viewStopHandler() {
        console.log("view stop");
        userCtx.setCurTrip(props.startLoc, props.endLoc, props.date, props.rating, props.id);
        history.push("/view-stops");
    }
    //[{"id":1,"userID":"1","startLoc":"your","endLoc":"NO","startDate":"today","rating":5,"stopList":[]},
    return (
        <li className={classes.item}>
            <div className={classes.card} >

                <div className={classes.content}>
                    <h3>Trip{props.id}</h3>
                    <p>From: {props.startLoc}</p>
                    <p>To: {props.endLoc}</p>
                    <p>Date: {props.date}</p>
                    <p>Rating: {props.rating}</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={editHandler}>
                        {'Edit'}
                    </button>
                    <button onClick={() => props.show(props.id)}>
                        {'Delete'}
                    </button>
                    <button onClick={addStopHandler}>
                        {'Add Stop'}
                    </button>
                    <button onClick={viewStopHandler}>
                        {'View Stops'}
                    </button>
                </div>
            </div>
        </li>

    );
}

export default TrpItem;
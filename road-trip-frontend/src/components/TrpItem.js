import { useContext } from 'react';


import classes from './TripItem.module.css';
import UserContext from "./UserContext";

function TrpItem(props) {
    const userCtx = useContext(UserContext);
    console.log(props);

    //const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    function toggleFavoriteStatusHandler() {
        console.log("DELETE SOON");
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
                    <button onClick={toggleFavoriteStatusHandler}>
                        {'Delete'}
                    </button>
                </div>
            </div>
        </li>
    );
}

export default TrpItem;
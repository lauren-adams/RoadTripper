import { useContext } from 'react';


import classes from './TripItem.module.css';
import UserContext from "./UserContext";

function TrpItem(props) {
    const userCtx = useContext(UserContext);

    //const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    function toggleFavoriteStatusHandler() {
        console.log("DELETE SOON");
    }

    return (
        <li className={classes.item}>
            <div className={classes.card} >
                <div className={classes.image}>
                    <img src={props.image} alt={props.title} />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <address>{props.address}</address>
                    <p>{props.description}</p>
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
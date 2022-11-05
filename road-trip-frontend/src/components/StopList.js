import React, { useState, useEffect } from 'react';

import TrpList from './TrpList';
import { useContext } from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import TrpItem from "./TrpItem";
import classes from "./TripItem.module.css";






function StopList() {
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrips, setLoadedTrips] = useState([]);

    useEffect(() => {
        console.log(userCtx.username + userCtx.email + userCtx.id);
        setIsLoading(true);
        fetch(
            'https://subjecttochange.dev/api/trip/' + userCtx.tid + '/stop'
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                const trips = [];

                for (const key in data) {
                    const trip = {
                        id: key,
                        ...data[key]
                    };
                    /*** TODO when stops get flagged we will need to
                     * implement somehting that limits the stops because database is flooded
                     */
                   /* if (trip.flagstop = true) {
                        trips.push(trip);
                    }*/

                    trips.push(trip);
                }
                console.log("trips" + trips);
                setIsLoading(false);
                setLoadedTrips(trips);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <div>
            <section>
                <h1>Stops</h1>
                <div>
                    <ul className={classes.list}>
                        {loadedTrips.map(item => {
                            return <li className={classes.item}><div className={classes.card} >

                                <div className={classes.content}>{item.stopLoc}</div></div></li>;
                        })}
                    </ul>
                </div>
            </section>
            <Link to="/view-trips">Back</Link></div>
    );


}


export default StopList;
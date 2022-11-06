import React, { useState, useEffect } from 'react';

import TrpList from './TrpList';
import { useContext } from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import WebHeader from "./WebHeader";


function Trp() {
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrips, setLoadedTrips] = useState([]);

    useEffect(() => {
        console.log(userCtx.username + userCtx.email + userCtx.id);
        setIsLoading(true);
        fetch(
            'https://subjecttochange.dev/api/trip?userID=' + userCtx.id
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

                    trips.push(trip);
                }

                setIsLoading(false);
                setLoadedTrips(trips.reverse());
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }
    if (userCtx.isLoggedIn) {

    return (
        <div>
            <WebHeader />
            <section>
                <h1>Saved Trips</h1>
                <TrpList trips={loadedTrips}/>
            </section>
            <Link to="/home">Home</Link></div>
    );
} else {
        return (
            <div>
                <WebHeader />
                <section>
                    <h1>Saved Trips</h1>
                    <p> log in to be able to save trips</p>
                </section>
                <Link to="/home">Home</Link></div>
        );
    }

}

export default Trp;
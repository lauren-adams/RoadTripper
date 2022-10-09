import { useState, useEffect } from 'react';

import TrpList from './TrpList';
import { useContext } from 'react';
import UserContext from "./UserContext";






function Trp() {
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrips, setLoadedTrips] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            'https://react-getting-started-48dec-default-rtdb.firebaseio.com/meetups.json'
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const trips = [];

                for (const key in data) {
                    const trip = {
                        id: key,
                        ...data[key]
                    };

                    trips.push(trip);
                }

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
        <section>
            <h1>Saved Trips</h1>
            <TrpList trips={loadedTrips} />
        </section>
    );
}

export default Trp;
import React, { useState, useEffect } from 'react';

import TrpList from './TrpList';
import { useContext } from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";
import DeleteConfirmation from "./DeleteConfirmation";
import axios from "axios";
import WebHeader from "./WebHeader";

 


function Trp() {
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrips, setLoadedTrips] = useState([]);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [tripMessage, setTripMessage] = useState(null);
    const [trpId, setTrpId] = useState(null);

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
    // Handle the displaying of the modal based on type and id
    const showDeleteModal = (id) => {
        console.log(loadedTrips);
        setTrpId(id);
        setTripMessage(null);
        setDeleteMessage(`Are you sure you want to delete the trip '${loadedTrips.find((x) => x.id === id).id}'?`);
        setDisplayConfirmationModal(true);
    };

    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    // Handle the actual deletion of the item
    const submitDelete =  (id) => {
        console.log(id);
        setTripMessage(`The trip '${loadedTrips.find((x) => x.id === id).id}' was deleted successfully.`);
        setLoadedTrips(loadedTrips.filter((trip) => trip.id !== id));
        setDisplayConfirmationModal(false);
        console.log("Delete");
        let delUrl = 'https://subjecttochange.dev/api/trip/' + id;
        let delUrl2 = 'http://localhost:8080/trip/' + id;
        const delData = async () => {
            //const responseA = axios.post(urlApi);
            const responseA = axios({
                method: 'delete',
                url: delUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        delData()
    };

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
                {tripMessage && <Alert variant="success">{tripMessage}</Alert>}
                <TrpList trips={loadedTrips}
                    show = {showDeleteModal}
                    hide = {hideConfirmationModal}
                    submit = {submitDelete}/>
            </section>
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={trpId} message={deleteMessage}  />
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
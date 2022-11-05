import React, {useState, useEffect} from 'react';

import {useContext} from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import {Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, Grid, Text} from "@chakra-ui/react";
import {Autocomplete, DirectionsRenderer, GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import {FaLocationArrow} from "react-icons/fa";
import classes from "./TripItem.module.css";

function ViewStops() {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDm3fa141BAW4SlncLns36sYTTk4gx2BOw',
        libraries: ['places'],
    })
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrips, setLoadedTrips] = useState([]);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

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
                /* TODO only push to list when flagged */
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

    const logOut = () => {
        userCtx.setMyUser("", "", false);
    };

    const center = {lat: 31.559814, lng: -97.141800}

    // TODO: get data from backend
    const getTrip = (event) => {
        event.preventDefault();
        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `trip`;

        const getData = async (data) => {
            // TODO: how to get data
        }
    }

    const google = window.google;
/*TODO need to write code that will fill waypoints based on data in Loaded trips*/
    async function getRoute() {
        const directionsService = new google.maps.DirectionsService()
        const result = await directionsService.route({
            origin: userCtx.start,
            destination: userCtx.end,
            waypoints:
                [{location: 'Chicago, IL', stopover: true},
                    {location: 'Indianapolis, IN', stopover: true}],
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(result)
        setDistance(result.routes[0].legs[0].distance.text)
        setDuration(result.routes[0].legs[0].duration.text)

        setMap(map);
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/home"} className="navbar-brand">
                    SubjectToChange
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/maps"} className="nav-link">
                            Make A Trip
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/view-trips"} className="nav-link">
                            Trips
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/music"} className="nav-link">
                            Music
                        </Link>
                    </li>
                </div>


                {userCtx.isLoggedIn ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {userCtx.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/home" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                    </div>
                )}

            </nav>

            <Flex
                position='relative'
                flexDirection='column'
                alignItems='center'
                h='100vh'
                w='100vw'
            >
                <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                    {/* Google Map Box */}
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{width: '100%', height: '100%'}}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={(map) => setMap(map)}
                    >
                        {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
                    </GoogleMap>
                </Box>

                {/*Trip Info*/}
                <Box
                    p={4}
                    borderRadius='lg'
                    m={4}
                    bgColor='white'
                    shadow='base'
                    minW='container.md'
                    zIndex='1'>
                    <Box flexGrow={1}>
                        <Text>
                            {/*TODO: The value need to be added*/}
                            Start: {userCtx.start} Destination: {userCtx.end}
                        </Text>
                        <Text>Distance: {distance} </Text>
                        <Text>Duration: {duration} </Text>
                    </Box>
                </Box>
                <HStack spacing={4} mt={4} justifyContent='space-between'>
                    <Button colorScheme='pink' onClick={getRoute}>Generate</Button>
                    <IconButton
                        aria-label='center back'
                        icon={<FaLocationArrow/>}
                        colorScheme='pink'
                        isRound
                        onClick={() => {
                            map.panTo(center)
                            map.setZoom(15)
                        }}
                    />
                </HStack>

                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                <Box
                    p={4}
                    borderRadius='sm'
                    m={4}
                    bgColor='white'
                    shadow='base'
                    minW='100px'
                    zIndex='1'>
                    <Box flexGrow={1}>
                        <div>
                            <h2> Stops </h2>
                            <ul className={classes.list}>
                                {loadedTrips.map(item => {
                                    return <li className={classes.item}><div className={classes.card} >

                                        <div className={classes.content}>{item.stopLoc}</div></div></li>;
                                })}
                            </ul>
                        </div>
                    </Box>
                </Box>
                </Grid>
            </Flex>
        </div>
    )
}

export default ViewStops;

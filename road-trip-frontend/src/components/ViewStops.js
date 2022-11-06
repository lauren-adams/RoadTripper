import React, {useState, useEffect} from 'react';

import {useContext} from 'react';
import UserContext from "./UserContext";
import {Box, Button, Flex, HStack, IconButton, Grid, Text, Select} from "@chakra-ui/react";
import {Autocomplete, DirectionsRenderer, GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import {FaLocationArrow} from "react-icons/fa";
import classes from "./TripItem.module.css";
import WebHeader from "./WebHeader";

function ViewStops() {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDm3fa141BAW4SlncLns36sYTTk4gx2BOw',
        libraries: ['places'],
    })

    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrips, setLoadedTrips] = useState([]);
    const [loadedWaypoints, setLoadedWaypoints] = useState([]);
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
                const waypoints = [];

                for (const key in data) {
                    const trip = {
                        id: key,
                        ...data[key]
                    };
                    const loc = {
                        lat: trip.lattitude,
                        lng: trip.longitude
                    }

                    const waypoint = {
                        location: loc,
                        stopover: true
                    }
                    console.log(trip);
                    console.log(waypoint);
                    /* TODO only push to list when flagged */
                    trips.push(trip);
                    waypoints.push(waypoint);
                }
                console.log("trips" + trips);
                setIsLoading(false);
                setLoadedTrips(trips);
                setLoadedWaypoints(waypoints);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

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
            waypoints: loadedWaypoints,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(result)
        setDistance(result.routes[0].legs[0].distance.text)
        setDuration(result.routes[0].legs[0].duration.text)

        setMap(map);
    }

    return (
        <div>
            <WebHeader/>

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

                <Box
                    p={4}
                    borderRadius='lg'
                    m={4}
                    bgColor='white'
                    shadow='base'
                    height='60%'
                    width='300px'
                    zIndex='1'
                    alignSelf='flex-start'
                    scrollBehavior='smooth'
                    overflow='scroll'
                >
                    {/*<Box flexGrow={1}>*/}
                        <div align='center'>
                            <h1> Stops </h1>
                            <nav>
                                <ul className={classes.list}>
                                    {loadedWaypoints.map(item => {
                                        return (
                                            <li className={classes.item} >
                                                <div className={classes.card}>
                                                    <div className={classes.content}>hi</div>
                                                </div>
                                                <Select placeholder='Rating'>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                </Select>
                                                <Button colorScheme='pink' size='sm'>delete</Button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    {/*</Box>*/}
                </Box>
            </Flex>
        </div>
    )
}

export default ViewStops;

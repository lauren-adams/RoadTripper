import React, {useState, useEffect} from 'react';

import {useContext} from 'react';
import UserContext from "./UserContext";
import {Box, Button, Flex, HStack, IconButton, Text, Select, Link, textDecoration} from "@chakra-ui/react";
import {DirectionsRenderer, GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {FaLocationArrow} from "react-icons/fa";
import classes from "./TripItem.module.css";
import WebHeader from "./WebHeader";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function ViewStops(props) {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDm3fa141BAW4SlncLns36sYTTk4gx2BOw',
        libraries: ['places'],
    })

    const cookies = new Cookies();
    const history = useHistory();
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrips, setLoadedTrips] = useState([]);
    const [loadedWaypoints, setLoadedWaypoints] = useState([]);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [selectedStops, setSelectedStops] = useState([]);
    const [allStops, setAllStops] = useState([]);

    useEffect(() => {
        console.log(userCtx.username + userCtx.email + userCtx.id);
        console.log(userCtx.tid);
        setIsLoading(true);
        fetch(
            'https://subjecttochange.dev/api/trip/' + userCtx.tid + '/stop', {
                headers: {
                    'Authorization': `Bearer ${cookies.get('jwt')}`
                }
            }
        ).then((response) => {
            console.log(response.json());
            return response.json();
        }).then((data) => {
            // setAllStops(data);
            console.log(data);

            const trips = [];
            const waypoints = [];
            // Not refreshable because of this line
            data = data.filter(x => x.flagStop === true);
            setSelectedStops(data);
            console.log("selected" + selectedStops);
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
                waypoints.push(waypoint);
                trips.push(trip);
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

    const google = window.google;

    /**
     * This is to get new route with waypoints along
     */
    async function getRoute() {
        const directionsService = new google.maps.DirectionsService()
        const result = await directionsService.route({
            origin: userCtx.start,
            destination: userCtx.end,
            waypoints: loadedWaypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(result)
        setDistance(result.routes[0].legs[0].distance.text)
        setDuration(result.routes[0].legs[0].duration.text)

        setMap(map);
    }

    /**
     * To delete stops when click button
     */
    function deleteStop(stop) {
        stop.flagStop = false;
        selectedStops.push(stop);
        console.log("check this " + stop.flagStop);
        const base = 'https://subjecttochange.dev/api'
        //const base = `http://localhost`
        const urlApi = base + '/trip/' + userCtx.tid + '/stop';
        const pushData = async () => {
            const responseA = axios({
                method: 'post',
                url: urlApi,
                headers: {
                    Authentication: `Bearer ${cookies.get('jwt')}`
                },
                data: selectedStops
            });
            console.log(urlApi);
            console.log(responseA);
        }
        pushData();

        const newLoadTripStop = loadedTrips.filter((item) => item !== stop);
        setLoadedTrips(newLoadTripStop);
        // Remove display stop
        setLoadedWaypoints(current =>
            current.filter(s => {
                return s.location.lat !== stop.lattitude;
            }),
        );
    }


    /**
     * To set rating for each stop
     */
    function setRating(stop, value) {
        console.log("check this " + stop.myRating);
        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `/trip/` + userCtx.tid + `/stop`;
        stop.myRating = value;
        selectedStops.push(stop);

        const pushData = async () => {
            const responseA = axios({
                method: 'post',
                url: urlApi,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authentication: `Bearer ${cookies.get('jwt')}`
                },
                data: selectedStops
            });
            console.log(urlApi);
            console.log(responseA);
        }
        pushData();

        const newLoadTripStop = loadedTrips.filter((item) => item !== stop);
        setLoadedTrips(newLoadTripStop);
        setLoadedWaypoints(current =>
            current.filter(s => {
                return s.location.lat !== stop.lattitude;
            }),
        );
    }

    function addStopHandler() {
        console.log("add stop");
        history.push("/add-stop");
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
                    zIndex='1'
                    align='center'
                >
                    <Box flexGrow={1}>
                        <Text>
                            Start: {userCtx.start} Destination: {userCtx.end}
                        </Text>
                        <Text>Distance: {distance} </Text>
                        <Text>Duration: {duration} </Text>
                    </Box>
                </Box>
                <HStack spacing={4} mt={4} justifyContent='space-between'>
                    <Button colorScheme='pink' onClick={addStopHandler}>Add Stop</Button>
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

                {Object.keys(loadedTrips).length === 0 ?
                    <div></div>
                    :
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
                        <div align='center'>
                            <h1> Stops </h1>
                            <nav>
                                <ul className={classes.list}>
                                    {loadedTrips.map(stop => {
                                        return (
                                            <li className={classes.item} key={stop}>
                                                <div className={classes.card}>
                                                    <Text className={classes.content}>{stop.stopLoc}</Text>
                                                </div>
                                                <Select placeholder={stop.myRating !== 0 ? stop.myRating : "Rating"}>
                                                    <option value='1' onSelect={() => setRating(stop, 1)}>1</option>
                                                    <option value='2' onSelect={() => setRating(stop, 2)}>2</option>
                                                    <option value='3' onSelect={() => setRating(stop, 3)}>3</option>
                                                    <option value='4' onSelect={() => setRating(stop, 4)}>4</option>
                                                    <option value='5' onSelect={() => setRating(stop, 5)}>5</option>
                                                </Select>
                                                {/*<Button colorScheme="blue" size='sm' margin='1'*/}
                                                {/*        onClick={() => setStopRating(stop)}>Save</Button>*/}
                                                <Button onClick={() => deleteStop(stop)} colorScheme='pink' size='sm'
                                                        margin='1'>Delete</Button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </Box>
                }
            </Flex>
        </div>
    )
}

export default ViewStops;

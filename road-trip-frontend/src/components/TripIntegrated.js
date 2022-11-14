import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    MARKER_LAYER,
} from '@react-google-maps/api'

import {
    Box,
    Button,
    ButtonGroup,
    color,
    Flex,
    HStack,
    IconButton,
    Input,
    position,
    SkeletonText,
    Text,
    Select,
} from '@chakra-ui/react'

import { useRef, useState } from 'react'
import axios from "axios";
import { useContext } from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";


const center = { lat: 31.5501, lng: -97.1135 }
let markers = [];
let PolygonBound;
let waypoints = [];
let arrayStops = [];
function TripIntegrated() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDm3fa141BAW4SlncLns36sYTTk4gx2BOw',
        libraries: ['places'],
    })

    const userCtx = useContext(UserContext);
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const originRef = useRef()
    const destinationRef = useRef()
    const dateRef = useRef()
    const ratingRef = useRef()
    const radiusRef = useRef()
    const preferenceRef = useRef()
    

    const polyline = require("google-polyline");
    
    const google = window.google;

    if (!isLoaded) {
        return <SkeletonText />;
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({

            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        waypoints = polyline.decode(results.routes[0].overview_polyline);
        console.log(waypoints)
        // service = new google.maps.places.PlacesService(map);
        const PolygonCoords = PolygonPoints();
        PolygonBound = new google.maps.Polygon({
            paths: PolygonCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });

        PolygonBound.setMap(map);

        const service = new google.maps.places.PlacesService(map);
        let currentWaypoint = 0;
        let callback =(results, status) =>{
            currentWaypoint++;
            console.log(results)
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    const infoWindow = new google.maps.InfoWindow();

                    //if(google.maps.geometry.poly.containsLocation(results[i].geometry.location,PolygonBound) == true) {
                    const marker = new google.maps.Marker({
                        position: results[i].geometry.location,
                        map,
                        title: results[i].name,
                        label: {
                            text: getLabelByType(results[i].types), 
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "18px",
                        },
                    });
                    console.log(results[i].photos[0].getUrl())
                    arrayStops.push({
                        "stopLoc": results[i].name,
                        "image": (results[i].photos && results[i].photos.length > 0) ? results[i].photos[0].getUrl() : "",
                        "lattitude": results[i].geometry.location.lat(),
                        "longitude": results[i].geometry.location.lng(),
                        "type": results[i].types.join(),
                        "rating": results[i].rating,
                        "address": results[i].vicinity,
                         "waypointNumber" : currentWaypoint
                    })
                    markers.push(marker)
                    marker.addListener("click", () => {
                        infoWindow.close();
                        infoWindow.setContent(marker.getTitle());
                        infoWindow.open(marker.getMap(), marker);
                    });

                  
                    //}
                }

            }
        }
        console.log("length waypoint", waypoints.length)
        for (let j = 0; j < waypoints.length; j += 40) {
            service.nearbySearch({
                location: { lat: waypoints[j][0], lng: waypoints[j][1] },
                radius: (radiusRef.current.value*1609.344),
                type: preferenceRef.current.value.split(",")
            }, callback);


     }

        let getLabelByType=(types)=>{
            if(types.includes("church")) return "\ueaae"
            if(types.includes("restaurant")) return "\ue56c"
            if(types.includes("gas_station")) return "\ue546"
            if(types.includes("doctor")) return "\uf033"
            if(types.includes("car_wash")) return "\ue542"
        }

        console.log(waypoints[0]);
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }
    const saveStops = (trip) => {
        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `/trip/${trip.id}/stop`;
        arrayStops.map(x=>x.tripId = trip.id)
        console.log("Data" , arrayStops)
        const pushData = async () => {
            //const responseA = axios.post(urlApi);

            const stopA = await axios({
                method: 'post',
                url: urlApi,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: arrayStops

            });
            console.log("Stops" + stopA);
        }

        pushData();
    };
    
    const saveTrip = (event) => {
        event.preventDefault();
        const base = `https://subjecttochange.dev/api`
        //const base = `http://localhost:8080`
        const urlApi = base + `/trip`;
        console.log("Savetrip function")
        console.log("Waypoints", waypoints)
        console.log("Array Stops" , arrayStops)
        //console.log(data.start + data.end + data.date + userCtx.username + userCtx.email + userCtx.id);
        console.log("ID: " + userCtx.id + originRef.current.value + destinationRef.current.value);
        const pushData = async () => {
            //const responseA = axios.post(urlApi);

            const responseA = await axios({
                method: 'post',
                url: urlApi,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: {
                    'startLoc': originRef.current.value,
                    'endLoc': destinationRef.current.value,
                    'startDate': dateRef.current.value,
                    'userID': userCtx.id,
                    'rating': ratingRef.current.value,
                    'radius':radiusRef.current.value,
                    'preference': preferenceRef.current.value
                }

            });
            console.log("responseA" , responseA);
            saveStops(responseA.data)
        }

        pushData();

    };

    
    function PolygonPoints() {

        let polypoints = waypoints
        let PolyLength = polypoints.length;

        let UpperBound = [];
        let LowerBound = [];

        for (let j = 0; j <= PolyLength - 1; j++) {
            let NewPoints = PolygonArray(polypoints[j][0]);
            UpperBound.push({ lat: NewPoints[0], lng: polypoints[j][1] });
            LowerBound.push({ lat: NewPoints[1], lng: polypoints[j][1] });
        }
        let reversebound = LowerBound.reverse();

        let FullPoly = UpperBound.concat(reversebound);

        return FullPoly;
    }

    function PolygonArray(latitude) {
        const R = 6378137;
        const pi = 3.14;
        //distance in meters
        const upper_offset = 300;
        const lower_offset = -300;

        const Lat_up = upper_offset / R;
        const Lat_down = lower_offset / R;
        //OffsetPosition, decimal degrees
        const lat_upper = latitude + (Lat_up * 180) / pi;
        const lat_lower = latitude + (Lat_down * 180) / pi;

        return [lat_upper, lat_lower];
    }


    function clearRoute() {
        
        originRef.current.value = ''
        destinationRef.current.value = ''
        originRef.current.value = ''
        dateRef.current.value = ''
        preferenceRef.current.value = ''
        radiusRef.current.value = ''
        console.log(markers)
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        markers.forEach(x=>{
            if(x)
            x.setMap(null)
        })
        markers = [];
        PolygonBound.setPath([])
        console.log(PolygonBound)
        //PolygonBound.remove()
        
    }


    return (
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
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
            <Box
                p={4}
                borderRadius='lg'
                m={4}
                bgColor='white'
                shadow='base'
                minW='container.md'
                zIndex='1'
            >
                <HStack spacing={2} justifyContent='space-between'>
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input type='text' placeholder='Origin' ref={originRef} />
                        </Autocomplete>
                    </Box>
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input type='text' placeholder='Destination' ref={destinationRef} />
                        </Autocomplete>
                    </Box>
                    <Box flexGrow={1}>
                        <Input
                            type='text'
                            placeholder='Date'
                            ref={dateRef}
                        />
                    </Box>
                    <Box flexGrow={1}>
                        <Input
                            type='text'
                            placeholder='Rating {1..5}'
                            ref={ratingRef}
                        />
                    </Box>
                    <Box flexGrow={1}>
                        <Input
                            type='text'
                            placeholder='Radius {in miles}'
                            ref={radiusRef}
                        />
                    </Box>

                    <ButtonGroup>
                        <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                            Calculate Route
                        </Button>
                        {userCtx.isLoggedIn ? (
                            <Button colorScheme='pink' type='submit' onClick={saveTrip}>
                                Save
                            </Button>) : (
                                <p></p>

                        )
                        }


                        <IconButton
                            aria-label='center back'
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        />
                    </ButtonGroup>
                </HStack>
                <HStack spacing={2} justifyContent='space-between'>

                    {/* <Box flexGrow={1}>
                        <Input
                            type='text'
                            placeholder='Preference separated by comma'
                            ref={preferenceRef}
                        />
                    </Box> */}
                    <Select placeholder='Select Preferences' ref={preferenceRef}>
                        <option value='church'>Places of worship</option>
                        <option value='restaurant'>Restaurants</option>
                        <option value='gas_station'>Gas Station</option>
                        <option value='doctor'>Doctor</option>
                        <option value='car_wash'>Car Wash</option>
                    </Select>

                </HStack>
                <HStack spacing={4} mt={4} justifyContent='space-between'>
                    <Text>Distance: {distance} </Text>
                    <Text>Duration: {duration} </Text>
                    <IconButton
                        aria-label='center back'
                        icon={<FaLocationArrow />}
                        isRound
                        onClick={() => {
                            map.panTo(center)
                            map.setZoom(15)
                        }}
                    />
                </HStack>
            </Box>
        </Flex>
    )
}

export default TripIntegrated;

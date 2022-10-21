
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'

import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'

import { useRef, useState } from 'react'
import axios from "axios";
import { useContext } from 'react';
import UserContext from "./UserContext";




const center = { lat: 48.8584, lng: 2.2945 }

function TripIntegrated() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDm3fa141BAW4SlncLns36sYTTk4gx2BOw',
        libraries: ['places'],
    })

    const userCtx = useContext(UserContext);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const originRef = useRef()
    const destinationRef = useRef()
    const dateRef = useRef()
    const ratingRef = useRef()

    if (!isLoaded) {
        return <SkeletonText/>;
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
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    const saveTrip = (event) => {
        event.preventDefault();
        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `/trip`;
        console.log("Savetrip function")
        //console.log(data.start + data.end + data.date + userCtx.username + userCtx.email + userCtx.id);
        console.log("ID: " + userCtx.id + originRef.current.value + destinationRef.current.value);
        const pushData = async () => {
            //const responseA = axios.post(urlApi);

            const responseA = axios({
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
                    'rating': ratingRef.current.value
                }

            });
            console.log("responseA" + responseA);
        }

        pushData();
    };

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
        originRef.current.value = ''
        dateRef.current.value = ''
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

                    <ButtonGroup>
                        <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                            Calculate Route
                        </Button>
                        <Button colorScheme='pink' type='submit' onClick={saveTrip}>
                            Save
                        </Button>
                        <IconButton
                            aria-label='center back'
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        />
                    </ButtonGroup>
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
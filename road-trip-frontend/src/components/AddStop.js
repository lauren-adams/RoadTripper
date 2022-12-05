import React, { useEffect, useState } from "react";
//Icon
import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
// Validate
import { validate } from "./validate";
// Styles
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
//
import { Link } from "react-router-dom";
// Axios

import axios from "axios";

import { useHistory } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useContext, useRef } from 'react';
import UserContext from "./UserContext";
import Filter from "./StopFilter";
import { Center, Image, Flex, Badge, Text } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Input,
} from '@chakra-ui/react'
import WebHeader from "./WebHeader";
import Cookies from "universal-cookie";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    MARKER_LAYER,
} from '@react-google-maps/api'


const AddStop = () => {
    const cookies = new Cookies();
    let wayPoints = [];
    let selectedStops = [];
    let isLoading = true;
    const userCtx = useContext(UserContext);
    //renders the html again when there is a change int the loadedtrips
    // the useState()
    const [loadedTrips, setLoadedTrips] = useState([]);
    console.log(userCtx.username + userCtx.email + userCtx.id + userCtx.tid);
    const [data, setData] = useState({
        start: "",
        end: "",
        date: "",
        rating: 0
    });

    const history = useHistory();
    
    const [customLoc, setCustomLoc] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});


    useEffect(() => {
        //setErrors(validate(data, "signUp"));

        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `/trip/` + userCtx.tid + `/stop`;
        axios({
            method: 'get',
            url: urlApi,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authentication: `Bearer ${cookies.get('jwt')}`
            }

        })
            .then((response) => {
                console.log("trip response", response)
                response.data.forEach(element => {
                    let way_point = wayPoints.find(x => x.way_point === element.waypointNumber)
                    if (way_point) {
                        way_point.stop.push(element)
                    } else {
                        wayPoints.push({
                            way_point: element.waypointNumber,
                            stop: [element]
                        })
                    }
                });
                console.log("trip waypoint", wayPoints)
                setLoadedTrips(wayPoints);
                isLoading = false;
            })
    }, [data, touched]);

    const changeHandler = (event) => {
        if (event.target.name === "IsAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked });
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };


    const submitHandler = (selectedStops) => {
        history.push("/view-trips");
        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `/trip/` + userCtx.tid + `/stop`;
        console.log(data.start + data.end + data.date + userCtx.username + userCtx.email + userCtx.id);
        console.log("ID: " + userCtx.id);
        const pushData = async () => {
            //const responseA = axios.post(urlApi);

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
            //console.log(data.start + data.end + data.date +  userCtx.id + data.rating);
            console.log(responseA);
            let c = document.getElementById("customLocations")
            c.value=""

        }
        pushData();

    };

    function addStop(e, stop) {
        if (e.target.checked) {
            stop.flagStop = true;
            selectedStops.push(stop)
        } else {
            // let removeIndex = selectedStops.findIndex(x => x.id === stop.id);
            // selectedStops.splice(removeIndex, 1)
            stop.flagStop = false;
            let foundStop = selectedStops.find(s => s.id == stop.id)
            if (foundStop) {
                foundStop.flagStop = false;
            } else {
                selectedStops.push(stop)
            }

        }
    }

    function save() {
        submitHandler(selectedStops)

    }

    function addCustomStop() {
        console.log(customLoc, "customLoc")
        let c = document.getElementById("customLocations")
        if(c){
            console.log(c.value, "c val")
        }
       
        const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ address: c.value }, function (results, status) {
                if (status == window.google.maps.GeocoderStatus.OK) {
                    console.log(results, "result")
                    const newObj = {
                        "stopLoc": c.value,
                        "image": (results[0].photos && results[0].photos.length > 0) ? results[0].photos[0].getUrl() : "",
                        "lattitude": results[0].geometry.location.lat(),
                        "longitude": results[0].geometry.location.lng(),
                        "type": results[0].types.join(),
                        "address": results[0].formatted_address,
                        "waypointNumber": 1,
                        "flagStop": true,
                        "tripId" : userCtx.tid
                    }
                    console.log(newObj)
                    submitHandler([newObj])
                }
            })
    }

    function addCard(stop) {
        return <Checkbox w="100%" onChange={(e) => addStop(e, stop)} defaultChecked={stop.flagStop}>
            <Text>
                {`${stop.stopLoc}   ,   ${stop.address}`},
            </Text>
        </Checkbox>


    }


    return (
        <div>
            <WebHeader />
            <div>

            </div>
            <Box m="5%" border p="5%" w="90%" borderWidth="1px">
                <Text fontSize="xl" fontWeight="semibold" lineHeight="short" flex='1' textAlign='center'>Select
                    Stops</Text>
                <Box flexGrow={1} m={"1%"} className="addBox">
                    <Autocomplete >
                        <Input type='text' placeholder='Add Custom Stop' id='customLocations'/>
                    </Autocomplete>
                    <Button onClick={addCustomStop}>Add</Button>
                </Box>
                <Accordion allowToggle>
                    {
                        loadedTrips.map((x, index) => {
                            // console.log("x", x);
                            // console.log(x);
                            return <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box fontSize="l" fontWeight="semibold" lineHeight="short" flex='1'
                                            textAlign='left'>
                                            Stops Center {index + 1}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {/* <CheckboxGroup colorScheme='green' defaultValue={[]} > */}
                                    <VStack>
                                        {
                                            x.stop.map(stop => {
                                                return addCard(stop)
                                            })
                                        }
                                    </VStack>
                                    {/* </CheckboxGroup> */}
                                </AccordionPanel>
                            </AccordionItem>
                        })
                    }
                </Accordion>

                <Center>
                    <Button m="4" onClick={save} colorScheme='blue'>Save</Button>
                </Center>
            </Box>
            <ToastContainer />

        </div>
    );


};

export default AddStop;
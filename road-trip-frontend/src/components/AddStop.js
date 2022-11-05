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
import { useContext } from 'react';
import UserContext from "./UserContext";
import Filter from "./StopFilter";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'


const AddStop = () => {
   let wayPoints =  [];
    const userCtx = useContext(UserContext);
    console.log(userCtx.username + userCtx.email + userCtx.id + userCtx.tid);
    const [data, setData] = useState({
        start: "",
        end: "",
        date: "",
        rating: 0
    });

    const history = useHistory();

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});


    useEffect(() => {
        //setErrors(validate(data, "signUp"));
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
    

    const listStops = async () => {
        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `/trip/` + userCtx.tid + `/stop`;
        const responseA = await axios({
            method: 'get',
            url: urlApi,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }

        });
        console.log("trip response", responseA)
        responseA.data.forEach(element => {
            let way_point = wayPoints.find(x=>x.way_point === element.waypointNumber)
            if(way_point){
                way_point.stop.push(element)
            }
            else{
                wayPoints.push({
                way_point: element.waypointNumber,
                stop: [element]
            })
            }
        });
        console.log("trip waypont", wayPoints)
    }
    listStops()

    const submitHandler = (event) => {
        event.preventDefault();
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
                    'Access-Control-Allow-Origin': '*'
                },
                data: {
                    'stopLoc': data.start,
                    'tripId': userCtx.tid
                }

            });
            console.log(urlApi);
            //console.log(data.start + data.end + data.date +  userCtx.id + data.rating);
            console.log(responseA);



        }
        pushData();

    };

    return (
        <div>
            {/* <Accordion defaultIndex={[0]} allowMultiple >
                {wayPoints.forEach(element => { 
                    return <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                Section 1 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
                })
                }
                

            </Accordion> */}
            <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
                <h2>Add Stop</h2>
                <div>
                    <div
                        className={errors.start && touched.start ? styles.unCompleted : !errors.start && touched.start ? styles.completed : undefined}>
                        <input type="text" name="start" value={data.start} placeholder="Start Location"
                               onChange={changeHandler} onFocus={focusHandler} autoComplete="off"/>
                    </div>
                    {errors.start && touched.start && <span className={styles.error}>{errors.start}</span>}
                </div>

                <div>
                    <button type="submit">Submit</button>
                    <span style={{color: "#a29494", textAlign: "center", display: "inline-block", width: "100%"}}>
                        <Link to="/view-trips">Back</Link>
                    </span>
                </div>

                <Filter>
                </Filter>

            </form>

            <ToastContainer />



        </div>
    );
};

export default AddStop;
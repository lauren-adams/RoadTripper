import React, { useState, useEffect } from 'react';

import TrpList from './TrpList';
import { useContext } from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import TrpItem from "./TrpItem";
import classes from "./TripItem.module.css";
import WebHeader from "./WebHeader";
import { Center, Image, Flex, Badge, Text, Box} from "@chakra-ui/react";




function StopList() {
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrips, setLoadedTrips] = useState([]);

    useEffect(() => {
        console.log(userCtx.username + userCtx.email + userCtx.id);
        setIsLoading(true);
        fetch(
            'https://subjecttochange.dev/api/trip/' + userCtx.tid + '/stop'
        )
            .then((response) => {
                return response.json();
            })
            .then((stops) => {
                console.log(stops);
                if(stops && stops.length > 0){
                    stops = stops.filter(x=>x.flagStop === true)
                    setIsLoading(false);
                    setLoadedTrips(stops);
                }
                
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
        <div>
            <WebHeader />
            <Box m="5%" border p="5%" w="90%" borderWidth="1px">
                <Text fontSize="xl" fontWeight="semibold" lineHeight="short" flex='1' textAlign='left' >Stops</Text>
                <div>
                    <ul className={classes.list}>
                        {loadedTrips.map(item => {
                            return <li className={classes.item}><div className={classes.card} >

                                <div className={classes.content}>{item.stopLoc}</div></div></li>;
                        })}
                    </ul>
                </div>
            </Box>
            
            
            </div>
    );


}


export default StopList;
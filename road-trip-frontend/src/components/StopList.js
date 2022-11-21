import React, {useState, useEffect} from 'react';
import {MdStar} from "react-icons/md";
import TrpList from './TrpList';
import {useContext} from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import TrpItem from "./TrpItem";
import classes from "./TripItem.module.css";
import WebHeader from "./WebHeader";
import {Center, Image, Flex, Badge, Text, Box, List, ListItem, Stack, HStack, VStack} from "@chakra-ui/react";


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
                if (stops && stops.length > 0) {
                    stops = stops.filter(x => x.flagStop === true)
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

    function stopCard(stop) {
        return (<ListItem border="1px" p="10px">
            <HStack>
                <Box w='120px' h='120px'>
                    <Image src={stop.image} fallbackSrc='https://via.placeholder.com/150'/>
                </Box>
                <Box>
                    <VStack w="100%" alignItems="left">
                        <Box>
                            <HStack>
                                <Box as={MdStar} color="orange.400"></Box>
                                <Text>{stop.rating}</Text>
                            </HStack>
                        </Box>
                        <Box w="100%" h="100%">
                            <b>{stop.stopLoc}</b>
                        </Box>
                        <Box w="100%" h="100%">
                            {stop.address}
                        </Box>


                    </VStack>
                </Box>
            </HStack>

        </ListItem>);
    }

    return (
        <div>
            <WebHeader/>
            <Box m="5%" border p="5%" w="90%" borderWidth="1px">
                <Text fontSize="xl" fontWeight="semibold" lineHeight="short" flex='1' textAlign='left'
                      m="5%">Stops</Text>
                <div>
                    <List spacing={3}>
                        {loadedTrips.map(item => {
                            return stopCard(item)
                        })}
                    </List>
                    {/* <ul className={classes.list}>
                        {loadedTrips.map(item => {
                            return <li className={classes.item}><div className={classes.card} >

                                <div className={classes.content}>{item.stopLoc}</div></div></li>;
                        })}
                    </ul> */}
                </div>
            </Box>


        </div>
    );


}


export default StopList;
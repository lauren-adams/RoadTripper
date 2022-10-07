import TripList from "./TripList";
import React, {useState} from "react";
import axios from 'axios'

let base = 'https://subjecttochange.dev/api'
//let base = 'localhost:8080/api'
function getTrips(){
    let uri = base + '' //fix when I know the calls
    //uri should return all trips by current user signed in
    axios.get(uri)
        .then(res => {
            const trips = res.data;
            return trips
        })
    return []
    //return trips for user or empty i hope
}
const Trip = () => {
    const [trips, setTrips] = useState(getTrips())


    //all these functions are currently being worked on do not mind them
    const handleChange = id => {
        setTrips(prevState =>
            prevState.map(trip => {
                if (trip.id === id) {
                    return {
                        ...trip,
                        completed: !trip.completed,
                    }
                }
                return trip
            })
        )
    }
    const delTrip = id => {
        //change to access api instead
        let uri = base + ''
        axios.delete(uri)
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
        //will remove a trip base on id
        setTrips([
            ...trips.filter(trip => {
                return trip.id !== id
            }),
        ])

    }

    // const addTripItem = title => {
    //     const newTodo = {
    //         id: uuidv4(),
    //         title: title,
    //         completed: false,
    //     }
    //     setTrips([...trips, newTodo])
    // }

    const setUpdate = (updatedTitle, updatedStart, updatedEnd, id) => {
        let uri = ''

        setTrips(
            trips.map(trip => {
                if (trip.id === id) {
                    trip.title = updatedTitle
                    trip.start = updatedStart
                    trip.end = updatedEnd
                    axios.post(uri, {trip} )
                        .then(res => {

                        })
                }
                return trip
            })
        )
    }

    return(
        <div>
            <TripList trips={trips}
                      handleChaneProps={handleChange}
                      deleteTripProps={delTrip}
                      setUpdate={setUpdate} />

        </div>
    )
}
export default Trip;
import React from "react";
import TripItem from './TripItem';

const tripArr = [{tripName: 'test21',
                    starting: 'asdsa'}, 'trip2', 'trip3'];  // for test use

// the temp function for print the trip name
const TripList = () => {
    return(
        <>
            <h3>
                Trips
            </h3>
            <ul>
                {tripArr.map((tripp) => (tripName(tripp)))}
            </ul>
        </>
    )
}

// call this function to print name
function tripName(props) {
    return(
        <li>{props}</li>
    )
}

// Commented to test if I can print trips

// const TripList = props => {
//
//
//     return (
//         <ul>
//             {props.trips.map(trip => (
//                 <TripItem key={trip.id} trip={trip} handleChangeProps={props.handleChangeProps}
//                 deleteTripProps={props.deleteTripProps} setUpdate={props.setUpdate} />
//             ))}
//         </ul>
//     );
//     //Should call <TripItem /> object many times in list
// };

export default TripList;
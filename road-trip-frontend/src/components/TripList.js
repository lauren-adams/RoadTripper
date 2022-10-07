import TripItem from './TripItem';

const TripList = props => {


    return (
        <ul>
            {props.trips.map(trip => (
                <TripItem key={trip.id} trip={trip} handleChangeProps={props.handleChangeProps}
                deleteTripProps={props.deleteTripProps} setUpdate={props.setUpdate} />
            ))}
        </ul>
    );
    //Should call <TripItem /> object many times in list
};

export default TripList;
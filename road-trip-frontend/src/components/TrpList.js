import TrpItem from './TrpItem';
import classes from './TripItem.module.css';

function TrpList(props) {


    return (
        <ul className={classes.list}>
            {props.trips.map((meetup) => (
                <TrpItem
                    key={meetup.id}
                    id={meetup.id}
                    startLoc={meetup.startLoc}
                    endLoc={meetup.endLoc}
                    date={meetup.startDate}
                    rating={meetup.rating}
                />
            ))}
        </ul>
    );
}

export default TrpList;
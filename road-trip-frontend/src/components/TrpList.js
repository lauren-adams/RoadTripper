import TrpItem from './TrpItem';
import classes from './TripItem.module.css';

function TrpList(props) {


    return (
        <ul className={classes.list}>
            {props.trips.map((meetup) => (
                <TrpItem
                    key={meetup.id}
                    id={meetup.id}
                    image={meetup.image}
                    title={meetup.title}
                    address={meetup.address}
                    description={meetup.description}
                />
            ))}
        </ul>
    );
}

export default TrpList;
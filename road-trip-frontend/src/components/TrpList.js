import TrpItem from './TrpItem';
import React from 'react';
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
                    hide = {props.hide}
                    show={props.show}
                    submit={props.submit}
                />
            ))}
        </ul>
    );
}

export default TrpList;
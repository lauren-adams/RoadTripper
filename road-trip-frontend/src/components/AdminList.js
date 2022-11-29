import React from 'react';
import classes from './TripItem.module.css';
import AdminItem from './AdminItem'

function AdminList(props) {
    return (
        <ul className={classes.list}>
            {props.users.map((meetup) => (
                <AdminItem
                    key={meetup.id}
                    id={meetup.id}
                    email={meetup.username}
                    userType={meetup.userType}
                    active={meetup.active}
                    role={meetup.roles}
                    show={props.show}
                />
            ))}

        </ul>
    )
}
export default AdminList;
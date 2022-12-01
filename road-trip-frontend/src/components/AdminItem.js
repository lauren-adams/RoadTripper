import { useContext, useState } from 'react';

import React from 'react';
import classes from './TripItem.module.css';
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";

function AdminItem(props) {

    return(
        <li className={classes.item}>
            <div className={classes.card}>
                <div className={classes.content}>
                    <h1>User{props.id}</h1>
                    <p>Email: {props.email}</p>
                    <div>
                        <p>UserType: {props.userType === 'o' ? (<>Admin</>) : (<>Regular User</>)}</p>
                    </div>

                    <div>
                        <p>Active: {props.active === true ? (<>True</>): (<>False</>)}</p>
                    </div>

                    <p>Roles: {props.role}</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={() => props.show(props.id)}>{'Delete'}</button>
                </div>
            </div>
        </li>
    )
}
export default AdminItem;
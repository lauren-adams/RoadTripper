import React, { useEffect, useState } from "react";
//Icon
import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
// Validate
import { validate } from "./validate";
// Styles
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
//
import { Link } from "react-router-dom";
// Axios
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import UserContext from "./UserContext";



const Profile = () => {

    const userCtx = useContext(UserContext);
    const history = useHistory();
    //https://subjecttochange.dev/api/user?emailAddress=g@g.com


    return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Profile</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">email: {userCtx.email}</p>
            <Link to={"/home"} className="nav-link">
                Home
            </Link>
        </div>
    </div>
    );
};

export default Profile;

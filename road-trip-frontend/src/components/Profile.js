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

import bcrypt from 'bcryptjs';
import { useContext } from 'react';
import UserContext from "./UserContext";



const Profile = () => {

    const userCtx = useContext(UserContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        IsAccepted: true,
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data, "signUp"));
    }, [data, touched]);

    const changeHandler = (event) => {
        if (event.target.name === "IsAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked });
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const salt = bcrypt.genSaltSync(10)

    const submitHandler = (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            // Pushing data to database usuing PHP script
            const base = `https://subjecttochange.dev/api`
            //const base = `http://localhost:8080`
            const urlApi = base + `/user`;
            const pushData = async () => {
                //const responseA = axios.post(urlApi);
                const responseA = axios({
                    method: 'post',
                    url: urlApi,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: {
                        'emailAddress': data.email.toLowerCase(),
                        'password': bcrypt.hashSync(data.password, 10),
                        'userType': "a",
                        'username': data.name
                    }
                });
                const response = await toast.promise(responseA, {
                    pending: "Check your data",
                    success: "Checked!",
                    error: "Something went wrong!",
                });
                console.log("test");
                if (response.data.ok) {
                    notify("You signed Up successfully", "success");
                } else {
                    notify("You have already registered, log in to your account", "warning");
                    console.log(response)
                }
            };
            pushData();
        } else {
            notify("Please Check fileds again", "error");
            setTouched({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                IsAccepted: false,
            });
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
                <h2>Profile</h2>
                <div>
                    <div className={errors.name && touched.name ? styles.unCompleted : !errors.name && touched.name ? styles.completed : undefined}>
                        <input type="text" name="name" value={userCtx.username} placeholder="Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                        <img src={userIcon} alt="" />
                    </div>
                    {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div>
                    <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
                        <input type="text" name="email" value={userCtx.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                        <img src={emailIcon} alt="" />
                    </div>
                    {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div>
                    <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
                        <input type="password" name="password" value={data.password} placeholder="Change password?" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                        <img src={passwordIcon} alt="" />
                    </div>
                    {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
                </div>
                <div>
                    <div className={errors.confirmPassword && touched.confirmPassword ? styles.unCompleted : !errors.confirmPassword && touched.confirmPassword ? styles.completed : !errors.confirmPassword && touched.confirmPassword ? styles.completed : undefined}>
                        <input type="password" name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                        <img src={passwordIcon} alt="" />
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
                </div>
                <div>
                    <button type="submit">Save Edits</button>
                    <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
             <Link to="/home">Home</Link>
          </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Profile;




/*import React, { useEffect, useState } from "react";
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
*/
/*
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

import bcrypt from 'bcryptjs';

import { useContext } from 'react';
import UserContext from "./UserContext";

const Profile = () => {
    const userCtx = useContext(UserContext);
    const [data, setData] = useState({
        name: userCtx.name,
        email: userCtx.email
    });

    //const [errors, setErrors] = useState({});
    //const [touched, setTouched] = useState({});


   /* useEffect(() => {
        setErrors(validate(data, "signUp"));
    }, [data, touched]);*/
/*
    const userHandler = (event) => {
            //setData({ ...data, [event.target.name]: event.target.checked });
            //setData(event.target.name, data.email);
        userCtx.setMyUser(evemt.name, userCtx.email, true);
    };

    const emailHandler = (event) => {
        //setData({ ...data, [event.target.name]: event.target.checked });
        setData(data.name, event.target.name);
    };

   /* const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };*/

    //const salt = bcrypt.genSaltSync(10)
/*
    const submitHandler = (event) => {
        event.preventDefault();
            // Pushing data to database usuing PHP script
            const base = `https://subjecttochange.dev/api`
            //const base = `http://localhost:8080`
            const urlApi = base + `/user`;
            const pushData = async () => {
                //const responseA = axios.post(urlApi);
                const responseA = axios({
                    method: 'post',
                    url: urlApi,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: {
                        'emailAddress': data.email.toLowerCase(),
                        'username': data.username
                    }
                });
            }
            pushData();
            //userCtx.setMyUser(data.name, data.email, true);
    };

    return (
        <div className={styles.container}>
            <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
                <h2>Profile</h2>
                <div>
                    <div className={styles.completed}>
                        <input type="text" name="name" value={userCtx.username} placeholder={userCtx.username} onChange={userHandler}  autoComplete="off" />
                        <img src={userIcon} alt="" />
                    </div>
                     </div>
                <div>
                    <div className={styles.completed}>
                        <input type="text" name="email" value={userCtx.email} placeholder={userCtx.email} onChange={emailHandler} autoComplete="off" />
                        <img src={emailIcon} alt="" />
                    </div>
                    </div>

                <div>
                    <button type="submit">Save Changes</button>
                    <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
             <Link to="/home">Home</Link>
          </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Profile;*/

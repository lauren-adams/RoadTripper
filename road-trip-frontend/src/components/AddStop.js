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
import bcrypt from "bcryptjs";
import { useContext } from 'react';
import UserContext from "./UserContext";




const AddStop = () => {

    const userCtx = useContext(UserContext);
    console.log(userCtx.username + userCtx.email + userCtx.id);
    const [data, setData] = useState({
        start: "",
        end: "",
        date: "",
        rating: 0
    });

    const history = useHistory();

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});


    useEffect(() => {
        //setErrors(validate(data, "signUp"));
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

    const submitHandler = (event) => {
        event.preventDefault();
        history.push("/view-trips");
        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `/stop`;
        console.log(data.start + data.end + data.date + userCtx.username + userCtx.email + userCtx.id);
        console.log("ID: " + userCtx.id);
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
                    'stop': data.start,
                    'tripId': data.end
                }

            });
            console.log(urlApi);
            //console.log(data.start + data.end + data.date +  userCtx.id + data.rating);
            console.log(responseA);

        }
        pushData();

    };

    return (
        <div className={styles.container}>
            <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
                <h2>Add Stop</h2>
                <div>
                    <div className={errors.start && touched.start ? styles.unCompleted : !errors.start && touched.start ? styles.completed : undefined}>
                        <input type="text" name="start" value={data.start} placeholder="Start Location" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                    </div>
                    {errors.start && touched.start && <span className={styles.error}>{errors.start}</span>}
                </div>

                <div>
                    <button type="submit">Submit</button>
                    <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
                        <Link to="/home">Home</Link>

          </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddStop;
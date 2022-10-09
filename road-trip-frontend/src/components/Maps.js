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




const Maps = () => {
    const [data, setData] = useState({
        start: "",
        end: "",
        date: "",
        rating: 0
    });

    const history = useHistory();

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const userCtx = useContext(UserContext);

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
        history.push("/home");
        const base = `https://subjecttochange.dev/api`
        const urlApi = base + `/trip`;
        console.log(data.start + data.end + data.date);
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
                    'startLoc': data.start,
                    'endLoc': data.end,
                    'startDate': data.date,
                    'userID': userCtx.id,
                    'rating': data.rating
                }
            });
            pushData();
        }

        /*if (!Object.keys(errors).length) {
            // Pushing data to database usuing PHP script
            const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${data.email.toLowerCase()}&password=${data.password}&register=true`;
            const pushData = async () => {
                const responseA = axios.get(urlApi);
                const response = await toast.promise(responseA, {
                    pending: "Check your data",
                    success: "Checked!",
                    error: "Something went wrong!",
                });
                if (response.data.ok) {
                    notify("You signed Up successfully", "success");
                } else {
                    notify("You have already registered, log in to your account", "warning");
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
        }*/
    };

    return (
        <div className={styles.container}>
            <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
                <h2>Plan Trip</h2>
                <div>
                    <div className={errors.start && touched.start ? styles.unCompleted : !errors.start && touched.start ? styles.completed : undefined}>
                        <input type="text" name="start" value={data.start} placeholder="Start Location" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                    </div>
                    {errors.start && touched.start && <span className={styles.error}>{errors.start}</span>}
                </div>
                <div>
                    <div className={errors.end && touched.end ? styles.unCompleted : !errors.end && touched.end ? styles.completed : undefined}>
                        <input type="text" name="end" value={data.end} placeholder="End Location" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                    </div>
                    {errors.end && touched.end && <span className={styles.error}>{errors.end}</span>}
                </div>
                <div>
                    <div className={errors.date && touched.date ? styles.unCompleted : !errors.date && touched.date ? styles.completed : undefined}>
                        <input type="text" name="date" value={data.date} placeholder="Date" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                    </div>
                    {errors.date && touched.date && <span className={styles.error}>{errors.date}</span>}
                </div>
                <div>
                    <div className={errors.rating && touched.rating ? styles.unCompleted : !errors.rating && touched.rating ? styles.completed : undefined}>
                        <input type="text" name="rating" value={data.rating} placeholder="Rating" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                    </div>
                    {errors.rating && touched.rating && <span className={styles.error}>{errors.rating}</span>}
                </div>

                <div>
                    <button type="submit">Submit</button>
                    <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>

          </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Maps;

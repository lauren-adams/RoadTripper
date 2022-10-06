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

const Maps = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        date: "",
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

    const submitHandler = (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
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
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
                <h2>Plan Trip</h2>
                <div>
                    <div className={errors.name && touched.name ? styles.unCompleted : !errors.name && touched.name ? styles.completed : undefined}>
                        <input type="text" name="name" value={data.name} placeholder="Start Location" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                        <img src={userIcon} alt="" />
                    </div>
                    {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div>
                    <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
                        <input type="text" name="email" value={data.email} placeholder="End Location" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                        <img src={emailIcon} alt="" />
                    </div>
                    {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div>
                    <div className={errors.date && touched.date ? styles.unCompleted : !errors.date && touched.date ? styles.completed : undefined}>
                        <input type="text" name="date" value={data.date} placeholder="Date" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                        <img src={emailIcon} alt="" />
                    </div>
                    {errors.date && touched.date && <span className={styles.error}>{errors.date}</span>}
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

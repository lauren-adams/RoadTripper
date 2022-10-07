import React, { useState } from "react";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {withRouter} from 'react-router-dom';

import bcrypt from 'bcryptjs';


const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory()
  const [touched, setTouched] = useState({});

  const logHandler = () => {
    notify("You login to your account successfully", "success")
    history.push('/maps');
  }

  const checkProvidedInfo = (obj) => {
    const email = data.email;
    let passwordGiven = data.password;
    console.log(email, passwordGiven);
    let base = `https://subjecttochange.dev/api/`;
    //let base = `http://localhost:8080/`;
    let urlApi =  base+`user/getPassword?emailAddress=${email.toLowerCase()}`;
    let retrievedHash = "";
    console.log("First");
    const pushData = async () => {
      const responseA = axios.get(urlApi);
      const response = await toast.promise(responseA, {
        pending: "Check your data",
        success: "Checked!",
        error: "Something went wrong!",
      });
      retrievedHash = response.data.password;
      //passwordGiven = bcrypt.hashSync(passwordGiven, saltResult);
      bcrypt.compare(passwordGiven, retrievedHash, function(err, result) {
        if (result) {
          console.log("Success");
          notify("Success, pimp. Redirecting you.")
          window.sessionStorage.setItem("loginToken", passwordGiven);


        }
        else {
          console.log(":(");
          notify("Incorrect login")
        }
      });
    };
    pushData();

    /*
    urlApi = base+`user/validatePassword?emailAddress=${email.toLowerCase()}&password=${passwordGivenSalted}`;

    let api = axios.get(urlApi).then((response) => response.data)
        .then((data) => (data.ok ? logHandler() : notify("Your password or your email is wrong", "error")));
    toast.promise(api, {
      pending: "Loading your data...",
      success: false,
      error: "Something went wrong!",
    });
    */
  };


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
    checkProvidedInfo(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign In</h2>
        <div>
          <div>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={emailIcon} alt="" />
          </div>
        </div>
        <div>
          <div>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
        </div>

        <div>
          <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have a account? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

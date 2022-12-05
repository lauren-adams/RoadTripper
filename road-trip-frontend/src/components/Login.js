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
import UserContext from "./UserContext";
import { useContext } from 'react';
import Cookies from 'universal-cookie';


import bcrypt from 'bcryptjs';

const cookies = new Cookies();
const base = `https://subjecttochange.dev/api/`;
//const base = `http://localhost:8080/`;



let token = "";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory()
  const [touched, setTouched] = useState({});
  const userCtx = useContext(UserContext);

  const logHandler = async () => {
    notify("Logged in successfully!", "success")
    const response = await axios.get(base + 'user?emailAddress=' + data.email, {
      headers: {
        'Authorization': `Bearer ${cookies.get('jwt')}`
      }
    });
    console.log(response.data.id);
    console.log(response.data)
    userCtx.setMyUser(response.data.username, data.email, true, response.data.userType);
    userCtx.setId(response.data.id);

    history.push('/home');
  }

  const checkProvidedInfo = async (obj) => {
    const email = data.email;
    let passwordGiven = data.password;
    let authUrl = base + 'authenticate';
    let retrievedHash = "";
    let retrievedType;
    const loginApi = async () => {

      const responseA = axios.post(authUrl, {
        username: email,
        password: passwordGiven
      });
      const response = await toast.promise(responseA, {
        pending: "Check your data",
        success: "Checked!",
        error: "Something went wrong!",
      });
      token = response.data.jwt;
      cookies.set('jwt', token.toString(), {path: '/'});
      console.log(token);
      return token;
    };

    cookies.set('jwt', await loginApi(), {path: '/'});
    await logHandler();

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

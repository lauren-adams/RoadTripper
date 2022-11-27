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
    notify("You login to your account successfully", "success")
    //    //https://subjecttochange.dev/api/user?emailAddress=g@g.com
    const response = await axios.get('https://subjecttochange.dev/api/user?emailAddress=' + data.email);console.log(response.data[0].id);
    userCtx.setMyUser(response.data[0].username, data.email, true);
    userCtx.setId(response.data[0].id);

    history.push('/home');
  }

  const checkProvidedInfo = (obj) => {
    const email = data.email;
    let passwordGiven = data.password;
    let base = `https://subjecttochange.dev/api/`;
    //let base = `http://localhost:8080/`;
    let urlApi =  base+`user/getPassword?emailAddress=${email.toLowerCase()}`;
    let authUrl = base+'authenticate';
    let retrievedHash = "";
    const loginApi = async () => {


      const responseB = axios.get(urlApi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const response1 = await toast.promise(responseB, {
        pending: "Check your data",
        success: "Checked!",
        error: "Something went wrong!",
      });
      retrievedHash = response1.data.password;
      //passwordGiven = bcrypt.hashSync(passwordGiven, saltResult);
      bcrypt.compare(passwordGiven, retrievedHash, function(err, result) {
        if (result) {
          console.log("Success");
          notify("Success, pimp. Redirecting you.")
          logHandler();
          userCtx.setMyUser( "user", email, true);


        }
        else {
          console.log(":(");
          notify("Incorrect login")
        }
      });

      console.log(retrievedHash);
      const responseA = axios.post(authUrl, {
        username: email,
        password: retrievedHash
      });
      const response = await toast.promise(responseA, {
        pending: "Check your data",
        success: "Checked!",
        error: "Something went wrong!",
      }); 
      token = response.data.jwt;
      cookies.set('jwt', token, { path: '/' });
      console.log(token);
      window.localStorage.setItem('jwt', toString(token));
      localStorage.setItem('jwt', toString(token));
    };

    loginApi();


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

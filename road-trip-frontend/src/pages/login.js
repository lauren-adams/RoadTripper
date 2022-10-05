import React, { useState } from "react";
import emailIcon from "/img/email.svg";
import passwordIcon from "/img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [touched, setTouched] = useState({});

    const chaeckData = (obj) => {
        const { email, password } = obj;
        const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${email.toLowerCase()}&password=${password}`;
        const api = axios
            .get(urlApi)
            .then((response) => response.data)
            .then((data) => (data.ok ? notify("You login to your account successfully", "success") : notify("Your password or your email is wrong", "error")));
        toast.promise(api, {
            pending: "Loading your data...",
            success: false,
            error: "Something went wrong!",
        });
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
        chaeckData(data);
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


/*import React, {Component} from 'react'

class Login extends Component{
    render(){
        return(
        <div>
            This should be a login page built with React
        </div>
        );
    }
}
export default Login;*/

//A theoretical login page, will need work changing some variable and imports
//but again, at least its a start. 
/*
import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { withRouter } from 'react-router';
import AuthContext from "../context";
const axios = require('axios');



const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 8,

    },
    padding: {
        padding: theme.spacing.unit * 8,
    },
    root:{
        height : "100vh",
        backgroundColor :"#fcf2f8"
    }
});






function LoginTab(props) {


        const LOGIN_URI  = '/api/login';

        const  { auth , setAuth } = React.useContext(AuthContext);

        const [state,setState] =
         React.useState({
            email :{
                value :"",
                error:null
            },
            password :{
                value :"",
                error:null
            }
        })

        const handleSubmit = () => {
            const params = new URLSearchParams();
            params.append('username', state.email.value);
            params.append('password' , state.password.value);
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post( LOGIN_URI , params , config)
                .then( (response) => {

                    if ( response.status === 200 ){
                        setAuth(true);
                        props.history.push('/');
                    }
                })
                .catch( (err) => {
                    console.log(err);
                });
        }

        const handleChange = (e) => {
            setState({...state, [e.target.name] : { value : e.target.value, error :null}})
        }


        const { classes } = props;

        return (
            <Grid container justify="center" alignItems="center" spacing={4} className={classes.root}>
                <Grid container justify="center">
                    <Typography variant="h1" style={{fontFamily:"Lobster,cursive", color:"#f224a0"}}>Flam Up</Typography>
                </Grid>
            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <Grid container justify="center" spacing={8} alignItems="center">
                        <Grid item>
                            <Typography variant="h2">Login</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Email" type="email" name="email" value={state.email.value} onChange={handleChange} fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" label="Password" type="password" name="password" state={state.password.value} onChange={handleChange} fullWidth required />
                        </Grid>
                    </Grid>
//                     { <Grid container alignItems="center" justify="space-between">
//                         <Grid item>
//                             <FormControlLabel control={
//                                 <Checkbox
//                                     color="primary"
//                                 />
//                             } label="Remember me" />
//                         </Grid>
//                         <Grid item>
//                             <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
//                         </Grid>
//                     </Grid> }
// <Grid container justify="center" style={{ marginTop: '40px' }}>
//     <Button variant="outlined" color="primary" onClick={handleSubmit}
//             style={{ textTransform: "none" }}>Login</Button>
// </Grid>
// </div>
// </Paper>
// </Grid>
// );
// }


export default withRouter(withStyles(styles)(LoginTab));
 */
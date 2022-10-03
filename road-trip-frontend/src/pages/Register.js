import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, FormControl, FormLabel, RadioGroup,Radio, Checkbox, Typography } from '@material-ui/core';
import Logo from "../assets/logo.png";
import { Face, Fingerprint, AccountCircle, Email } from '@material-ui/icons'
import { withRouter } from 'react-router';
import axios from 'axios';

//Not gonna lie, I about copied everything on this page so idk how it will work


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 8,

    },
    padding: {
        padding: theme.spacing.unit * 4,
    },
    root:{
        height : "auto",
        backgroundColor :"#fcf2f8",
        paddingBottom:"5em"
    }
});

//if something else doesn't work, try this as well, link all functions like I did below
//dont need to link render
//class Register extends Component{
    /*
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        ...
        }
     */
function Register(props){
    //might have to change this
    const REGISTER_URI = '/api/register'
    const [state, setState] = React.useState({
        id :{
            value: "",
            error: null
        },
        email :{
            value: "",
            error: null
        },
        password :{
            value: "",
            error: null
        },
        userType :{
            value: "",
            error: null
        }
    })
    const handleChange = (e) => {
        setState({...state, [e.target.name] : {value : e.target.value, error : null}})

    }
    const handleSubmit = () => {
        const payload = {
            id : state.id.value,
            email : state.email.value,
            password : state.password.value,
            userType : state.userType.value
        }
        //other way, if axios.post does not work
        /*
        UserService.create(data)
            .then(respose => {
            this.setState({
                ...
               });
               console.log(response.data);
               })
               .catch(e => {
                    console.log(e);
               });
         */
        axios.post(REGISTER_URI, payload)
            .then( response => {
                console.log(response);
                if(response.status === 200){
                    props.history.push('/login');
                }
            }).catch(err => console.log(err));
    }
    const {classes} = props;
    return (
        <Grid container justify="center" alignItems="center" spacing={4} className={classes.root}>
            <Grid container justify="center">
                <Grid item>
                    <img src={Logo} height={200} width={200}/>
                </Grid>
            </Grid>
            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <Grid container justify="center" spacing={8} alignItems="center">
                        <Grid item>
                            <Typography variant="h2">Register</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="id" label="ID" name="id" onChange={handleChange} value={state.id.value} fullWidth autoFocus required />
                        </Grid>

                    </Grid>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" label="Password" type="password" onChange={handleChange} name="password" value={state.password.value} fullWidth required />
                        </Grid>
                        <Grid item>
                            <Email />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="email" label="Email" type="email" name="email" onChange={handleChange} value={state.email.value} fullWidth autoFocus required />
                        </Grid>

                    </Grid>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="usertype" label="usertype" name="usertype" onChange={handleChange} value={state.userType.value} fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    {/*<Grid container justify="flex-start" style={{marginTop:"1.3em"}}>*/}
                    {/*    <FormControl component="fieldset">*/}
                    {/*        <FormLabel component="legend">Gender</FormLabel>*/}
                    {/*        /!* value={value} onChange={handleChange} *!/*/}
                    {/*        <RadioGroup aria-label="gender" name="gender" value={state.gender.value} onChange={handleChange} >*/}
                    {/*            <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />*/}
                    {/*            <FormControlLabel value="MALE" control={<Radio />} label="Male" />*/}
                    {/*        </RadioGroup>*/}
                    {/*    </FormControl>*/}
                    {/*</Grid>*/}

                    <Grid container justify="center" style={{ marginTop: '40px' }}>
                        <Button variant="outlined" color="primary" onClick={handleSubmit}
                                style={{ textTransform: "none" }}>Sign Up</Button>
                    </Grid>
                </div>
            </Paper>
        </Grid>
    )
}
//This might not work with anything that we currently have, so might just export Register instead
//I'll figure it out, but at least we have a start
export default withRouter(withStyles(styles)(Register));
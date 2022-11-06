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


const preferenceValues = [
    {id: 0, title: 'Restaurants'},
    {id: 1, title: "Parks"},
    {id: 2, title: "Gas Stations"},
    {id: 3, title: "Museums"}
]


const Profile = () => {
    const userCtx = useContext(UserContext);
    const getPreferences = () => {
        let base = 'http://localhost:8080'
        //let base = 'https://subjecttochange.dev/api'
        let url = base + "/user/" + userCtx.id + "/preferences"

        axios.get(url).then(res => {
            const data = res.data;
            data.forEach(d => {
                console.log(d)
                preferences.values.push(d.type)

            })
            console.log(preferences.values)
            setLoading(false);

        })



    }
    let [data, setData] = useState({
        start: "",
        end: "",
        date: "",
        rating: 0
    });

    const history = useHistory();

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [preferences, setPreferences] = useState({
        values: []
    } )
    const [loading, setLoading] = useState(true)


    useEffect( () => {
        getPreferences();
    }, [])

    useEffect(() => {
        //setErrors(validate(data, "signUp"));
    }, [data, touched]);

    //getPreferences()

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
        if (data.start === ""){
            data.start = userCtx.username;
        }
        if (data.end === ""){
            data.end = userCtx.email;
        }
        userCtx.setMyUser(data.start, data.end, true);
        event.preventDefault();
        history.push("/home");
        const base = `https://subjecttochange.dev/api`
        const base2 = 'http://localhost:8080'
        const urlApi = base + `/user`;
        const prefApi = base + '/user/' + userCtx.id + '/preferences'
        console.log(userCtx);
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
                    'id': parseInt(userCtx.id),
                    'emailAddress': data.end,
                    'username': data.start,
                }
            });



        }
        pushData();
        const delData = async () => {
            //const responseA = axios.post(urlApi);
            const responseA = axios({
                method: 'delete',
                url: prefApi,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });



        }

        const pushPref = async () => {
            // const responseC = axios({
            //     method: 'delete',
            //     url: prefApi,
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*'
            //     }
            // })
            console.log(preferences.values)
            preferences.values.map(preference => {
                const responseB = axios({
                    method: 'post',
                    url: prefApi,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: {
                        'type': preference,
                        'userId': userCtx.id
                    }
                })
            })

        }
        delData().then(r => {
            pushPref()
        });


    };
    const preferenceHandler = (button) => {
        let tmp = preferences.values;
        if(preferences.values.includes(button)){
            setPreferences({values: preferences.values.filter(el => el !== button)})
        }
        else{
            tmp.push(button);
            setPreferences({values: tmp})
        }
        console.log(preferences.values)
    };

    return (
        <div>
            {loading ? (
                <label>loading</label>
            ) : (
                <div className={styles.container}>
                    <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
                        <h2>Profile</h2>
                        <div>
                            <label>Username: </label>
                        </div>
                        <div>
                            <div className={errors.start && touched.start ? styles.unCompleted : !errors.start && touched.start ? styles.completed : undefined}>
                                <input type="text" name="start" value={data.start} placeholder={userCtx.username} onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                            </div>
                            {errors.start && touched.start && <span className={styles.error}>{errors.start}</span>}
                        </div>
                        <div>
                            <label>Email: </label>
                        </div>
                        <div>
                            <div className={errors.end && touched.end ? styles.unCompleted : !errors.end && touched.end ? styles.completed : undefined}>
                                <input type="text" name="end" value={data.end} placeholder={userCtx.email} onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                            </div>
                            {errors.end && touched.end && <span className={styles.error}>{errors.end}</span>}
                        </div>
                        <div>
                            <label>Stop Preferences: </label>
                        </div>
                        <div>
                            <div className={styles.buttonContainer}>
                                {preferenceValues.map(bt => (
                                    <button
                                        key={bt.title}
                                        type="button"
                                        onClick={() => preferenceHandler(bt.title)}
                                        className={preferences.values.includes(bt.title) ? styles.buttonPressed: styles.button}>
                                        {bt.title}
                                    </button>
                                ))}
                            </div>


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
            )}
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
        if (data.name === ""){
            data.name = userCtx.username;
        }
        if (data.email === ""){
            data.email = userCtx.email;
        }
        if (!Object.keys(errors).length) {
            // Pushing data to database usuing PHP script
            const base = `https://subjecttochange.dev/api`
            //const base = `http://localhost:8080`
            const urlApi = base + `/user`;
            if (data.password === "") {
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
            }

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
                        <input type="text" name="name" value={data.name} placeholder={userCtx.username} onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
                        <img src={userIcon} alt="" />
                    </div>
                    {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div>
                    <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
                        <input type="text" name="email" value={data.email} placeholder={userCtx.email} onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
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

*/


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

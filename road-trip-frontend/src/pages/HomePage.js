import React from "react";
import Login from "./login.js"
import RouterConfig from "./Route";
import { Link, Route, Router, Routes } from "react-router-dom"

class HomePage extends React.Component {

    render(){
        return (
            <div>
                This is the home page!
                <p>brought to you by SubjectToChange.dev</p>

                    <nav>
                        <li>
                            <Link to="/loginpage">Loginpage</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </nav>



                    <Routes>
                        <Route exact path="/loginpage" element={<Login />} />
                        <Route exact path="/" element={<HomePage />} />
                    </Routes>



                <br/>

            </div>

        )
    }

}


export default HomePage
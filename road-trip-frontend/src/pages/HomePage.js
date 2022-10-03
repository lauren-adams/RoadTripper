import React from "react";
import Login from "./login.js"
import RouterConfig from "./Route";
import { Link, Route, Router, Routes } from "react-router-dom"

class HomePage extends React.Component {
    //error coming in below, doesn't like link.
    //Error says that i did not define pathname, meaning I didn't include "to", but I did
    //And nothing online is giving any help over how to fix the issue.
    //After getting that to work, we should have a much easier time developing the front end

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
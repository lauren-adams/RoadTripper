import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./login.js"
import Home from './index'



export default function RouterConfig() {

    /*
    Here we define the route path and its corresponding components
    */
    //FIXME need to change it so index.js is not the home page, just that way right now
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/loginpage" element={<Login />} />

            </Routes>
        </BrowserRouter>
    );
}
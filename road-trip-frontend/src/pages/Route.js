import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './login'
import Home from './HomePage'



export default function RouterConfig() {

    /*
    Here we define the route path and its corresponding components
    */

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/loginpage" element={<Login />} />

            </Routes>
        </BrowserRouter>
    );
}
import React, {Component} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './login'
import Home from './HomePage'



class RouterConfig extends Component {

    /*
    Here we define the route path and its corresponding components
    */
render(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/loginpage" element={<Login />} />

            </Routes>
        </BrowserRouter>
    );
}

}
export default RouterConfig;
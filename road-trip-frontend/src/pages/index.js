import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import { BrowserRouter as Router} from "react-router-dom";

if (typeof window !== 'undefined')
{
    ReactDOM.render(
        <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}






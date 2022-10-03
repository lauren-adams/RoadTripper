import React from 'react';
import ReactDOM from 'react-dom';
import Route from "./Route.js";
import HomePage from "./HomePage"
import { Router } from "react-router-dom"

import Link from '@material-ui/core/Link';

require('dotenv').config();
//
// function HomePage() {
//     if(typeof window !== 'undefined'){
//         console.log('You are on the browser');
//     }else{
//         console.log('You are on the server');
//     }
//     return (
//
//         // <BrowserRouter>
//         //     <HomePag />
//         // </BrowserRouter>
//
//         <div>
//             idk
//         </div>
//     )
// }
// export default HomePage
// ReactDOM.render((
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
//     ), document.getElementById('root')
// );
function App() {
    //please do not change this, this is the only thing that has gotten to work
    return (

        <Router>
            <div className="App">
                <HomePage />
            </div>
        </Router>

    )
}
export default App;



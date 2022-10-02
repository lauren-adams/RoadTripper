import React from 'react';
import ReactDOM from 'react-dom'
import HomePage from './HomePage'
import RouterConfig from './Route.js'
import Link from '@material-ui/core/Link';

require('dotenv').config();

//FIXME pls dont let this be the homepage, we actually need a homepage class im just lazy right now
//ill fix in a bit, we have some time.
if(typeof window !== 'undefined') {
    ReactDOM.render(
        <HomePage />,

        document.getElementById('root')
    );
}

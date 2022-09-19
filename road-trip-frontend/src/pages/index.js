import React from 'react';
import RouterConfig from './Route.js'
import Link from '@material-ui/core/Link';

require('dotenv').config();

//FIXME pls dont let this be the homepage, we actually need a homepage class im just lazy right now
//ill fix in a bit, we have some time.
function HomePage() {
    return (
        <div>
            This is the home page!
            <RouterConfig />
        </div>

    )
}

export default HomePage
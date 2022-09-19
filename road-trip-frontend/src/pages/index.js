import React from 'react';
import RouterConfig from './Route.js'
import Link from '@material-ui/core/Link';

require('dotenv').config();

function HomePage() {
    return (
        <div>
            This is the home page!
            <RouterConfig />
        </div>
        
    )
}

export default HomePage
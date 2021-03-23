import React from 'react';
import './index.css';

import Login from '../../components/EstruturaLogin'

const Main = () => {
    return (
        <React.Fragment>
            <div className="toFill-area">
                <div id="background-login">
                    <Login />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Main;
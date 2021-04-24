import React from 'react';
import './style.css';

import Logo from '../../images/logo.png';

const header = (props) => {
    return (
        <React.Fragment>
            <nav id="header">
                <img id="logo-header" src={ Logo } alt="Logo Header"/>
                
                <input id="hamburguer-checkbox" type="checkbox"/>
                <label htmlFor="hamburguer-checkbox" className="label-hamburguer">
                    <div className="menu">
                        <span className="hamburguer"></span>
                    </div>
                </label>

            </nav>
        </React.Fragment>
    )
}

export default header;
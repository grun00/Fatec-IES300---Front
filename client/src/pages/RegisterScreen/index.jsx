import React from 'react';
import './index.css';

import Logo from '../../images/logo.png'
import RegisterForm from '../../components/RegisterForm'
import { Link } from 'react-router-dom';


const Page = () => {
    return (
        <React.Fragment>
            <Link to="/"><img id="logo" src={Logo} /></Link>
            <div id="register-page">
                <div id="register-area">
                    <h1>Cadastro</h1>
                    <RegisterForm/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Page;

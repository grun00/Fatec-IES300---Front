import React from 'react';
import './index.css';
import Logo from '../../images/logo.png';

//Components
import ForgotPassword from '../../components/ForgotPassword';

//Link
import { Link } from 'react-router-dom';

const Page = () =>
    <React.Fragment>
        <div id="page">
            <Link to="/">
                <img src={Logo} id="logo" alt="Show do Vitão - Homepage" />
            </Link>
            <div id="forgot-page">

                <div id="forgot-area">
                    <h1>Esqueci minha senha</h1>
                    <ForgotPassword />
                </div>
            </div>
        </div>
    </React.Fragment>


export default Page;
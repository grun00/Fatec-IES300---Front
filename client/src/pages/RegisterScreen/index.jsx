import React from 'react';
import './index.css';

//Components
import Logo from '../../images/logo.png';
import RegisterForm from '../../components/Login/RegisterForm';

//Link
import { Link } from 'react-router-dom';

const PageRegisterScreen = () =>

        <React.Fragment>
            <div id="register-page">
                <Link to="/"><img id="logo" src={Logo} alt="Show do Vitão - Homepage" /></Link>
                <div id="register-area">
                    <h1>Cadastro</h1>
                    <h5 id="password-error">As senhas não conferem!</h5>
                    <RegisterForm/>
                </div>
            </div>
        </React.Fragment>

export default PageRegisterScreen;
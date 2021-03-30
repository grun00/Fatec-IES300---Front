import React from 'react';
import './index.css';

//Components
import Logo from '../../images/logo.png';
import RegisterForm from '../../components/RegisterForm';

//Link
import { Link } from 'react-router-dom';

const Page = () =>

        <React.Fragment>
            <Link to="/"><img id="logo" src={Logo} alt="Show do Vitão - Homepage" /></Link>
            <div id="register-page">
                <div id="register-area">
                    <h1>Cadastro</h1>
                    <RegisterForm/>
                </div>
            </div>
        </React.Fragment>

export default Page;
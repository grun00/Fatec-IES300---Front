import React from 'react';
import Logo from '../images/logo.png';
import '../global.css'

import { Link } from 'react-router-dom';

export default (props) =>
    <div className="fields-area">
        <div>
            <img id="logo-menu" src={Logo} />
        </div>

        <div className="field">
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" maxLength="70" placeholder="Insira o seu email" />
        </div>

        <div className="field">
            <label htmlFor="password">Senha:</label>
            <input id="password" type="password" maxLength="30" placeholder="Insira sua senha" />
        </div>

        <button className="button-accept" type="submit">Login</button>

        <div className="footer">
            <Link to="/RegisterScreen"> Não possuo cadastro </Link>
            <a href="#">Esqueci minha senha</a>
        </div>
    </div>



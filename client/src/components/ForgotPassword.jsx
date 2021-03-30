import React from 'react';
import '../global.css';

import { Link } from 'react-router-dom';

const forgotPassword = (props) => 

    <div className="fields-area">
        <div className="field">
            <label htmlFor="email">Email de recuperação:</label>
            <input id="email" type="email" maxLength="70" placeholder="Insira o seu email para recuperação" />
        </div>

        <button className="button-accept" type="submit">Enviar codigo</button>

        <div className="footer">
            <Link to="/RegisterScreen"> Não possuo cadastro </Link>
            <Link to="/"> Lembrei minha senha </Link>
        </div>
    </div>

export default forgotPassword;
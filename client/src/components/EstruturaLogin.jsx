import React from 'react'
import Logo from '../images/logo.png'

export default (props) =>
    <div className="login-fields">
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

        <button id="button-login" type="submit">Login</button>

        <div className="footer">
            <a href="#">Não possuo cadastro</a>
            <a href="#">Esqueci minha senha</a>
        </div>

    </div>
import React from 'react';
import '../global.css';

import { Link } from 'react-router-dom';

export default (props) =>
    <div className="fields-area">
        <div className="field">
            <label htmlFor="nome">Nome:</label>
            <input id="nome" type="text" placeholder="Insira seu nome" />
        </div>

        <div className="field">
            <label htmlFor="user">Nome de usuário:</label>
            <input id="user" type="text" placeholder="Insira um nome de usuário" />
        </div>

        <div className="field">
            <label htmlFor="email">E-mail:</label>
            <input id="email" type="email" placeholder="Insira um email aqui" />
        </div>

        <div className="field">
            <label htmlFor="password">Insira uma senha:</label>
            <input id="password" type="password" placeholder="Insira sua senha" />
        </div>

        <div className="field">
            <label htmlFor="passwordVerify">Repita a senha:</label>
            <input id="passwordVerify" type="password" placeholder="Verifique sua senha" />
        </div>

        <button className="button-accept" type="submit">Cadastrar</button>

        <div className="footer">
            <Link to="/">Voltar</Link>
        </div>
    </div>




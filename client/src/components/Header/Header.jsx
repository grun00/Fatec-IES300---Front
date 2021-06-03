import React, { useContext, useEffect } from 'react';
import './style.css';

import { Link } from "react-router-dom";

import Logo from '../../images/logo.png';

import { SocketContext } from '../../context/UserContext';

const Header = (props) => {
    const {socket} = useContext(SocketContext)
    return (
        <React.Fragment>
            <nav id="header">
                <img id="logo-header" src={ Logo } alt="Logo Header"/>
                
                <input id="hamburguer-checkbox" type="checkbox"/>
                <label htmlFor="hamburguer-checkbox" className="label-hamburguer">
                    <div className="menu">
                        <span className="hamburguer"></span>
                        <ul id="links-hamburguer">
                            <li><Link to='/lobby'>Lobby</Link></li>
                            <li><Link to='/loja'>Loja</Link></li>
                            <li><Link to='/ranking'>Ranking</Link></li>
                            <li><Link to='/meuperfil'>Meu perfil</Link></li>
                            <li><Link to='/comprar'>Comprar VituCoins</Link></li>
                            <li><Link to='/regras'>Regras</Link></li>
                            <li><Link to='/'>Sair</Link></li>
                        </ul>
                    </div>
                </label>
            </nav>
        </React.Fragment>
    )
}
export default Header;
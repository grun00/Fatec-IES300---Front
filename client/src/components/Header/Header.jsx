import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { SocketContext } from "../../context/UserContext";

import Logo from "../../images/logo.png";
import Avatar from "../../assets/avatar.svg"

const Header = (props) => {

  const { socket } = useContext(SocketContext);
  const {user} = useContext(UserContext);
  const [profileNickname, setProfileNickname] = useState(user.username);
  return (
    <React.Fragment>
      <nav id="header">
        <img id="logo-header" src={Logo} alt="Logo Header" />
        <div id="userIdentification">
            <img id="userAvatarHeader"src={Avatar} alt="Avatar usario" />
            <h3 id="loggedHeader">Ola, <Link id="userLogged" to="/meuperfil">{profileNickname}</Link>!</h3>
        </div>
        <input id="hamburguer-checkbox" type="checkbox" />
        <label htmlFor="hamburguer-checkbox" className="label-hamburguer">
          <div className="menu">
            <span className="hamburguer"></span>
            <ul id="links-hamburguer">
              <li>
                <Link to="/lobby">Lobby</Link>
              </li>
              <li>
                <Link to="/loja">Loja</Link>
              </li>
              <li>
                <Link to="/ranking">Ranking</Link>
              </li>
              <li>
                <Link to="/meuperfil">Meu perfil</Link>
              </li>
              <li>
                <Link to="/comprar">Comprar VituCoins</Link>
              </li>
              <li>
                <Link to="/regras">Regras</Link>
              </li>
              <li>
                <Link to="/">Sair</Link>
              </li>
            </ul>
          </div>
        </label>
      </nav>
    </React.Fragment>
  );
};
export default Header;


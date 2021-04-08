import React from "react";
import Logo from "../images/logo.png";
import "../global.css";
import Input from "./Input/textInput";

import { Link } from "react-router-dom";

const login = (props) => (
  <div className="fields-area">
    <div>
      <img id="logo-menu" src={Logo} />
    </div>

    <Input
      inputType="email"
      inputName="email"
      labelText="E-mail"
      placeholderText="Insira seu email"
    />

    <Input
      inputType="password"
      inputName="password"
      placeholderText="Insira sua senha"
      labelText="Senha"
    />

    <button className="button-accept" type="submit">
      Login
    </button>

    <div className="footer">
      <Link to="/RegisterScreen"> Não possuo cadastro </Link>
      <Link to="/ForgotPassword"> Esqueci minha senha </Link>
    </div>
  </div>
);

export default login;

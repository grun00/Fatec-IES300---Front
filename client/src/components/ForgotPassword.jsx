import React from "react";
import "../global.css";
import { Input } from "./Input/textInput";

import { Link } from "react-router-dom";

const forgotPassword = (props) => (
  <div className="fields-area">
    <Input
      inputType="email"
      labelText="Email"
      inputName="email"
      placeholderText="Insira o seu email para recuperação"
    />

    <button className="button-accept" type="submit">
      Enviar codigo
    </button>

    <div className="footer">
      <Link to="/RegisterScreen"> Não possuo cadastro </Link>
      <Link to="/"> Lembrei minha senha </Link>
    </div>
  </div>
);

export default forgotPassword;

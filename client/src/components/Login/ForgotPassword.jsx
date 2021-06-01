import React from "react";
import "../../global.css";
import { Input } from "../Input/textInput";

import { Link } from "react-router-dom";

const ForgotPassword = (props) => {
  return (
    <form className="fields-area">
    <Input
      inputType="email"
      labelText="Email"
      inputName="email"
      placeholderText="Insira o seu email para recuperação"
      isRequired="true"
    />

    <div className="footer">
      <button className="button-accept" type="submit">
        Enviar codigo
      </button>

      <div className="links">
        <Link to="/RegisterScreen"> Nao possuo cadastro </Link>
        <Link to="/"> Lembrei minha senha </Link>
      </div>
    </div>
  </form>
  )
}
  
  

export default ForgotPassword;

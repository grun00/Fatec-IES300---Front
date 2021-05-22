import React from "react";
import "../../global.css";
import { Input } from "../Input/textInput";import { Link } from "react-router-dom";

const ChangePassword = (props) => {
  return (
    <div className="fields-area">
    <Input
      inputType="password"
      labelText="Nova senha"
      inputName="password"
      placeholderText="Insira sua nova senha"
    />
    
    <Input
      inputType="password"
      labelText="Repitir senha"
      inputName="password-repeat"
      placeholderText="Repita a nova senha"
    />

    <div className="footer">
      <button className="button-accept" type="submit">
        Enviar codigo
      </button>
      <Link to="/"> Lembrei minha senha </Link>
    </div>
  </div>
  );
}

export default ChangePassword;
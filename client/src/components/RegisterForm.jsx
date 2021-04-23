import React from "react";
import "../global.css";
import Input from "./Input/textInput";
import { Link } from "react-router-dom";

const registerForm = (props) => (
  <div className="fields-area">
    <Input
      inputId="input-name"
      inputName="name"
      placeholderText="Insira seu nome"
      labelText="Nome"
    />

    <Input
      inputId="input-user"
      inputName="user"
      placeholderText="Insira um nome de usuário"
      labelText="Usuario"
    />

    <Input
      inputId="input-email"
      inputType="email"
      inputName="email"
      placeholderText="Insira um e-mail"
      labelText="E-mail"
    />

    <Input
      inputId="input-password"
      inputType="password"
      inputName="password"
      placeholderText="Insira uma senha"
      labelText="Senha"
    />

    <Input
      inputId="input-password-repeat"
      inputType="password"
      inputName="password-repeat"
      placeholderText="Repita a sua senha"
      labelText="Repita a senha"
    />

    <div className="footer">
      <button className="button-accept" type="submit">
        Cadastrar
      </button>

      <Link to="/"> Voltar </Link>
    </div>
  </div>
);

export default registerForm;

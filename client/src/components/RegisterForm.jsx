import React from "react";
import "../global.css";
import Input from "./Input/textInput";

import { Link } from "react-router-dom";

const registerForm = (props) => (
  <div className="fields-area">
    <Input
      inputName="name"
      placeholderText="Insira seu nome"
      labelText="Nome"
    />

    <Input
      inputName="user"
      placeholderText="Insira um nome de usuário"
      labelText="Usuário"
    />

    <Input
      inputType="email"
      inputName="email"
      placeholderText="Insira um e-mail"
      labelText="E-mail"
    />

    <Input
      inputType="password"
      inputName="password"
      placeholderText="Insira uma senha"
      labelText="Senha"
    />

    <Input
      inputType="password"
      inputName="password-repeat"
      placeholderText="Repita a sua senha"
      labelText="Repita a senha"
    />

    <button className="button-accept" type="submit">
      Cadastrar
    </button>

    <div className="footer">
      <Link to="/"> Voltar </Link>
    </div>
  </div>
);

export default registerForm;

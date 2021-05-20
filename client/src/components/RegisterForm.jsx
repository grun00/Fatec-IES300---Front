import React, {useState} from "react";
import "../global.css";
import Input from "./Input/textInput";
import { Link } from "react-router-dom";
import api from '../services/api'


const RegisterForm = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userNome, setUserNome] = useState("");

  const register = () => {
    api.post(
      "/players",
      {
        name: userNome,
        username: userName,
        netWorth: 0,
        email: userEmail,
        password: userPassword
      }
    ).then((res) => {
      window.location = "/"
    })
  };

  return (
    <form className="fields-area">
      <Input
        inputId="input-name"
        inputName="name"
        placeholderText="Insira seu nome"
        labelText="Nome"
        onChange={(e)=>{setUserNome(e.target.value)}}
        isRequired="true"
      />

      <Input
        inputId="input-user"
        inputName="user"
        placeholderText="Insira um nome de usuário"
        labelText="Usuario"
        onChange={(e)=>{setUserName(e.target.value)}}
        isRequired="true"
      />

      <Input
        inputId="input-email"
        inputType="email"
        inputName="email"
        placeholderText="Insira um e-mail"
        labelText="E-mail"
        onChange={(e)=>{setUserEmail(e.target.value)}}
        isRequired="true"
      />

      <Input
        inputId="input-password"
        inputType="password"
        inputName="password"
        placeholderText="Insira uma senha"
        labelText="Senha"
        onChange={(e)=>{setUserPassword(e.target.value)}}
        isRequired="true"
      />

      <Input
        inputId="input-password-repeat"
        inputType="password"
        inputName="password-repeat"
        placeholderText="Repita a sua senha"
        labelText="Repita a senha"
        isRequired="true"
      />

      <div className="footer">
        <button className="button-accept" type="submit" onClick={register}>
          Cadastrar
        </button>

        <Link to="/"> Voltar </Link>
      </div>
    </form>
  );
};

export default RegisterForm;

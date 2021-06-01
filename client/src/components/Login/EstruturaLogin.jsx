import React, { useState, useContext } from "react";
import api from "../../services/api";
import Logo from "../../images/logo.png";
import "../../global.css";
import Input from "../Input/textInput";
import { AuthContext, UserContext } from "../../context/UserContext"

import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const {setUser} = useContext(UserContext)
  const {setAuthorized} = useContext(AuthContext)
  const history = useHistory()

  const login = () => {
    api.post(
      "/players/login",
      {
        email: userEmail,
        password: userPassword
      }
    ).then((res) => {
      if (res.data){
        setUser(res.data)
        setAuthorized(true)
        history.push("/lobby")
      } else {
        history.push("/")
      }
    })
  };

  return (
    <div className="fields-area background-fill">
        <img id="logo-menu" src={Logo} alt="Menu's logo" />
      
      <Input
        inputType="email"
        inputName="email"
        labelText="E-mail"
        placeholderText="Insira seu email"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        isRequired="true"
      />

      <Input
        inputType="password"
        inputName="password"
        placeholderText="Insira sua senha"
        labelText="Senha"
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
        isRequired="true"
      />

      <button className="button-accept" type="submit" onClick={login}>
        Login
      </button>
      <div className="footer">
        <Link to="/RegisterScreen"> Nao possuo cadastro </Link>
        <Link to="/ForgotPassword"> Esqueci minha senha </Link>
      </div>
    </div>
  );
};

export default Login;

import React, {useState} from 'react';
import Axios, {redirect} from 'axios';
import Logo from '../images/logo.png';
import '../global.css'

import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const login = () => {
    Axios.post(
      "http://localhost:5000/players/login",
      {
        email: userEmail,
        password: userPassword
      }).then((res) => {
        if ( res == null ) {
          console.log('nao logado')
        } else {
          console.log(res)
          console.log('logado')
        }
      })
  }

  return (
      <div className="fields-area">
        <div>
        <img id="logo-menu" src={Logo} />
        </div>

        <div className="field">
        <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            maxLength="70"
            placeholder="Insira o seu email"
            onChange={(e)=>{setUserEmail(e.target.value)}}
          />
        </div>

        <div className="field">
        <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            maxLength="30"
            placeholder="Insira sua senha"
            onChange={(e)=>{setUserPassword(e.target.value)}}
          />
        </div>

        <button
          className="button-accept"
          type="submit"
          onClick={login}
        >
          Login<
        /button>

            <div className="footer">
            <Link to="/RegisterScreen"> Não possuo cadastro </Link>
            <a href="#">Esqueci minha senha</a>
            </div>
    </div>
  )
}

export default LoginForm;


import React, {useState} from 'react';
import Axios, {redirect} from 'axios';
import '../global.css';

import { Link } from 'react-router-dom';

const Form = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userNome, setUserNome] = useState('');

  const register = () => {
    Axios.post(
      "http://localhost:5000/players",
      {
        nome: userNome,
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
    <div className="fields-area">
        <div className="field">
            <label htmlFor="nome">Nome:</label>
          <input
            id="nome" type="text" placeholder="Insira seu nome"
            onChange={(e)=>{setUserNome(e.target.value)}}
          />
        </div>

        <div className="field">
            <label htmlFor="user">Nome de usuário:</label>
          <input
            id="user"
            type="text"
            placeholder="Insira um nome de usuário"
            onChange={(e)=>{setUserName(e.target.value)}}
          />
        </div>

        <div className="field">
            <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            placeholder="Insira um email aqui"
            onChange={(e)=>{setUserEmail(e.target.value)}}
          />
        </div>

        <div className="field">
            <label htmlFor="password">Insira uma senha:</label>
          <input
            id="password"
            type="password"
            placeholder="Insira sua senha"
            onChange={(e)=>{setUserPassword(e.target.value)}}
          />
        </div>

        <div className="field">
            <label htmlFor="passwordVerify">Repita a senha:</label>
          <input
            id="passwordVerify"
            type="password"
            placeholder="Verifique sua senha"
          />
        </div>

      <button className="button-accept" type="submit" onClick={register}>
        Cadastrar
      </button>

        <div className="footer">
            <Link to="/">Voltar</Link>
        </div>
    </div>
  )
}

export default Form;


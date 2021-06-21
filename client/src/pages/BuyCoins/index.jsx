import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/textInput";
import Bitcoin from "../../images/bitcoin.png";
import { Redirect } from "react-router";
import api from "../../services/api";
import {AuthContext, UserContext} from "../../context/UserContext"

const BuyCoinsPage = (props) => {
  const [value, setValue] = useState(20);
  const {user} = useContext(UserContext);
  const {isAuth} = useContext(AuthContext);
  const [netW, setNetW] = useState(300);

function atualizaQuantidade(valor,netW){
  setValue(value - value + valor)
  
  setNetW(netW)
}

  function comprar(e){

    e.preventDefault();

    const rota = "/players/" + user._id;
    const net = parseInt(user.money,10)+netW
    
    if(CPFvalidation(document.getElementById('cpf').value)){
     
      api.patch(rota,{  "money": net })

      alert("Pedido realizado com sucesso !")

      user.money = net
      
    }else{
      alert("Dados incorretos")
    }
    
  }

  function valida(){
    let cpf = document.getElementById('cpf');
    let inv = document.getElementById('invalido');
    let val = document.getElementById('valido');

    if(CPFvalidation(document.getElementById('cpf').value)){
      cpf.classList.remove('error')
      cpf.classList.add('successful')
      val.style.display = 'flex'
      inv.style.display = 'none'

    } else {
      cpf.classList.remove('successful')
      cpf.classList.add('error')
      inv.style.display = 'flex'
      val.style.display = 'none'
    }
  }

  function CPFvalidation(cpf) {
      var numeros, digitos, soma, i, resultado, digitos_iguais;
      digitos_iguais = 1;
      if (cpf.length < 11)
            return false;
      for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1))
                  {
                  digitos_iguais = 0;
                  break;
                  }
      if (!digitos_iguais)
            {
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                  soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                  return false;
            numeros = cpf.substring(0,10);
            soma = 0;
            for (i = 11; i > 1; i--)
                  soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                  return false;
            return true;
            }
      else
            return false;
}
if(!user && !isAuth){
  return <Redirect to='/' />
}
  return (
    <>
      <div id="PageBuyCoins-area">
        <Header />
        <div id="BuyCoins-area">
          <form
            id="BuyCoins-form"
            /*action={rota}*/
            /*target="_blank"*/
            method="none"
          >
            <h1>Compre suas VituCoins</h1>
            <h3>Escolha a quantidade desejada: </h3>
            <div id="Vitucoins-qtd">
              <div className="radiocoin-field">
                <input
                  type="radio"
                  name="N-coins"
                  checked={!value || value==20}
                  id="300vc"
                  onClick={() => atualizaQuantidade(20,300) }
                />
                <label htmlFor="300vc">
                  300 VC's
                  <img
                    className="vitucoin-buy"
                    src={Bitcoin}
                    alt="Bitcoin symbol"
                  />
                </label>
              </div>

              <div className="radiocoin-field">
                <input
                  type="radio"
                  name="N-coins"
                  id="1000vc"
                  onClick={() => atualizaQuantidade(40,1000)}
                />
                <label htmlFor="1000vc">
                  1000 VC's
                  <img
                    className="vitucoin-buy"
                    src={Bitcoin}
                    alt="Bitcoin symbol"
                  />
                </label>
              </div>

              <div className="radiocoin-field">
                <input
                  type="radio"
                  name="N-coins"
                  id="2500vc"
                  onClick={() => atualizaQuantidade(75,2500)}
                />
                <label htmlFor="2500vc">
                  2500 VC's
                  <img
                    className="vitucoin-buy"
                    src={Bitcoin}
                    alt="Bitcoin symbol"
                  />
                </label>
              </div>

              <div className="radiocoin-field">
                <input
                  type="radio"
                  name="N-coins"
                  id="5000vc"
                  onClick={() => atualizaQuantidade(150,5000) }
                />
                <label htmlFor="5000vc">
                  5000 VC's
                  <img
                    className="vitucoin-buy"
                    src={Bitcoin}
                    alt="Bitcoin symbol"
                  />
                </label>
              </div>

              <div className="radiocoin-field">
                <input
                  type="radio"
                  name="N-coins"
                  id="10000vc"
                  onClick={() => atualizaQuantidade(260,10000)}
                />
                <label htmlFor="10000vc">
                  10000 VC's
                  <img
                    className="vitucoin-buy"
                    src={Bitcoin}
                    alt="Bitcoin symbol"
                  />
                </label>
              </div>
            </div>
            <h3>Preencha seus dados: </h3>
            <div id="data-fields">
              <div id="payment-fields">
                <Input
                  inputId="cpf"
                  inputName="cpfPayment"
                  labelText="CPF"
                  placeholderText="Somente os números"
                  onChange={valida}
                  maxLength="11"
                  isRequired="true"
                />

                <h6 id="invalido">CPF Inválido!</h6>
                <h6 id="valido">CPF Válido!</h6>

                <Input
                  inputName="namePayment"
                  labelText="Nome do Portador"
                  placeholderText="Insira o nome igual ao no cartão"
                  isRequired="true"
                />

                <Input
                  inputName="cardNumber"
                  labelText="Numero do cartao"
                  placeholderText="Coloque os números do cartão"
                  isRequired="true"
                />

                <Input
                  inputName="cardCvv"
                  labelText="Codigo de seguranca"
                  placeholderText="Coloque os dígitos verificadores"
                  maxLength="3"
                  isRequired="true"
                />
              </div>

              <div id="value-field">
                <div className="underline-hor"></div>
                <div id="value-fields2">
                  <h3>O valor a pagar é:</h3>
                  <span id="value">
                    {" "}
                    <span id="real">R$</span> {value}
                    <span id="cent">,00</span>{" "}
                  </span>
                  <img
                    id="bitcoin-rotating"
                    src={Bitcoin}
                    alt="Bitcoin rotating"
                  />
                </div>
              </div>
            </div>
            <button className="button-accept" type="button" onClick={comprar.bind(this)}>Comprar agora</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BuyCoinsPage;

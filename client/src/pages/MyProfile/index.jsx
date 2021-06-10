import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header/Header";
import Avatar from "../../assets/avatar.svg";
import Input from "../../components/Input/textInput";
import Pencil from "../../assets/pencil.svg";
import Vitucoin from "../../images/bitcoin.png";
import {UserContext} from "../../context/UserContext";

const PageMyProfile = () => {
  const {user} = useContext(UserContext);
  const [profileNickname, setProfileNickname] = useState(user.username);
  const [profileName, setProfileName] = useState(user.name);
  const [playerStatus, setPlayerStatus] = useState("Online");
  const [playerCreate, setPlayerCreate] = useState(user.dt_criacao);
  const [playerNetworth, setPlayerNetworth] = useState(user.netWorth);
  const [playerVictorys, setPlayerVictorys] = useState(user.wins);
  const [playerAmount, setPlayerAmount] = useState(user.money);

  function showModal(modalID) {
    let modal = document.getElementById(modalID);
    modal.classList.add("show");
    modal.addEventListener("click", (e) => {
      if (
        e.target.id === modalID ||
        e.target.className === "modal-close-button"
      ) {
        modal.classList.remove("show");
      }
    });
  }
  


  return (
    <>
      <div id="profile-page">
        <Header />
        <div id="profile-area">
          <h1>Meu Perfil</h1>
          <div id="profile-data">
            <div id="photo-field">
              <div id="photo-area">
                <img id="profile-photo" src={Avatar} alt="Avatar" />
                <img id="edit-photo-button" src={Pencil} alt="Edit avatar" 
                onClick={() => {
                  showModal("modal-change-avatar-container");
                }}/>
                
              </div>
              <h2>{profileNickname}</h2>
            </div>

            <div id="infos-profile-area">
              <div id="userdata-fields">
                <div id="user-basic-info">
                  <h2 className="h2-profile">Dados Basicos</h2>
                  <h3>Nome: <span className="profile-infos">{profileName}</span></h3>
                  <h3>Nick: <span className="profile-infos">{profileNickname}</span></h3>
                  <div id="vitucoin-amount">
                    <h2 className="h2-profile">Minhas Vitucoins</h2>
                    <img
                      id="image-amount"
                      src={Vitucoin}
                      alt="Minhas Vitucoins"
                    />
                    <span id="player-money">{playerAmount}</span>
                  </div>
                </div>
                <div id="userinfo-fields">
                  <h2 className="h2-profile">Estatisticas de jogo</h2>
                  <div id="userinfo-fields-area">
                    <h3>Pontos: <span className="profile-infos">{playerNetworth}</span></h3>
                    <h3>Vitorias: <span className="profile-infos">{playerVictorys}</span></h3>
                    <h3>Desde: <span className="profile-infos">{playerCreate}</span></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*<div id="buttons-field">
            <button className="button-accept" type="submit">
              Salvar alteracoes
            </button>
              </div>*/}

          <div id="modal-change-avatar-container" className="modal-container">
            <div id="modal-change-avatar">
              <h3>Escolha seu icone de avatar</h3>
              <div className="modal-fields">
              <div className="modal-fields">
                <button className="modal-close-button">X</button>

                <button className="button-accept">Selecionar</button>
              </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PageMyProfile;

import React from "react";
import "./style.css";

import Header from "../../components/Header/Header";
import Input from "../../components/Input/textInput";
import RoomLobby from "../../components/RoomLobby/RoomLobby";

const PageLobby = (props) => {

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
    <React.Fragment>
      <div id="PageLobby-area">
        <Header />
        <div id="Lobby-area">
          <h1>Encontre uma sala</h1>
          <div id="Lobby-buttons">
            <Input
              id="input-search"
              name="search-room-input"
              placeholderText="Procure uma sala específica"
              labelText="Procurar nome"
            />

            <Input
              id="input-search-code"
              name="search-code-room-input"
              placeholderText="Procure o código da sala"
              labelText="Procurar codigo"
            />

            <button className="button-accept" type="submit">
              Pesquisar
            </button>
          </div>

          <div id="Lobby-create-room">
            <button
              className="button-accept"
              onClick={() => {
                showModal("modal-create-room-container");
              }}
            >
              Criar Sala
            </button>
          </div>

          <div id="Lobby-fields-area">
            {/* GERAÇÃO POR SCRIPT */}
            <RoomLobby />
          </div>

          <div id="modal-create-room-container" className="modal-container">
            <div id="modal-create-room">
              <h3>Criando sala</h3>
              <div className="modal-fields">
                <button className="modal-close-button">X</button>
                <Input
                  id="input-create-name"
                  name="create-room-input-name"
                  labelText="Nome da sala"
                  placeholderText="Insira o nome da sala"
                />

                <Input
                  id="input-create-password"
                  inputType="password"
                  name="create-room-input-password"
                  labelText="Senha"
                  placeholderText="Insira uma senha para sala"
                  maxLength="8"
                />

                <Input
                  id="input-create-token"
                  name="create-room-input-token"
                  labelText="Codigo"
                  placeholderText="Insira um código personalizado"
                  maxLength="4"
                />

                <button className="button-accept">Criar sala agora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageLobby;

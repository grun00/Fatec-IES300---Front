import React from "react";
import "./style.css";

import Header from "../../components/Header/Header";
import Input from "../../components/Input/textInput";
import RoomLobby from "../../components/RoomLobby/RoomLobby";

const PageLobby = (props) => {
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

            <button className="button-accept" type="submit">Pesquisar</button>
          </div>

          <div id="Lobby-fields-area">
            {/* GERAÇÃO POR SCRIPT */}
            <RoomLobby />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageLobby;

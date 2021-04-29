import React, { useState } from "react";
import "./style.css";
import AvatarIcon from "../../assets/avatar.svg";

const RoomLobby = (props) => {
  const [numberUser, setNumberUser] = useState("0/2");

  return (
    <div id="Lobby-field">
      <div id="room-info">
        <img id="icon-field" src={AvatarIcon} alt="Avatar Icon" />
        <div id="room-name-code">
          <span id="room-name">Sala 1</span>
          <span id="room-code">#0000</span>
        </div>
      </div>
      <div id="infos-field">
        <div id="user-numbers">
          <img src={AvatarIcon} alt="Avatar Icon" />
          <small>{numberUser}</small>
        </div>
      </div>
    </div>
  );
};

export default RoomLobby;

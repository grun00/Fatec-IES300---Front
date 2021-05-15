import React, { useState } from "react";
import "./style.css";
import AvatarIcon from "../../assets/avatar.svg";

const RoomLobby = (props) => {
  const [numberUser, setNumberUser] = useState("0/2");
  const [roomName, setRoomName] = useState("Sala X");
  const [roomCode, setRoomCode] = useState("0001");

  return (
    <div id="Lobby-field">
      <div id="room-info">
        <img id="icon-field" src={AvatarIcon} alt="Avatar Icon" />
        <div id="room-name-code">
          <span id="room-name">{roomName}</span>
          <span id="room-code">#{roomCode}</span>
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

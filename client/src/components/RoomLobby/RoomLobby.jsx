import React, { useEffect, useState } from "react";
import "./style.css";
import AvatarIcon from "../../assets/avatar.svg";

const RoomLobby = (props) => {
  const [userCount, setUserCount] = useState(0);
  const [maxUsers, setMaxUsers] = useState(2);
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    setRoomName(props.roomName) 
    setRoomCode(props.roomCode)
    setUserCount(props.userCount)
    })
  
  return (
    <div id="Lobby-field" onClick={props.onClick}>
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
          <small>{userCount}/{maxUsers}</small>
        </div>
      </div>
    </div>
  );
};

export default RoomLobby;

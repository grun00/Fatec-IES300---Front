import React, { useEffect, useState } from "react";
import "./style.css";

import Header from "../../components/Header/Header";
import Input from "../../components/Input/textInput";
import RoomLobby from "../../components/RoomLobby/RoomLobby";
import connectSocket from "../../services/socket"

const PageLobby = (props) => {
  const [socket, setSocket] = useState();
  const [roomName, setRoomName] = useState();
  const [roomList, setRoomList] = useState([])
  const [roomPwd,setRoomPwd] = useState()
  const [roomId,setRoomId] = useState()
  const [player, setPlayer] = useState({name: "Vitao"});
  const [serverInfo, setSeverInfo] = useState();

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
  
  useEffect(() => {
    const socket = connectSocket();
    setSocket(socket)
    setPlayer({name: "Vitao"})
    socket.emit("newPlayer", player)
    socket.io.emit("getServerInfo", data => {
        setSeverInfo(data)
        console.log(serverInfo)
    })
  }, [])
  
  const createRoom = (e) => {
        e.preventDefault()
        console.log("Clicked")
        socket.emit("createRoom", roomName)
        socket.on("roomCreated", () => {
          socket.emit("getServerInfo", data => {
            console.log(data)
            setSeverInfo(data)
          })
        })
        if(!roomList){
          setRoomList([])
        } else {
        const roomNameList = [...roomList]
        roomNameList.push(roomName)
        setRoomList(roomNameList)
        }
  }

  const joinRoom = (e) => {
      e.preventDefault()
      socket.emit("joinRoom", roomName)
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
            {!roomList ? null : roomList.map(room =>{
             return (<RoomLobby key={room} roomName={room} onClick={joinRoom}/>)
            }) }

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
                  onChange = {(e) => {
                    setRoomName(e.target.value)}}
                />

                <Input
                  id="input-create-password"
                  inputType="password"
                  name="create-room-input-password"
                  labelText="Senha"
                  placeholderText="Insira uma senha para sala"
                  maxLength="8"
                  onChange = {(e) => {setRoomPwd(e.value)}}
                />

                <Input
                  id="input-create-token"
                  name="create-room-input-token"
                  labelText="Codigo"
                  placeholderText="Insira um código personalizado"
                  maxLength="4"
                  onChange = {(e) => {setRoomId(e.value)}}
                />

                <button className="button-accept" onClick={createRoom}>Criar sala agora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageLobby;

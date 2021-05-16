import React, { useEffect, useState, useContext } from "react";
import "./style.css";

import Header from "../../components/Header/Header";
import Input from "../../components/Input/textInput";
import RoomLobby from "../../components/RoomLobby/RoomLobby";
import connectSocket from "../../services/socket"
import { UserContext } from "../../context/UserContext"
import {useHistory} from "react-router-dom";

const PageLobby = (props) => {
  const [socket, setSocket] = useState(null);
  const [serverInfo, setSeverInfo] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [roomFilter, setRoomFilter] = useState("")
  const [roomPwd,setRoomPwd] = useState()
  const [roomId,setRoomId] = useState()
  const [updateInfo, setUpdateInfo] = useState(false)

  const { user } = useContext(UserContext)
  const { authorized} = useContext(UserContext)
  const history = useHistory()


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
     if (updateInfo) {
       socket.emit("getServerInfo")
       socket.on("serverInfo", (data) => {
        setSeverInfo(data)
      })
    }
    return () => setUpdateInfo(false)
    }, [updateInfo])

  useEffect(() => {
    if (user) {
    const socket = connectSocket();
    setSocket(socket)
    console.log(authorized)
    socket.emit("newPlayer", user)
    setUpdateInfo(true)
    }
  }, [])
  

  const createRoom = (e) => {
    e.preventDefault()
    socket.emit("createRoom", roomName)
    socket.on("roomCreated", () => {
      setUpdateInfo(true)
      history.push("/gamepage")
      })
    }

  const joinRoom = (e) => {
    e.preventDefault()
    const roomAttrs = e.currentTarget.innerText.split("\n")
    const roomObject = {
      name: roomAttrs[0],
      id: roomAttrs[1],
      userCount: Number(roomAttrs[2].substr(0,1)),
      maxPlayers: Number(roomAttrs[2].substr(2))
    }
    if (roomObject.userCount < roomObject.maxPlayers){
      socket.emit("joinRoom", roomObject.name)
      setUpdateInfo(true)
      history.push("/gamepage")
    }
  }
  
 const handleFilter = (room) => {
   if(room && roomFilter){
      if(room.props.roomName.toLoweCase().includes(roomFilter.toLoweCase()) || room.props.roomCode.toLoweCase().includes(roomFilter.toLoweCase())){
        return room
      }
   } else {
     return room
   }
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
              onChange={e => setRoomFilter(e.target.value)}
            />

            <Input
              id="input-search-code"
              name="search-code-room-input"
              placeholderText="Procure o código da sala"
              labelText="Procurar codigo"
              onChange={e => setRoomFilter(e.target.value)}
            />
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
            {
            !(socket && serverInfo) ? null : 
            Object.entries(serverInfo?.channels).map(([room, players], id)=>{
              if (room !== "General") {
                return (
                  <RoomLobby 
                    key={id} 
                    roomName={room}
                    roomCode={(("0000" + id).substr(-4,4))}
                    onClick={joinRoom}
                    userCount={players.length}
                  />
                )
              }
             }).filter(handleFilter)
            }
            
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

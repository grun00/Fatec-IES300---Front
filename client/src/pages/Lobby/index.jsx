import React, { useEffect, useState, useContext } from "react";
import "./style.css";

import Header from "../../components/Header/Header";
import Input from "../../components/Input/textInput";
import RoomLobby from "../../components/RoomLobby/RoomLobby";
import {
  AuthContext,
  SocketContext,
  UserContext,
} from "../../context/UserContext";
import { useHistory, Redirect } from "react-router-dom";
import connectSocket from "../../services/socket";

const PageLobby = () => {
  const { user } = useContext(UserContext);
  const { socket, setSocket } = useContext(SocketContext);
  const { isAuth } = useContext(AuthContext);
  const [serverInfo, setSeverInfo] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [roomFilter, setRoomFilter] = useState("");
  const [roomPwd, setRoomPwd] = useState();
  const [roomId, setRoomId] = useState();
  const [updateInfo, setUpdateInfo] = useState(false);
  const [joinRoomName, setJoinRoomName] = useState();
  const [joinRoomId, setJoinRoomId] = useState();
  const [joinRoomUserCount, setJoinRoomUserCount] = useState();
  const questionThemes = [
    { label: 'Todos os temas', value: '' },
    { label: 'Atualidades', value: 'Atualidades' },
    { label: 'TI', value: 'TI' },
    { label: 'Conhecimentos Gerais', value: 'Conhecimentos Gerais' },
    { label: 'Entretenimento', value: 'Entretenimento' }
  ]
  const [selectedOption, setSelectedOption] = useState(questionThemes[0].value);

  const history = useHistory();

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
      socket.emit("getServerInfo");
      socket.on("serverInfo", (data) => {
        setSeverInfo(data);
      });
    }
    return () => setUpdateInfo(false);
  }, [updateInfo]);

  useEffect(() => {
    if (user && isAuth) {
      const socket = connectSocket();
      setSocket(socket);
      socket.emit("newPlayer", user);
      setUpdateInfo(true);
    }
  }, []);

  const createRoom = (e) => {
    e.preventDefault();
    socket.emit("createRoom", {
      roomName: roomName,
      roomPwd: roomPwd,
      roomTheme: selectedOption
    });
    socket.on("roomCreated", () => {
      setUpdateInfo(true);
      history.push("/match");
    });
  };

  const joinRoom = (e) => {
    e.preventDefault();
    const roomAttrs = e.currentTarget.innerText.split("\n");
    const roomObject = {
      name: joinRoomName,
      id: joinRoomId,
      password: roomPwd,
      userCount: Number(joinRoomUserCount.substr(0, 1)),
      maxPlayers: Number(joinRoomUserCount.substr(2)),
    };
    socket.emit("joinRoom", { roomName: roomObject.name, roomPwd: roomObject.password });
    socket.on("joinedRoom", (data) => {
      if (data) {
        setUpdateInfo(true);
        history.push("/match");
      }
    });
  };

  const handleFilter = (room) => {
    if (room && roomFilter) {
      if (
        room.props.roomName.toLowerCase().includes(roomFilter.toLowerCase()) ||
        room.props.roomCode.toLowerCase().includes(roomFilter.toLowerCase())
      ) {
        return room;
      }
    } else {
      return room;
    }
  };

  if(!user || !isAuth) {
    return (<Redirect to="/" />)
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
              onChange={(e) => setRoomFilter(e.target.value)}
            />

            <Input
              id="input-search-code"
              name="search-code-room-input"
              placeholderText="Procure o código da sala"
              labelText="Procurar codigo"
              onChange={(e) => setRoomFilter(e.target.value)}
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
            {!(socket && serverInfo)
              ? null
              : Object.entries(serverInfo?.channels)
                  .map(([room, roomData], id) => {
                    if (room !== "General") {
                      return (
                        <RoomLobby
                          key={id}
                          roomName={room}
                          roomCode={("0000" + id).substr(-4, 4)}
                          onClick={(e) => {
                            let croomInfo = e.currentTarget.innerText.split("\n");
                            setJoinRoomName(croomInfo[0])
                            setJoinRoomId(croomInfo[1])
                            setJoinRoomUserCount(croomInfo[2])
                            showModal("modal-join-room-container");
                          }}
                          userCount={roomData.players.length}
                        />
                      );
                    }
                  })
                  .filter(handleFilter)}
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
                  isRequired="true"
                />


                <Input
                  id="input-create-password"
                  inputType="password"
                  name="create-room-input-password"
                  labelText="Senha"
                  placeholderText="Insira uma senha para sala"
                  maxLength="8"
                  onChange={(e) => {
                    setRoomPwd(e.target.value);
                  }}
                />

                <label id="select-area" for="theme-select-box" className="input-field">
                  <label for="theme-select-box">Escolha um tema para excluir:</label>
                  <select
                    id='theme-select-box'
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}>
                    {questionThemes.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </label>

                <button className="button-accept" onClick={createRoom}>Criar sala agora</button>
              </div>
            </div>
          </div>

          <div id="modal-join-room-container" className="modal-container">
            <div id="modal-join-room">
              <h3>Entrar na sala</h3>
              <div className="modal-fields">
                <button className="modal-close-button">X</button>

                <Input
                  id="input-join-password"
                  inputType="text"
                  name="join-room-input-password"
                  labelText="Senha"
                  placeholderText="Insira a senha (vazio se nao existe)"
                  maxLength="8"
                  onChange={(e) => {
                    setRoomPwd(e.target.value);
                  }}
                />

                <button className="button-accept" onClick={joinRoom}>Entrar na sala agora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageLobby;

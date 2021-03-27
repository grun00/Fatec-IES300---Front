import React, { useEffect, useState, useRef } from 'react';
import connectSocket from '../../services/socket';
import api from '../../services/api';
import { Input } from "../../components/Input/textInput"

import "./styles.css"


const SocketTest = () => {
    const [player, setPlayer] = useState({
        name: ''
    })
    const [nameInput, setNameInput] = useState("")
    const [updateInfo, setUpdateInfo] = useState(false)
    const [socket, setSocket] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [roomName, setRoomName] = useState('')
    const [onlinePlayers, setOnlinePlayers] = useState([])
    const [serverInfo, setServerInfo] = useState(null)


    const handleServerInfo = (e) => {
        e.preventDefault();
        socket.emit("getServerInfo")
        setUpdateInfo(true)
    }

    const handleConnect = (e) => {
        e.preventDefault()
        socket.open()
        socket.on("connect", () => console.log("Connected"))
        setServerInfo(true)
    }
    const handleDisconnect = (e) => {
        e.preventDefault()
        setUpdateInfo(true)
        socket.close()
    }

    const handleChange = (e) => {
        const {name,  value} = e.target
        setPlayer((player) => ({ ...player, [name]: value.trim() }))
        setNameInput(() => (value.trim()))
    }

    const handleChangeRoomName = (e) => {
        setRoomName(() =>  e.target.value.trim())
    }

    const createRoom = (e) => {
        e.preventDefault()
        socket.emit("createRoom", roomName)
        setUpdateInfo(true)
        setRoomName("")
    }

    const joinRoom = (e) => {
        e.preventDefault()
        socket.emit("joinRoom", roomName)
        setUpdateInfo(true)
        setRoomName("")
    }

    const leaveRoom = (e) => {
        e.preventDefault()
        console.log("Here", roomName)
        socket.emit("leaveRoom", roomName)
        setUpdateInfo(true)
        setRoomName("")
    }

    const addNewPlayer = (e) => {
        e.preventDefault()
        if(player.name) {
            socket.emit("newPlayer", player)
            setUpdateInfo(true)
            setNameInput("")
            setDisabled(true)
        }
    }

    useEffect(() => {
        if (updateInfo) {
            socket.emit("getServerInfo")
            socket.on("serverInfo", (data) => {
                setServerInfo(data)
            })
        }
        return () => setUpdateInfo(false)
    }, [updateInfo])

    useEffect(() => {
        const socket = connectSocket()
        setSocket(socket)
        setUpdateInfo(true)
    }, [])

    return (
        <div className="fields-area">
            <h1> Socket Test </h1>
            <div className="container">
                <div className="server-info-container">
                    <h3>Server Info:</h3>
                    {serverInfo && socket
                        ? Object.entries(serverInfo.channels).map(([key, value], id) => {
                            return (
                                <div id={id} className="inner-content">
                                    <p id={id}>Room Name: {key}</p>
                                    <p>Members: {value.map((item, id) => {
                                        return <span id={id}> {item} </span>
                                    })}</p>
                                </div>
                            )
                        })

                        : null}
                    <div className="inner-content">
                        <h4>Players:</h4>
                    {onlinePlayers.length > 0 && socket ? onlinePlayers.map((item) => {
                        return <p id={item}>{item}</p>
                    }) : null}
                    </div>
                </div>

            </div>
            <Input onChange={handleChange} labelText={"name"} inputName={"name"} inputValue={nameInput}/>
            <button className="button-accept" onClick={addNewPlayer}>Submit</button>
            <Input onChange={handleChangeRoomName} labelText={"room"} inputName={"room"} inputValue={roomName}/>
            <div className="btn-group">
                <button className="button-accept" onClick={joinRoom}>Join Room</button>
                <button className="button-accept" onClick={leaveRoom}>Leave Room</button>
                <button className="button-accept" onClick={createRoom}>Create Room</button>
            </div>
            <div className="btn-group">
                <button className="button-accept" onClick={handleDisconnect}>Disconnect</button>
                <button className="button-accept" onClick={handleServerInfo}>Get Server Info</button>
                <button className="button-accept" onclick={handleConnect}>Reconnect Not Working</button>
            </div>

        </div>
    )
}

export default SocketTest;
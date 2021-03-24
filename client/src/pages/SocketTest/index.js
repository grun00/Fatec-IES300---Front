import React, { useEffect, useState } from 'react';
import connectSocket from '../../services/socket';
import api from '../../services/api';

import "./styles.css"


const SocketTest = () => {
    const [player, setPlayer] = useState({
        name: ''
    })
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
        const socket = connectSocket()
        setSocket(socket)
        setServerInfo(true)
    }
    const handleDisconnect = (e) => {
        e.preventDefault()
        setUpdateInfo(true)
        socket.close()
    }

    const handleChange = (e) => {
        setPlayer({ ...player, [e.target.name]: e.target.value.trim() })
    }

    const handleChangeRoomName = (e) => {
        setRoomName(e.target.value.trim())
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
        socket.emit("leaveRoom", roomName)
        setUpdateInfo(true)
        setRoomName("")
    }

    const addNewPlayer = (e) => {
        e.preventDefault()
        socket.emit("newPlayer", player)
        setUpdateInfo(true)
        setPlayer({ name: "" })
        setDisabled(true)
    }

    useEffect(() => {
        if (updateInfo) {
            socket.emit("getOnlinePlayers")
            socket.on("onlinePlayers", (data) => {
                console.log(data)
                setOnlinePlayers(Object.keys(data))
            })
            socket.on("serverInfo", (data) => {
                setServerInfo(data)
            })
        }
        return () => setUpdateInfo(false)
    }, [updateInfo])

    useEffect(() => {
        const socket = connectSocket()
        setSocket(socket)
    }, [])

    return (
        <div className="fields-area">
            <h1> Socket Test </h1>
            <div className="container">
                <div className="server-info-container">
                    <h3>Server Info:</h3>
                    {serverInfo && socket
                        ? Object.entries(serverInfo.channels).map(([key, value], id) => {
                            console.log(value)
                            return (
                                <div className="inner-content">
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
            <div className="field">
                <div className="input-field">
                <label htmlFor="name">Player Name:</label>
                    <input type="text" name="name" value={player.name} onChange={handleChange} disabled={disabled}></input>
                </div>
            </div>
            <button className="button-accept" onClick={addNewPlayer} disabled={disabled}>Submit</button>
            <div className="field">
                <div className="input-field">
                <label htmlFor="room">Room Name:</label>
                <input type="text" name="room" value={roomName} onChange={handleChangeRoomName}></input>
                </div>
            </div>
            <div className="btn-group">
                <button className="button-accept" onClick={joinRoom}>Join Room</button>
                <button className="button-accept" onclick={leaveRoom}>Leave Room</button>
                <button className="button-accept" onClick={createRoom}>Create Room</button>
            </div>
            <div className="btn-group">
                <button className="button-accept" onClick={handleDisconnect}>Disconnect</button>
                <button className="button-accept" onClick={handleServerInfo}>Get Server Info</button>
                <button className="button-accept" onclick={handleConnect}>Reconnect</button>
            </div>

        </div>
    )
}

export default SocketTest;
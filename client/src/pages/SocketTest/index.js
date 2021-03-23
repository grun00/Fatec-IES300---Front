import React, {useEffect, useState} from 'react';
import connectSocket from '../../services/socket';
import api from '../../services/api';

const socketTest = () => {
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
 setPlayer({...player, [e.target.name]: e.target.value.trim()})
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
        setPlayer({name: ""})
        setDisabled(true)
    }

useEffect(() => {
    if(updateInfo) {
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
        <div>
        <form>
            <label >Player Name:  
            <input type="text" name="name" value={player.name} onChange={handleChange} disabled={disabled}></input>
            </label>
            <button onClick={addNewPlayer} disabled={disabled}>Submit</button>
        </form>
        <form>
            <label>Room Name: 
            <input type="text" name="room" value={roomName} onChange={handleChangeRoomName}></input>
            </label>
            <button onClick={createRoom}>Create Room</button>
            <button onClick={joinRoom}>Join Room</button>
            <button onclick={leaveRoom}>Leave Reoom</button>
        </form>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={handleServerInfo}>Get Server Info</button>
        <button onclick={handleConnect}>Reconnect</button>
        <div>
            <h3>Server Info:</h3>
            <div>
            {serverInfo && socket 
            ? Object.entries(serverInfo.channels).map(([key, value], id) => {
                console.log(value)
                return (
                <div>
                    <p id={id}>{key}</p>

                    <p>Members: {value.map((item, id) => {
                       return  <span id={id}> {item} </span>
                    })}</p>    
                </div>
                    )
            })

                    : null}

            </div>
            <h4>Players</h4>
            {onlinePlayers.length > 0 && socket ? onlinePlayers.map((item) => {
                return <p id={item}>{item}</p>
            }): null}
            
        </div>
        <div>
        </div>
    </div>
    )
}

export default socketTest;
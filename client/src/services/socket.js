import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:5000"

const connectSocket = () => {
    return socketIOClient(ENDPOINT);
}

export default connectSocket;
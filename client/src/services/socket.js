import socketIOClient from "socket.io-client"

const ENDPOINT = "https://show-do-vitao.herokuapp.com/"

const connectSocket = () => {
    return socketIOClient(ENDPOINT);
}

export default connectSocket;
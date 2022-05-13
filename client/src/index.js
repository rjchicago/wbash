import { TerminalUI } from "./TerminalUI";
import io from "socket.io-client";

const serverAddress = process.env.SERVER_ADDRESS;

function connect(serverAddress) {
  return new Promise(res => {
    const socket = io(serverAddress);
    res(socket);
  });
}

function start() {
  const container = document.getElementById("terminal-container");
  connect(serverAddress).then(socket => new TerminalUI(socket, container));
}

start();
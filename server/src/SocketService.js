const socketIO = require("socket.io");
const PTYService = require("./PTYService");

const cors = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"]
};

class SocketService {
  constructor() {
    this.socket = null;
    this.pty = null;
  }

  attachServer(server) {
    if (!server) {
      throw new Error("Server not found...");
    }

    const io = socketIO(server, { cors });
    console.log("Created socket server. Waiting for client connection...");

    io.on("connection", socket => {
      console.log("Connected Socket: ", socket.id);
      this.socket = socket;
      this.socket.on("disconnect", () => console.log("Disconnected Socket: ", socket.id));
      this.socket.on("input", input => this.pty.write(input));
      this.pty = new PTYService(this.socket);
      this.pty.write('clear\r');
    });
  }
}

module.exports = SocketService;
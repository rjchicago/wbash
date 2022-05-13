const socketIO = require("socket.io");
const PTYService = require("./PTYService");

class SocketService {
  constructor() {
    this.socket = null;
    this.pty = null;
  }

  attachServer(server) {
    if (!server) {
      throw new Error("Server not found...");
    }

    const io = socketIO(server, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
      }
    });
    console.log("Created socket server. Waiting for client connection...");

    io.on("connection", socket => {
      console.log("Connected Socket: ", socket.id);
      this.socket = socket;
      this.socket.on("disconnect", () => console.log("Disconnected Socket: ", socket.id));
      this.pty = new PTYService(this.socket);
      this.socket.on("input", input => {
        this.pty.write(input);
      });
      this.pty.write('clear\r');
    });
  }
}

module.exports = SocketService;
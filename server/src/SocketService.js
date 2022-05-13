const socketIO = require("socket.io");
const PTYService = require("./PTYService");

const clientAddress = process.env.CLIENT_ADDRESS;

const cors = {
  origin: clientAddress,
  methods: ["GET", "POST"]
};

class SocketService {
  constructor(server) {
    if (!server) throw new Error("Server not found...");
    const io = socketIO(server, { cors });
    console.log("Created socket. Awaiting connection...");
    io.on("connection", socket => {
      console.log("Connected Socket: ", socket.id);
      this.socket = socket;
      this.pty = new PTYService(this.socket);
      this.pty.write('clear\r');
      this.socket.on("input", input => this.pty.write(input));
      this.socket.on("disconnect", () => console.log("Disconnected Socket: ", socket.id));
    });
  }
}

module.exports = SocketService;
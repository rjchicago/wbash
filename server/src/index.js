const http = require("http");
const SocketService = require("./SocketService");

const server = http.createServer((req, res) => {
  res.write("Terminal Server Running.");
  res.end();
});

const port = 3000;

server.listen(port, function() {
  console.log("Server listening on : ", port);
  const socketService = new SocketService();
  socketService.attachServer(server);
});
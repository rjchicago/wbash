const http = require("http");
const SocketService = require("./SocketService");

const port = 3000;
const server = http.createServer();
server.listen(port, function() {
  console.log("Server listening on port", port);
  new SocketService(server);
});
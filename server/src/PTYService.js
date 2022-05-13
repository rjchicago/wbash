const os = require("os");
const pty = require("node-pty");

class PTY {
  constructor(socket) {
    this.shell = os.platform() === "win32" ? "powershell.exe" : "bash";
    this.ptyProcess = null;
    this.socket = socket;
    this.start();
  }

  start() {
    this.ptyProcess = pty.spawn(this.shell, [], {
      name: "xterm-color",
      cwd: "/",
      env: process.env
    });
    this.ptyProcess.on("error", console.log);
    this.ptyProcess.on("data", data => this.socket.emit("output", data));
  }

  write(data) {
    this.ptyProcess.write(data);
  }
}

module.exports = PTY;
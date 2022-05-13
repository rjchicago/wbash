import { Terminal } from "xterm";
import "xterm/css/xterm.css";

export class TerminalUI {
  constructor() {
    this.terminal = new Terminal({
      cols: 180,
      rows: 50
    });

    this.terminal.setOption("theme", {
      background: "#202B33",
      foreground: "#F5F8FA"
    });
  }

  attach(socket, container) {
    this.socket = socket;
    this.terminal.open(container);
    this.terminal.onData(data => this.socket.emit("input", data));
    this.socket.on("output", data => this.terminal.write(data));
  }
}
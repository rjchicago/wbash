import { Terminal } from "xterm";
import "xterm/css/xterm.css";

export class TerminalUI {
  constructor(socket, container) {
    this.socket = socket;
    this.terminal = new Terminal({
      cols: 195,
      rows: 50
    });
    this.terminal.setOption("theme", {
      background: "#202B33",
      foreground: "#F5F8FA"
    });
    this.terminal.open(container);
    this.terminal.onData(data => this.socket.emit("input", data));
    this.socket.on("output", data => this.terminal.write(data));
  }
}
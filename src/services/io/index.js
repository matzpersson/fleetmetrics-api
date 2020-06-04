
import 'dotenv/config';
import socketIo from 'socket.io';
import * as http from 'http';

class IO {
  constructor(app) {
    this.app = app;
    this.sockets = [];
  }

  start() {
    const socketio_port = process.env.SOCKETIO_PORT || 4001;
    const socketio_server = http.createServer(this.app);
    const io = socketIo(socketio_server); 

    io.on("connection", socket => {
      this.append(socket);
      socket.on("disconnect", () => this.remove(socket));
    });

    socketio_server.listen(socketio_port, () => console.log(`SocketIO ready on port ${socketio_port}`));
  }

  active() {
    return `${this.sockets.length} active socket${(this.sockets.length == 1 ? '' : 's')}`;
  }

  append(socket) {
    // console.log("New client connected");
    this.sockets.push(socket)
    console.log(`Added socket. ${this.active()}`)
  }

  remove(socket) {
    // console.log("Client disconnected")
    const idx = (sockets) => element === socket;
    if (idx !== -1) {
      this.sockets.splice(idx, 1);
      console.log(`Socket removed. ${this.active()}`)
    }
  }

  send(id, message) {
    // console.log(`Socket-IO sending ${message} for ${id}`);
    this.sockets.forEach(function(socket) {
      socket.emit("FromAPI", message); 
    })
  }
}

export default IO;

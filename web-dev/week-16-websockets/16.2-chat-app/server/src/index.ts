import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let users = 0;

let allConnections: WebSocket[] = [];

wss.on("connection", (socket) => {
  users++;
  console.log(`User #${users} connected`);
  allConnections.push(socket);

  socket.on("message", (msg) => {
    // console.log(`Client sent: ${msg.toString()}`);
    allConnections.forEach((socket) => {
      socket.send(`Client sent: ${msg.toString()}`);
    });
  });

  socket.on("disconnect", () => {
    allConnections = allConnections.filter((x) => x !== socket);
  });
});

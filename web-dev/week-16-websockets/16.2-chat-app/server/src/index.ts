import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let users = 0;

wss.on("connection", (socket) => {
  users++;
  console.log(`User #${users} connected`);

  socket.on("message", (msg) => {
    console.log(`Client sent: ${msg.toString()}`);

    setTimeout(() => {
      socket.send("Here you go...");
    }, 2000);

    socket.send("Wait 2 seconds for the response...");
  });
});

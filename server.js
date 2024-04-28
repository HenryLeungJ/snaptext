import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

//delete user
async function deleteUser(socket) {
  await fetch("http://localhost:3000/api/deleteuser", {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({id: socket.id})
  }).then(response => response.json()).then((data) => {console.log(("deleted: " + data.userid) || data.error)})
} 



app.prepare().then(() => {

  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    // socket.emit("hello", "world");
    
    console.log(socket.id);
    await socket.on('disconnect', () => {
      console.log("disconencted")
      deleteUser(socket);
      socket.broadcast.emit("fetchusers")
    })
    await socket.on("on", async () => {
      await socket.emit("adduser");
      socket.emit("fetchusers")
    })
    socket.on("submitted", (message, room) => {
        if(room ==='') {
            socket.broadcast.emit('recieved', message);
        } else {
            socket.to(room).emit('recieved', message);
        }
        
        console.log(message)
      }) //sending the message from the clientside to everyone
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
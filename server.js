import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import names from 'human-names';

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

async function addUser(socket) {
  // const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); // big_red_donkey
  const randomName = names.allRandom();
  console.log(randomName)
  await fetch("http://localhost:3000/api/newuser", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({id: socket.id, name: randomName})
  })
}



app.prepare().then(() => {

  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    
    console.log(socket.id);
    socket.on('disconnect', () => {
      console.log("disconencted")
      deleteUser(socket)

    })
    socket.on("newuser", () => {
      addUser(socket).then(() => {io.emit("fetchusers")});
      console.log("done")
      
    })

    socket.on("message-sent", (message, toUserId, id) => {
      socket.to(toUserId).emit('message-from-user', message, id)
    }) //recieved message from user then send message to specified user
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
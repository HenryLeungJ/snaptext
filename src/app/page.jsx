"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import NewUser from '@components/newUser'


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  //message
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("")

  //Room
  const [room, setRoom] = useState("")

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
    // socket.on("hello", (value) => {
    //   setMessage(value);
    // });

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      setMessage([`You connected with ${socket.id}`])

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    socket.on('recieved', (message1) => {
      setMessage((prev) => {console.log(prev); return [...prev, message1]}) //displaying other peoples message sent to the server back to all clients
    })

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("recieved");
    };
  }, []);
  

  //creating texts to display
  function createText(text, index) {
    return (<p key={index}>{text}</p>)
  }

  return (
    <div className="w-screen h-screen">
      <p>Status: { isConnected ? "connected" : "disconnected" }</p>
      <p>Transport: { transport }</p>
      <div className="w-full h-80 flex flex-col items-center">
        {message.map((val, index) => {
          return createText(val, index);
        })}
      </div>
      <form onSubmit={(e) => {
        setMessage((prev) => [...prev, input]) //inputing more messages into messages array to be mapped
        socket.emit("submitted", input, room);
        e.preventDefault();
        console.log(message)
      }}>
        <input type="text" placeholder="text" onChange={(e) => {setInput(e.target.value)}} value={input}/>
        <input type="submit" placeholder="submit"></input>
      </form>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}>
        <input type="text" placeholder="room" onChange={(e) => {setRoom(e.target.value)}} value={room}/>
        <input type="submit" placeholder="submit"></input>
      </form>
      <NewUser/>
    </div>
  );
}
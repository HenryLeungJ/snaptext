"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import NewUser from '@/components/newUser';
import Alert from '@/components/alert'
// import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'
import names from 'human-names';

const users = [{id: 'henry'}, {id: 'hff'}, {id: 'hs'}, {id: 'pen'}, {id: 'leung'},]; //static test data

export default function Home() {
  // const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState("N/A");
  const [allUsers, setAllUsers] = useState([])
  const [recievedMessage, setRecievedMessage] = useState() //try to see how to convert the recieved users into an array of sets and loop over it to find value
  const [recievedUsers, setRecievedUsers] = useState({}) //people who sent the user a message

  // //message
  // const [message, setMessage] = useState([]);
  // const [input, setInput] = useState("")

  // //Room
  // const [room, setRoom] = useState("")

  function sendMessage(message, toUserId) {
    if(toUserId in recievedUsers){
      return(console.log(wait)) //change this in the future to be an alert
    }
    socket.emit("message-sent", message, toUserId, socket.id);
    // console.log("sent message", message, toUserId)
  }

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
    // socket.on("hello", (value) => {
    //   setMessage(value);
    // });

    async function fetchUsers() {
      await fetch("http://localhost:3000/api/getusers")
      .then((response) => response.json())
      .then((data) => {setAllUsers(data); console.log(data)})
    }
    function onConnect() {
      // setIsConnected(true);
      // setTransport(socket.io.engine.transport.name);
      // setMessage([`You connected with ${socket.id}`])
      // await fetchUsers();

      socket.on("fetchusers", () => {
          fetchUsers();
      })
      socket.on("message-from-user", (message, fromUserId) => {
        setRecievedMessage(message);
        setRecievedUsers((prev) => {return {...prev, [fromUserId]: message}}) //replaces new user who sent message with icon
      })

      // socket.io.engine.on("upgrade", (transport) => {
      //   setTransport(transport.name);
      // });

    }

    // socket.on('recieved', (message1) => {
    //   setMessage((prev) => {console.log(prev); return [...prev, message1]}) //displaying other peoples message sent to the server back to all clients
    // })

    socket.on("disconnect", onDisconnect);

    function onDisconnect() {
      // setIsConnected(false);
      // setTransport("N/A");
      console.log('disconnected');
    }
    socket.on("connect", onConnect);


    return () => {
      socket.emit("newuser"); //adding new user
      socket.off("disconnect", onDisconnect);
      socket.off("connect", onConnect);
      // socket.off("recieved");
      socket.off("adduser");
      socket.off("fetchusers");
      socket.off("message-from-user")
    };
  }, []);
  

  //creating texts to display
  function createText(text, index) {
    return (<p key={index}>{text}</p>)
  }

  return (
    <div className="w-screen h-80 my-10 flex justify-center">
  
        <div className="w-[80%] grid grid-cols-4 gap-4">
          {allUsers.map((val) => {
            if (socket.id == val.userid) {
              return <NewUser key={val.userid} id={val.userid} name={val.username} img={val.icon} highlight={true} onClick={sendMessage}/>
            }
            else if (val.userid in recievedUsers) {
              return <Alert key={val.userid}/>
            }
            return <NewUser key={val.userid} id={val.userid} name={val.username} img={val.icon} onClick={sendMessage}/>
          })}
        </div>
    </div>
  );
}


{/* <div className="w-screen h-screen">
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
    </div> */}
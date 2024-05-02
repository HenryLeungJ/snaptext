"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import NewUser from '@/components/newUser';
import Alert from '@/components/alert'

export default function Home() {
  const [allUsers, setAllUsers] = useState([])
  const [recievedUsers, setRecievedUsers] = useState({}) //people who sent the user a message

  function sendMessage(message, toUserId) {
    socket.emit("message-sent", message, toUserId, socket.id);
  }

  useEffect(() => {
      if (socket.connected) {
      onConnect();
    }
    async function fetchUsers() {
      await fetch("https://snaptextquick.vercel.app/api/getusers", { cache: 'no-store', headers: {
        'Content-type': 'application/json',
      }, method: 'GET' })
      .then((response) => response.json())
      .then((data) => {setAllUsers(data); console.log(data)});
    }

    function onConnect() {

      socket.on("fetchusers", () => {
          fetchUsers();
      })
      socket.on("message-from-user", (message, fromUserId) => {
        setRecievedUsers((prev) => {return {...prev, [fromUserId]: message}}) //replaces new user who sent message with icon
      })

    }
    socket.on("connect", onConnect);
    socket.emit("newuser");
    
    // return () => {
    //   fetchUsers()
    //   socket.emit("newuser"); //adding new user
    //   socket.off("connect", onConnect);
    //   socket.off("adduser");
    //   socket.off("fetchusers");
    //   socket.off("message-from-user")
    // };
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
              return <Alert key={val.userid} sentFrom={val.username} message={recievedUsers[val.userid]} close={() => {delete recievedUsers[val.userid]; console.log(recievedUsers); setAllUsers((prev) => [...prev])}}/> //trigger rerender
            }
            return <NewUser key={val.userid} id={val.userid} name={val.username} img={val.icon} onClick={sendMessage}/>
          })}
        </div>
    </div>
  );
}

export const dynamic = "force-dynamic"
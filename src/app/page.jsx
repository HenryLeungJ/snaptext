"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Copy } from "lucide-react"
 
import { Button } from "@components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"


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
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  );
}
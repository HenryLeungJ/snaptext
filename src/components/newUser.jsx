
"use client"

import { Copy } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"


export default function NewUser(params) {

    const [link, setLink] = useState("")
    return(
        <Dialog>
        <div className="max-h-2 my-10 h-2">
            <DialogTrigger asChild>
                        <div className="flex flex-col justify-center items-center">
                            <div className="jump mb-3 drop-shadow-md">
                                <Avatar>
                                    <AvatarImage src={"/people/"+params.img+".svg"} />
                                    <AvatarFallback>Icon</AvatarFallback>
                                </Avatar>
                            </div>
                            {params.highlight ? <p className="drop-shadow-md font-sans font-extrabold">{params.name}</p> : <p className="drop-shadow-md font-sans">{params.name}</p>}
                        </div>
            </DialogTrigger>
        </div>
            {!params.highlight &&
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>{params.name}</DialogTitle>
                <DialogDescription>
                    Snap A Message To {params.name}
                </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                    Message
                    </Label>
                    <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    onChange={(e) => {
                        setLink(e.target.value);
                        console.log(link);
                    }}
                    value={link}
                    />
                </div>
                </div>
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button onClick={() => {
                        if (link != "")
                        {
                            params.onClick(link, params.id)
                        }
                        }}>

                    Send
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>}
        </Dialog>
    )
}
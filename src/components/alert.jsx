"use client"
import { Copy } from "lucide-react"
import { toast } from "sonner"

 
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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Image from "next/image"
 
export default function DialogCloseButton(params) {

  return (
    <Dialog>
    <div className="max-h-2 my-10 h-2" onLoad={() => {toast(`${params.sentFrom} sent you a message!`, params.sentFrom)}}>
      <DialogTrigger asChild>
        <div className="flex flex-col justify-center items-center">
            <div className="wiggle mb-3 drop-shadow-md">
                <Avatar>
                    <Image src="/mail.svg" width={100} height={100} alt="icon"/>
                    <AvatarFallback>Mail</AvatarFallback>
                </Avatar>
            </div>
            <p className="drop-shadow-md text-green-500 font-sans">{params.sentFrom}</p>
        </div>
      </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            {params.sentFrom} sent you this link!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={params.message}
              value={params.message}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={async()=>{await navigator.clipboard.writeText(params.message)}}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => {params.close()}}>
              Reset
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
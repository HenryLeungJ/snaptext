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

export default function newUser(params) {
    console.log(params)
    return(
        <Dialog>
            <DialogTrigger asChild>
            <div className="flex flex-col justify-center items-center">
                <div className="jump mb-3 drop-shadow-md">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <p className="drop-shadow-md font-sans">{params.id}</p>
            </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                    Share a link!
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
                    <Button>
                    Send
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                    Close
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
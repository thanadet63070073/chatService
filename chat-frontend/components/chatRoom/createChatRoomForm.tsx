import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleCreateChatRoomButton: (name: string) => void;
};

export default function CreateChatRoomForm({ open, onOpenChange, handleCreateChatRoomButton }: Props) {
  const [name, setName] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const createChatRoomButton = () => {
    if (!name && name.length <= 0){
      setStatusMessage("Name is required")
      setIsError(true)
    }
    handleCreateChatRoomButton(name);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chat Room</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-6 pt-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {
                statusMessage !== "" &&
                <div className="flex justify-center align-middle">
                  <div className={`w-full py-2 text-center ${isError ? "bg-red-200 text-red-500" : "bg-green-200 text-green-500"}`}>
                    {statusMessage}
                  </div>
                </div>
              }
              <Button className="w-full" onClick={createChatRoomButton}>
                Create
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}


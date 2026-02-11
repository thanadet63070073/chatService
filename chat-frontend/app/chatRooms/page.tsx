'use client';
import ChatRoomsCard from "@/components/chatRoom/chatRoomCard";
import CreateChatRoomForm from "@/components/chatRoom/createChatRoomForm";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createChatRoom, getChatRooms } from "@/services/chatRoomService";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ChatRoomsPage() {
  const router = useRouter();

  const [chatRooms, setChatRooms] = useState<Array<{id: number; name: string}>>([]);
  const [isOpenCreateChatRoomForm, setIsOpenCreateChatRoomForm] = useState(false);

  const joinChatRoom = (roomId: number) => {
    router.push(`/chatRooms/${roomId}`);
  }

  const handleSearchButton = () => {
    console.log("search");
  }

  const openCreateChatRoomForm = () => {
    setIsOpenCreateChatRoomForm(true);
  }

  const fetchChatRooms = async () => {
    const response = await getChatRooms();
    const data = await response.json();

    if (response.ok) {
      setChatRooms(data);
    } else {
      console.error("Failed to fetch chat rooms:", data.message);
    }
  }

  const handleCreateChatRoomButton = async(name: string) => {
    const response = await createChatRoom(name);

    const data = await response.json();

    if (response.ok) {
      console.log("Chat room created:", data);
      fetchChatRooms();
      setIsOpenCreateChatRoomForm(false);
    } else {
      console.error("Failed to create chat room:", data.message);
    }
  }

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-10 gap-6">
      <h1 className="text-2xl font-bold mb-4">Chat Rooms</h1>
      <div className="w-[50%]">
        <Field>
          <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
          <ButtonGroup>
            <Input id="input-button-group" placeholder="room name" />
            <Button variant="outline" onClick={handleSearchButton}>Search</Button>
          </ButtonGroup>
        </Field>
      </div>
      <div className="flex w-full justify-end">
        <Button className="bg-green-400 hover:bg-green-600" onClick={openCreateChatRoomForm}>
          Create new room
        </Button>
        <CreateChatRoomForm open={isOpenCreateChatRoomForm} onOpenChange={setIsOpenCreateChatRoomForm} handleCreateChatRoomButton={handleCreateChatRoomButton} />
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        <Suspense fallback={<div>Loading...</div>}>
        {
          chatRooms.map((room) => (
            <ChatRoomsCard key={room.id} roomName={room.name} joinChat={() => joinChatRoom(room.id)}/>
          ))
        }
        </Suspense>
      </div>
    </div>
  )
}

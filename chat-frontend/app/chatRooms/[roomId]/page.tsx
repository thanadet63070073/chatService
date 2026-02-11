"use client";

import { useEffect, useState } from "react";
import { connectSocket, subscribe, send, disconnect } from "@/lib/socket";
import Cookies from 'js-cookie';
import { useParams } from "next/navigation";
import { Field } from "@/components/ui/field";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types/chatMessage";
import MessageList from "@/components/chatRoom/messageList";
import { getChatMessageFromRoomId } from "@/services/chatMessage";

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;
  const token = Cookies.get('auth_token');

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token || !roomId) return;

    connectSocket(() => {
      subscribe(`/topic/chat/${roomId}`, (msg) => {
        setChatMessages((prevMessages) => [...prevMessages, msg]);
      });
    });

    return () => {
      disconnect();
    };
  }, [token, roomId]);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const fetchChatMessages = async () => {
    try{
      setIsLoading(true)
  
      const response = await getChatMessageFromRoomId(roomId)
      const data = await response.json();

      if (response.ok) {
        setChatMessages(data);
      } else {
        console.error("Failed to fetch chat rooms:", data.message);
      }
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  const sendMessage = () => {
    if (message.length <= 0){
      return
    }

    send(`/app/chat.send/${roomId}`, {
      message: message,
    });
    setMessage("");
  };
  return (
    <div className="flex flex-col items-center h-screen p-10">
      <h1 className="text-2xl font-bold mb-4">Chat Room: {roomId}</h1>
      <div className="flex flex-col flex-1 min-h-0 w-full gap-4">
        {
          (isLoading) ? <div>Loading</div> : <MessageList chatMessages={chatMessages} />
        }
        <Field>
          <ButtonGroup>
            <Input 
              id="input-button-group" 
              placeholder="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              onKeyDown=
              {
                (e) => {
                  if(e.key === "Enter"){
                    sendMessage();
                  }
                }
              }
            />
            <Button variant="outline" onClick={sendMessage}>Send message</Button>
          </ButtonGroup>
        </Field>
      </div>
    </div>
  )
}
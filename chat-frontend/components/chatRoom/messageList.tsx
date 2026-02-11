import { useAuth } from "@/context/AuthContext";
import { ChatMessage } from "@/types/chatMessage";
import { formatDateTimeDMY } from "@/utils/dateAndTime";

type ChatListProps = {
  chatMessages: ChatMessage[];
}

export default function MessageList({chatMessages}: ChatListProps) {
  const authContext = useAuth();
  
  return (
    <div className="flex h-full flex-col-reverse gap-2 border p-4 rounded-xl overflow-y-scroll">
      {
        [...chatMessages].reverse().map((chatMessage, index) => 
          (
            chatMessage.senderId === Number(authContext.userId) ?
              <div className="flex gap-2 items-center self-end" key={index}>
                <div className="flex flex-col gap-1 items-end">
                  <div className="text-sm">{chatMessage.senderName}</div>
                  <div className="flex gap-2 items-end">
                    <div className="text-xs">{formatDateTimeDMY(chatMessage.createdDate)}</div>
                    <div className="bg-green-200 p-2 rounded-lg">{chatMessage.message}</div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-amber-300 rounded-full"></div>
              </div>
              :
              <div className="flex gap-2 items-center" key={index}>
                <div className="w-12 h-12 bg-amber-300 rounded-full"></div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">{chatMessage.senderName}</div>
                  <div className="flex gap-2 items-end">
                    <div className="bg-green-200 p-2 rounded-lg">{chatMessage.message}</div>
                    <div className="text-xs">{formatDateTimeDMY(chatMessage.createdDate)}</div>
                  </div>
                </div>
              </div>
          )
        )
      }
    </div>
  );
}
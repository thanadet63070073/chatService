import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ChatRoomCardProps = {
  roomName: string;
  joinChat: () => void;
}

export default function ChatRoomsCard({ roomName, joinChat }: ChatRoomCardProps) {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>{ roomName }</CardTitle>
        <CardDescription>
          
        </CardDescription>
      </CardHeader>
      
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={joinChat}>
          Join
        </Button>
      </CardFooter>
    </Card>
  )
}
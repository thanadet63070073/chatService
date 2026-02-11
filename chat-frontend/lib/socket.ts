import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";

let stompClient: Client | null = null;

export function connectSocket(
  onConnected: () => void,
  onError?: (error: any) => void,
) {
  const token = Cookies.get("auth_token");

  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws-chat"),

    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },

    debug: (str) => console.log(str),

    onConnect: () => {
      console.log("✅ WS connected");
      onConnected();
    },

    onStompError: (frame) => {
      console.error("❌ Broker error", frame);
      onError?.(frame);
    },
  });

  stompClient.activate();
}

export function subscribe(destination: string, callback: (msg: any) => void) {
  stompClient?.subscribe(destination, (message) => {
    callback(JSON.parse(message.body));
  });
}

export function send(destination: string, body: any) {
  stompClient?.publish({
    destination,
    body: JSON.stringify(body),
  });
}

export function disconnect() {
  stompClient?.deactivate();
}

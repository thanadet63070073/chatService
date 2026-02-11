import Cookies from "js-cookie";

export const createChatRoom = async (name: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
    body: JSON.stringify({ name }),
  });

  return response;
};

export const getChatRooms = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatrooms`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  });

  return response;
};

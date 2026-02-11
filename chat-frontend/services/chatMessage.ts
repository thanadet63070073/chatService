import Cookies from "js-cookie";

export const getChatMessageFromRoomId = async (roomId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/${roomId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
      },
    },
  );

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

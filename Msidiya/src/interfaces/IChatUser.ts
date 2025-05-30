
export  interface IChatUser {
  id: number;
  username: string;
  avatar: string | null;
  lastMessage: string | null;
  lastMessageTime: string | null;
  displayName: string;
}



export  interface IUserWithChat {
  user: {
    id: number;
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    Picture: string | null;
    Phone_number?: string;
    Role?: string;
  };
  last_message: string | null;
  last_message_time: string | null;
}

import axios from 'axios';

export interface User {
  id: number;
  username: string;
  email: string;
  Phone_number?: string;
  Address?: string;
  Picture?: string;
  Role:string,
}

export const fetchUserData = async (): Promise<User | null> => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsedUser: User = JSON.parse(storedUser);
    try {
      const response = await axios.get(`https://msidiya.com/api/users/${parsedUser.id}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return parsedUser; // Fallback to stored data
    }
  }
  return null;
};





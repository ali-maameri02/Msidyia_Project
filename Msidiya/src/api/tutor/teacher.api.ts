import { axiosClient } from "../../assets/lib/axiosClient";
import { ITutor } from "../../interfaces/teacher";

export const getTutors = async (): Promise<ITutor[]> => {
  const response = await axiosClient.get<ITutor[]>("/api/tutors/");
  return response.data;
};
